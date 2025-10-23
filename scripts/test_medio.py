#!/usr/bin/env python3
from bs4 import BeautifulSoup
import re

archivo = '105 preguntas bíblicas con respuestas (nivel medio) - Biblia.html'

with open(archivo, 'r', encoding='utf-8') as f:
    contenido = f.read()

soup = BeautifulSoup(contenido, 'html.parser')

# Buscar h2
h2s = soup.find_all('h2')
print(f"Total <h2>: {len(h2s)}")

# Buscar p con patron de pregunta
todos_p = soup.find_all('p')
print(f"Total <p>: {len(todos_p)}")

preguntas_p = []
for p in todos_p:
    texto = p.get_text(strip=True)
    if re.match(r'^\d+\.\s*¿.+\?', texto):
        preguntas_p.append(texto)

print(f"Preguntas encontradas en <p>: {len(preguntas_p)}")
print("\nPrimeras 5 preguntas:")
for i, p in enumerate(preguntas_p[:5]):
    print(f"{i+1}. {p}")
