# 🏺 El Último Peregrino

Una plataforma interactiva para juegos de preguntas bíblicas diseñada con estilo antiguo de pergaminos.

## 📋 Descripción

Esta aplicación permite realizar dinámicas de juegos bíblicos donde los participantes se dividen en equipos y responden preguntas. Al responder correctamente, pueden elegir un cofre de entre varios disponibles. Solo uno contiene el premio, ¡el equipo que lo encuentre primero gana!

## ✨ Características

- 🎨 **Diseño temático bíblico** con estilo de pergaminos antiguos
- 🎯 **Configurable**: Elige entre 3 y 50 cofres
- 🎭 **Animaciones interactivas** al abrir cofres
- 🎊 **Celebración visual** al encontrar el premio
- 📱 **Responsive**: Funciona en proyectores, tablets y móviles
- 🔄 **Jugar de nuevo** sin volver al inicio

## 🚀 Instalación

1. Clona el repositorio o navega al directorio del proyecto
2. Instala las dependencias:

```bash
npm install
```

## 🎮 Uso

1. Inicia el servidor de desarrollo:

```bash
npm run dev
```

2. Abre tu navegador en `http://localhost:5173`

3. Conecta un proyector si vas a usar la aplicación en un evento

## 📖 Instrucciones del Juego

1. **Configuración inicial**: En la pantalla de inicio, selecciona cuántos cofres quieres (entre 3 y 50)

2. **División de equipos**: Los participantes se dividen en 2 equipos

3. **Mecánica del juego**:

   - Haz una pregunta bíblica a un equipo
   - Si responden correctamente, eligen un número de cofre
   - Haz clic en el cofre correspondiente para abrirlo
   - Si el cofre tiene el premio 👑, ese equipo gana
   - Si está vacío 📭, continúa con el siguiente equipo

4. **Victoria**: El primer equipo en encontrar el premio gana la partida

## 🛠️ Tecnologías Utilizadas

- **React** - Framework de UI
- **React Router** - Navegación entre páginas
- **TailwindCSS** - Estilos y diseño
- **Vite** - Herramienta de desarrollo

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── Chest.jsx          # Componente del cofre interactivo
├── pages/
│   ├── Home.jsx           # Página de inicio/configuración
│   └── Game.jsx           # Página del juego principal
├── App.jsx                # Componente principal con rutas
├── index.css              # Estilos globales y animaciones
└── main.jsx               # Punto de entrada
```

## 🎨 Personalización

### Cambiar el número de cofres por defecto

Edita `src/pages/Home.jsx` línea 6:

```jsx
const [numChests, setNumChests] = useState(10); // Cambia el 10 por el número que desees
```

### Modificar colores

Los colores están definidos en `tailwind.config.js`. Puedes personalizarlos según tus preferencias.

### Agregar más animaciones

Las animaciones personalizadas están en `src/index.css` bajo los `@keyframes`.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el juego, no dudes en hacer un fork y crear un pull request.

## 📝 Licencia

Este proyecto fue creado para dinámicas de juegos bíblicos. Siéntete libre de usarlo y modificarlo para tus eventos.

## 🙏 Créditos

Desarrollado con ❤️ para dinámicas de juegos bíblicos.

---

**¡Que disfrutes tu dinámica! 🎉**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
