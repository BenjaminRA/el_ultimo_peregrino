import { useState } from 'react';
import { playClickSound, playShakingSound, playEmptySound, playWinSound } from '../utils/sounds';

function Chest({ number, hasPrize, onOpen, isOpened }) {
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (isOpened) return;

    // Sonido de clic al seleccionar
    playClickSound();

    setIsShaking(true);

    // Sonido de agitación durante la apertura
    playShakingSound();

    setTimeout(() => {
      setIsShaking(false);
      onOpen(number, hasPrize);

      // Sonido según resultado
      if (hasPrize) {
        playWinSound();
      } else {
        playEmptySound();
      }
    }, 2000);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative cursor-pointer transition-all duration-300 ${isShaking ? 'shake' : ''
        } ${!isOpened ? 'hover:scale-105 hover:brightness-110' : ''}`}
    >
      <div className={`relative ${isOpened && hasPrize ? 'celebration' : ''}`}>
        {/* Cofre */}
        <div
          className={`relative rounded-xl overflow-hidden transition-all duration-500 shadow-2xl ${!isOpened
            ? 'bg-linear-to-b from-amber-700 via-amber-800 to-amber-900 border-4 border-amber-950 chest-glow'
            : hasPrize
              ? 'bg-linear-to-b from-yellow-300 via-gold-400 to-gold-600 border-4 border-gold-700 chest-glow'
              : 'bg-linear-to-b from-gray-700 via-gray-800 to-gray-900 border-4 border-gray-950 opacity-70'
            }`}
          style={{ aspectRatio: '1' }}
        >
          {/* Número del cofre - Integrado en la parte superior */}
          <div className={`absolute top-0 left-0 right-0 py-2 text-left px-5 ${!isOpened
            ? 'bg-amber-950 bg-opacity-80'
            : hasPrize
              ? 'bg-gold-700 bg-opacity-80'
              : 'bg-gray-950 bg-opacity-80'
            }`}>
            <span className={`font-bold text-lg md:text-2xl ${!isOpened
              ? 'text-white'
              : hasPrize
                ? 'text-yellow-100'
                : 'text-gray-400'
              }`}>
              {number}
            </span>
          </div>

          {/* Contenido del cofre */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            {!isOpened ? (
              // Cofre cerrado - Diseño más elegante
              <div className="text-center w-full px-4">
                <div className="text-5xl md:text-7xl mb-3">🎁</div>
                <div className="flex flex-col items-center space-y-2">
                  {/* Cerradura decorativa */}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gold-600 rounded-lg border-4 border-gold-700 shadow-lg flex items-center justify-center">
                    <div className="text-2xl md:text-3xl">🔒</div>
                  </div>
                  <div className="w-3/4 h-1 bg-amber-950 rounded-full"></div>
                </div>
              </div>
            ) : hasPrize ? (
              // Cofre con premio
              <div className="text-center animate-pulse">
                <div className="text-6xl md:text-8xl mb-3">👑</div>
                <div className="bg-yellow-100 bg-opacity-90 px-4 py-2 rounded-lg">
                  <p className="text-sm md:text-lg font-bold text-yellow-900">
                    ¡GANADOR!
                  </p>
                </div>
              </div>
            ) : (
              // Cofre vacío
              <div className="text-center">
                <div className="text-5xl md:text-7xl mb-3 opacity-50">�</div>
                <div className="bg-gray-900 bg-opacity-70 px-4 py-2 rounded-lg">
                  <p className="text-xs md:text-sm text-gray-400">Vacío</p>
                </div>
              </div>
            )}
          </div>

          {/* Efecto de brillo cuando se abre con premio */}
          {isOpened && hasPrize && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gold-400 opacity-20 animate-ping"></div>
              {/* Estrellas brillantes */}
              <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce">✨</div>
              <div className="absolute top-1/3 right-1/4 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</div>
              <div className="absolute bottom-1/3 left-1/3 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>💫</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chest;
