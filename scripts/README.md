# Scripts de Web Scraping

Este directorio contiene scripts para extraer datos de sitios web.

## Scraper de Preguntas Bíblicas

### Requisitos

Necesitas instalar las librerías de Python:

```bash
pip install requests beautifulsoup4
```

### Uso

1. Navega al directorio de scripts:

```bash
cd scripts
```

2. Ejecuta el script:

```bash
python3 scrape_preguntas.py
```

3. El archivo JSON se generará en: `src/data/preguntas_biblicas.json`

### Notas Importantes

- **Archivos HTML locales**: El script procesa archivos HTML descargados localmente, no hace requests HTTP
- Algunas respuestas correctas pueden necesitar revisión manual (se marcarán como "REVISAR")
- Si el sitio web cambia su estructura HTML en los archivos descargados, es posible que necesites ajustar los selectores
- **Derechos de autor**: Este contenido pertenece a bibliaon.com, úsalo de manera responsable

### Estructura de Archivos

```
scripts/
├── scrape_preguntas.py                              # Script principal
├── 90 preguntas bíblicas fáciles - Biblia.html     # HTML nivel fácil
├── 105 preguntas... (nivel medio) - Biblia.html    # HTML nivel medio
├── 99 preguntas bíblicas difíciles - Biblia.html   # HTML nivel difícil
├── venv/                                            # Entorno virtual (opcional)
└── README.md                                        # Este archivo
```

### Solución de Problemas

Si el script no funciona:

1. Verifica que los archivos HTML estén en el directorio `scripts/`
2. Asegúrate de tener instaladas las dependencias (`beautifulsoup4`)
3. Verifica que los nombres de los archivos HTML coincidan exactamente con los esperados
4. Si los archivos HTML tienen una estructura diferente, puede que necesites ajustar los selectores en el script

### Debugging

Para ejecutar el script en modo debug en VS Code:

1. Abre el archivo `scrape_preguntas.py`
2. Presiona F5 o usa el panel de Debug
3. Asegúrate de que la configuración de launch.json use el Python del venv
