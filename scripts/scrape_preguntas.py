#!/usr/bin/env python3
"""
Script para hacer scraping de preguntas bíblicas desde archivos HTML locales
Extrae las preguntas de los tres niveles de dificultad y las guarda en formato JSON
"""

from bs4 import BeautifulSoup
import json
import re
import os

# Archivos HTML locales
ARCHIVOS_HTML = {
    'facil': '90 preguntas bíblicas fáciles - Biblia.html',
    'medio': '105 preguntas bíblicas con respuestas (nivel medio) - Biblia.html',
    'dificil': '99 preguntas bíblicas difíciles - Biblia.html'
}

def extraer_preguntas(archivo_html, nivel):
    """
    Extrae las preguntas de un archivo HTML local
    
    Args:
        archivo_html: Nombre del archivo HTML local
        nivel: nivel de dificultad (facil, medio, dificil)
    
    Returns:
        Lista de diccionarios con las preguntas
    """
    print(f"\n🔍 Procesando preguntas de nivel {nivel}...")
    print(f"   📄 Archivo: {archivo_html}")
    
    # Leer el archivo HTML local
    try:
        with open(archivo_html, 'r', encoding='utf-8') as f:
            contenido_html = f.read()
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {archivo_html}")
        print(f"   Asegúrate de que el archivo existe en el directorio actual")
        return []
    except Exception as e:
        print(f"❌ Error al leer {archivo_html}: {e}")
        return []
    
    # Parsear el HTML
    soup = BeautifulSoup(contenido_html, 'html.parser')
    preguntas = []
    
    # Buscar preguntas en h2 (nivel fácil y difícil)
    elementos_h2 = soup.find_all('h2')
    
    # Filtrar h2 que realmente son preguntas (tienen ¿ y ?)
    elementos_pregunta = []
    for h2 in elementos_h2:
        texto = h2.get_text(strip=True)
        if '¿' in texto and '?' in texto:
            elementos_pregunta.append(h2)
    
    # Si no hay h2 con preguntas, buscar en <p> (nivel medio)
    if len(elementos_pregunta) == 0:
        print(f"   ℹ️  No se encontraron preguntas en <h2>, buscando en <p>...")
        # Buscar párrafos que contengan números seguidos de punto y pregunta
        todos_p = soup.find_all('p')
        for p in todos_p:
            texto = p.get_text(strip=True)
            # Verificar si el párrafo es una pregunta numerada
            if re.match(r'^\d+\.\s*¿.+\?', texto):
                elementos_pregunta.append(p)
        print(f"   ℹ️  Se encontraron {len(elementos_pregunta)} preguntas en <p>")
    
    for idx, elemento in enumerate(elementos_pregunta):
        texto_pregunta = elemento.get_text(strip=True)
        
        # Limpiar el número de la pregunta si existe
        texto_pregunta = re.sub(r'^\d+\.\s*', '', texto_pregunta)
        
        # Saltar si no es una pregunta válida (debe tener al menos 10 caracteres y un signo de interrogación)
        if not texto_pregunta or len(texto_pregunta) < 10 or '¿' not in texto_pregunta:
            print(f"  ⚠️  Pregunta {idx+1} omitida (muy corta o sin interrogación): {texto_pregunta[:50]}...")
            continue
        
        # Buscar las alternativas después del elemento de pregunta
        # Pueden estar en un solo <p> con <br> o en múltiples <p> separados
        
        alternativas = {}
        
        # Método 1: Buscar el primer <p> que puede contener todas las alternativas con <br>
        parrafo_alternativas = elemento.find_next_sibling('p')
        
        if parrafo_alternativas:
            texto_alternativas = parrafo_alternativas.get_text()
            
            # Buscar patrón: a) texto, b) texto, c) texto
            # Usar split por saltos de línea primero
            lineas = texto_alternativas.strip().split('\n')
            
            for linea in lineas:
                linea = linea.strip()
                # Buscar patrón a) texto
                match = re.match(r'^([abc])\)\s*(.+)$', linea, re.IGNORECASE)
                if match:
                    letra = match.group(1).lower()
                    texto = match.group(2).strip()
                    alternativas[letra] = texto
            
            # Si no se encontraron alternativas con líneas, intentar con regex
            if len(alternativas) < 3:
                patron = r'([abc])\)\s*([^\n]+?)(?=\s*[abc]\)|$)'
                matches = re.findall(patron, texto_alternativas, re.IGNORECASE)
                for letra, texto in matches[:3]:
                    letra = letra.lower()
                    texto_limpio = texto.strip()
                    alternativas[letra] = texto_limpio
        
        # Método 2: Si no se encontraron suficientes alternativas, buscar en múltiples <p> consecutivos
        if len(alternativas) < 3:
            alternativas = {}
            # Buscar todos los <p> hermanos siguientes hasta encontrar 3 alternativas o un div
            elemento_actual = elemento
            intentos = 0
            max_intentos = 15  # Buscar en los siguientes 15 elementos
            
            while len(alternativas) < 3 and intentos < max_intentos:
                elemento_actual = elemento_actual.find_next_sibling()
                intentos += 1
                
                if not elemento_actual:
                    break
                
                # Si encontramos un div con clase 'hidden-content', ya pasamos las alternativas
                if elemento_actual.name == 'div' and 'hidden-content' in elemento_actual.get('class', []):
                    break
                
                # Si es un párrafo, buscar alternativas
                if elemento_actual.name == 'p':
                    texto = elemento_actual.get_text().strip()
                    match = re.match(r'^([abc])\)\s*(.+)$', texto, re.IGNORECASE)
                    if match:
                        letra = match.group(1).lower()
                        texto_alternativa = match.group(2).strip()
                        alternativas[letra] = texto_alternativa
        
        if len(alternativas) < 3:
            print(f"  ⚠️  Solo se encontraron {len(alternativas)} alternativas para: {texto_pregunta[:50]}...")
            continue
        
        # Buscar la respuesta correcta en el div con clase 'answer-contents'
        respuesta_div = elemento.find_next('div', class_='answer-contents')
        alternativa_correcta = None
        
        if respuesta_div:
            texto_respuesta = respuesta_div.get_text().strip()
            # Buscar el patrón a), b), o c) al inicio del texto de respuesta
            match_respuesta = re.search(r'^([abc])\)', texto_respuesta, re.IGNORECASE)
            if match_respuesta:
                alternativa_correcta = match_respuesta.group(1).lower()
        
        # Si no se detectó la respuesta correcta, marcar como pendiente
        if not alternativa_correcta:
            print(f"  ⚠️  No se detectó respuesta correcta para: {texto_pregunta[:50]}...")
            alternativa_correcta = 'REVISAR'
        
        pregunta_obj = {
            'nivel': nivel,
            'pregunta': texto_pregunta,
            'alternativa_correcta': alternativa_correcta,
            'alternativas': alternativas
        }
        
        preguntas.append(pregunta_obj)
        print(f"  ✓ Pregunta extraída: {texto_pregunta[:60]}... [respuesta: {alternativa_correcta}]")
    
    print(f"✅ Total de preguntas extraídas de nivel {nivel}: {len(preguntas)}")
    return preguntas


