import { useState, useEffect } from 'react';
import preguntasData from '../data/preguntas_biblicas.json';
import { playClickSound, playCorrectAnswerSound, playIncorrectAnswerSound } from '../utils/sounds';

function QuestionModal({ isOpen, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Cargar una pregunta aleatoria cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      loadRandomQuestion();
    }
  }, [isOpen]);

  const loadRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * preguntasData.preguntas.length);
    setCurrentQuestion(preguntasData.preguntas[randomIndex]);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleSelectAnswer = (answer) => {
    if (showResult) return; // No permitir cambiar respuesta después de mostrar resultado
    setSelectedAnswer(answer);
    playClickSound(); // Sonido al seleccionar una opción
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.alternativa_correcta;
    setIsCorrect(correct);
    setShowResult(true);

    // Reproducir sonido según la respuesta
    if (correct) {
      playCorrectAnswerSound();
    } else {
      playIncorrectAnswerSound();
    }
  };

  const handleNextQuestion = () => {
    loadRandomQuestion();
  };

  if (!isOpen || !currentQuestion) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="parchment-bg rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-parchment-800">
        {/* Header */}
        <div className="bg-linear-to-b from-amber-700 to-amber-800 p-6 rounded-t-lg border-b-4 border-amber-900">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-script text-white">
              📖 Pregunta Bíblica
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-red-300 text-3xl font-bold transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${currentQuestion.nivel === 'facil'
              ? 'bg-green-400 text-green-900'
              : currentQuestion.nivel === 'medio'
                ? 'bg-yellow-400 text-yellow-900'
                : 'bg-red-400 text-red-900'
              }`}>
              Nivel: {currentQuestion.nivel.charAt(0).toUpperCase() + currentQuestion.nivel.slice(1)}
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-xl md:text-2xl text-parchment-900 font-semibold leading-relaxed">
              {currentQuestion.pregunta}
            </p>
          </div>

          {/* Alternativas */}
          <div className="space-y-3">
            {Object.entries(currentQuestion.alternativas).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleSelectAnswer(key)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-3 transition-all duration-300 ${selectedAnswer === key
                  ? showResult
                    ? isCorrect
                      ? 'bg-green-400 border-green-600 text-green-900 font-bold'
                      : 'bg-red-400 border-red-600 text-red-900 font-bold'
                    : 'bg-blue-400 border-blue-600 text-blue-900 font-bold'
                  : showResult && key === currentQuestion.alternativa_correcta
                    ? 'bg-green-300 border-green-500 text-green-900 font-bold'
                    : 'bg-white border-parchment-400 text-parchment-900 hover:bg-parchment-100 hover:border-parchment-600'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold min-w-[30px]">
                    {key.toUpperCase()})
                  </span>
                  <span className="text-lg">{value}</span>
                  {showResult && key === currentQuestion.alternativa_correcta && (
                    <span className="ml-auto text-2xl">✓</span>
                  )}
                  {showResult && selectedAnswer === key && !isCorrect && (
                    <span className="ml-auto text-2xl">✗</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className={`mt-6 p-4 rounded-lg border-4 ${isCorrect
              ? 'bg-green-100 border-green-600'
              : 'bg-red-100 border-red-600'
              }`}>
              <p className={`text-xl font-bold text-center ${isCorrect ? 'text-green-900' : 'text-red-900'
                }`}>
                {isCorrect ? '🎉 ¡Correcto! ¡Bien hecho!' : '❌ Incorrecto. ¡Sigue intentando!'}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex gap-3 flex-col sm:flex-row">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className={`flex-1 px-6 py-3 font-bold rounded-lg shadow-lg transition-all duration-300 border-2 ${selectedAnswer
                  ? 'bg-linear-to-b from-blue-400 to-blue-600 text-white border-blue-700 hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-400 text-gray-600 border-gray-500 cursor-not-allowed'
                  }`}
              >
                ✔️ Verificar Respuesta
              </button>
            ) : (
              <>
                <button
                  onClick={handleNextQuestion}
                  className="flex-1 px-6 py-3 bg-linear-to-b from-green-400 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-green-700"
                >
                  ➡️ Siguiente Pregunta
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-linear-to-b from-parchment-500 to-parchment-700 text-parchment-100 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-parchment-800"
                >
                  🚪 Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;
