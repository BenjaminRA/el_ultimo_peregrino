import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chest from '../components/Chest';

function Game() {
  const { numChests } = useParams();
  const navigate = useNavigate();
  const totalChests = parseInt(numChests);

  const [chests, setChests] = useState([]);
  const [prizeChest, setPrizeChest] = useState(null);
  const [openedChests, setOpenedChests] = useState(new Set());
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Inicializar el juego
  useEffect(() => {
    if (totalChests < 3 || totalChests > 50 || isNaN(totalChests)) {
      navigate('/');
      return;
    }

    // Crear array de cofres
    const chestsArray = Array.from({ length: totalChests }, (_, i) => i + 1);
    setChests(chestsArray);

    // Seleccionar aleatoriamente el cofre con premio
    const randomPrize = Math.floor(Math.random() * totalChests) + 1;
    setPrizeChest(randomPrize);
  }, [totalChests, navigate]);

  const handleOpenChest = (chestNumber, hasPrize) => {
    if (openedChests.has(chestNumber) || gameWon) return;

    setOpenedChests((prev) => new Set([...prev, chestNumber]));

    if (hasPrize) {
      setGameWon(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleReset = () => {
    navigate('/');
  };

  const handlePlayAgain = () => {
    // Reiniciar el juego con el mismo número de cofres
    const chestsArray = Array.from({ length: totalChests }, (_, i) => i + 1);
    setChests(chestsArray);

    const randomPrize = Math.floor(Math.random() * totalChests) + 1;
    setPrizeChest(randomPrize);

    setOpenedChests(new Set());
    setGameWon(false);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['🎉', '✨', '⭐', '👑', '🏆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="parchment-bg rounded-xl p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-script text-parchment-900 text-gold-shadow mb-2">
                El Último Peregrino
              </h1>
              <p className="text-parchment-700 text-lg">
                {totalChests} Cofres • {openedChests.size} Abiertos • {totalChests - openedChests.size} Restantes
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePlayAgain}
                className="px-6 py-3 bg-linear-to-b from-blue-400 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-700"
              >
                🔄 Jugar de Nuevo
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-linear-to-b from-parchment-500 to-parchment-700 text-parchment-100 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-parchment-800"
              >
                🏠 Inicio
              </button>
            </div>
          </div>

          {/* Mensaje de victoria */}
          {gameWon && (
            <div className="mt-4 p-4 bg-gold-400 rounded-lg border-4 border-gold-600 celebration text-center">
              <p className="text-2xl md:text-4xl font-bold text-parchment-900">
                🎊 ¡FELICIDADES! 🎊
              </p>
              <p className="text-lg md:text-xl text-parchment-800 mt-2">
                ¡Han encontrado el premio en el cofre #{prizeChest}!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grid de cofres */}
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid gap-4 md:gap-6 ${totalChests <= 10
            ? 'grid-cols-3 md:grid-cols-5'
            : totalChests <= 20
              ? 'grid-cols-4 md:grid-cols-6'
              : totalChests <= 30
                ? 'grid-cols-5 md:grid-cols-7'
                : 'grid-cols-5 md:grid-cols-8'
            }`}
        >
          {chests.map((chestNumber) => (
            <Chest
              key={chestNumber}
              number={chestNumber}
              hasPrize={chestNumber === prizeChest}
              onOpen={handleOpenChest}
              isOpened={openedChests.has(chestNumber)}
            />
          ))}
        </div>
      </div>

      {/* Instrucciones flotantes */}
      {!gameWon && openedChests.size === 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 parchment-bg px-6 py-3 rounded-full shadow-2xl border-2 border-gold-600 animate-bounce">
          <p className="text-parchment-900 font-bold text-center">
            👆 ¡Haz clic en un cofre para abrirlo!
          </p>
        </div>
      )}

      {/* Estilos adicionales para la animación de caída */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Game;