def guardar_json(preguntas, archivo_salida):
    """
    Guarda las preguntas en un archivo JSON
    
    Args:
        preguntas: Lista de preguntas
        archivo_salida: Ruta del archivo de salida
    """
    datos = {
        'preguntas': preguntas
    }
    
    with open(archivo_salida, 'w', encoding='utf-8') as f:
        json.dump(datos, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 Archivo guardado en: {archivo_salida}")


def main():
    """
    Función principal que coordina el scraping
    """
    print("=" * 70)
    print("🕷️  SCRAPER DE PREGUNTAS BÍBLICAS - Archivos HTML Locales")
    print("=" * 70)
    
    # Verificar directorio actual
    print(f"\n📂 Directorio actual: {os.getcwd()}")
    
    todas_preguntas = []
    
    # Scrapear cada nivel
    for nivel, archivo in ARCHIVOS_HTML.items():
        preguntas = extraer_preguntas(archivo, nivel)
        todas_preguntas.extend(preguntas)
    
    # Guardar todas las preguntas
    archivo_salida = '../src/data/preguntas_biblicas.json'
    guardar_json(todas_preguntas, archivo_salida)
    
    # Estadísticas
    print("\n" + "=" * 60)
    print("📊 ESTADÍSTICAS:")
    print("=" * 60)
    print(f"Total de preguntas extraídas: {len(todas_preguntas)}")
    
    for nivel in ['facil', 'medio', 'dificil']:
        count = len([p for p in todas_preguntas if p['nivel'] == nivel])
        print(f"  - Nivel {nivel}: {count} preguntas")
    
    # Verificar cuántas necesitan revisión
    necesitan_revision = len([p for p in todas_preguntas if p['alternativa_correcta'] == 'REVISAR'])
    if necesitan_revision > 0:
        print(f"\n⚠️  ATENCIÓN: {necesitan_revision} preguntas necesitan que revises manualmente la respuesta correcta")
        print("   Busca 'REVISAR' en el archivo JSON generado")
    
    print("\n✨ ¡Proceso completado!")


if __name__ == '__main__':
    main()
