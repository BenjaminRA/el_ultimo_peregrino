import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [numChests, setNumChests] = useState(10);
  const navigate = useNavigate();

  const handleStart = () => {
    if (numChests >= 3 && numChests <= 50) {
      navigate(`/game/${numChests}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="parchment-bg rounded-2xl p-8 md:p-12 max-w-2xl w-full relative overflow-hidden">
        {/* Decoración de esquinas */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-500 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gold-500 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-gold-500 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold-500 rounded-br-2xl"></div>

        {/* Contenido */}
        <div className="relative z-10">
          {/* Título */}
          <h1 className="text-5xl md:text-7xl font-script text-center text-parchment-900 mb-4 text-gold-shadow">
            El Último Peregrino
          </h1>

          {/* Subtítulo */}
          <div className="text-center mb-8">
            <div className="inline-block border-t-2 border-b-2 border-gold-600 py-2 px-6">
              <p className="text-xl md:text-2xl font-medieval text-parchment-800">
                Juego de Preguntas Bíblicas
              </p>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-parchment-300 bg-opacity-50 rounded-lg p-6 mb-8 border-2 border-parchment-600">
            <h2 className="text-2xl font-medieval text-parchment-900 mb-4 text-center">
              📜 Instrucciones
            </h2>
            <ul className="space-y-2 text-parchment-800 text-lg">
              <li className="flex items-start">
                <span className="text-gold-600 mr-2">✦</span>
                <span>Divídanse en 2 equipos</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-600 mr-2">✦</span>
                <span>Respondan preguntas bíblicas por turno</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-600 mr-2">✦</span>
                <span>Al responder correctamente, elijan un cofre</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-600 mr-2">✦</span>
                <span>Solo un cofre contiene el premio</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold-600 mr-2">✦</span>
                <span>¡El primer equipo en encontrarlo gana!</span>
              </li>
            </ul>
          </div>

          {/* Selector de cofres */}
          <div className="mb-8">
            <label className="block text-center text-2xl font-medieval text-parchment-900 mb-4">
              ¿Cuántos cofres deseas?
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setNumChests(Math.max(3, numChests - 1))}
                className="w-12 h-12 bg-gold-500 hover:bg-gold-600 text-parchment-900 font-bold text-2xl rounded-lg shadow-lg transition-all duration-300 hover:scale-110"
              >
                -
              </button>
              <div className="bg-parchment-100 border-4 border-gold-600 rounded-lg px-8 py-4 min-w-[120px]">
                <input
                  type="number"
                  min="3"
                  max="50"
                  value={numChests}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 3 && val <= 50) setNumChests(val);
                  }}
                  className="w-full text-4xl font-bold text-center bg-transparent text-parchment-900 outline-none"
                />
              </div>
              <button
                onClick={() => setNumChests(Math.min(50, numChests + 1))}
                className="w-12 h-12 bg-gold-500 hover:bg-gold-600 text-parchment-900 font-bold text-2xl rounded-lg shadow-lg transition-all duration-300 hover:scale-110"
              >
                +
              </button>
            </div>
            <p className="text-center text-parchment-700 mt-2 text-sm">
              (Mínimo 3, Máximo 50)
            </p>
          </div>

          {/* Botón de inicio */}
          <div className="text-center">
            <button
              onClick={handleStart}
              className="btn-medieval text-2xl px-12 py-5"
            >
              ⚔️ Comenzar Aventura ⚔️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
