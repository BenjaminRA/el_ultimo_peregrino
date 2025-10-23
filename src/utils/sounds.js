// Utilidades para efectos de sonido usando Web Audio API

// Crear contexto de audio (singleton)
let audioContext = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

// Sonido al hacer clic en un cofre (selección)
export const playClickSound = () => {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
};

// Sonido de agitación mientras se abre (efecto de tambor/redoble)
export const playShakingSound = () => {
  const ctx = getAudioContext();

  // Crear múltiples pulsos rápidos que aceleran (como un redoble de tambor)
  const numBeats = 12; // número de golpes
  const duration = 2; // duración total en segundos

  for (let i = 0; i < numBeats; i++) {
    // El tiempo entre golpes disminuye (acelera)
    const startTime = ctx.currentTime + (i * duration / numBeats);

    // Oscilador para simular golpe de tambor
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Frecuencia baja para sonido de tambor
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(50, startTime + 0.1);

    // Volumen que aumenta progresivamente
    const volume = 0.15 + (i / numBeats) * 0.25;
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

    osc.start(startTime);
    osc.stop(startTime + 0.1);
  }

  // Agregar un efecto de "whoosh" suave de fondo
  const whoosh = ctx.createOscillator();
  const whooshGain = ctx.createGain();

  whoosh.connect(whooshGain);
  whooshGain.connect(ctx.destination);

  whoosh.type = 'triangle';
  whoosh.frequency.setValueAtTime(200, ctx.currentTime);
  whoosh.frequency.linearRampToValueAtTime(600, ctx.currentTime + 2);

  whooshGain.gain.setValueAtTime(0.05, ctx.currentTime);
  whooshGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 1.5);
  whooshGain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 2);

  whoosh.start(ctx.currentTime);
  whoosh.stop(ctx.currentTime + 2);
};

// Sonido de cofre vacío (decepción)
export const playEmptySound = () => {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(400, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.5);
};

// Sonido de victoria (fanfarria)
export const playWinSound = () => {
  const ctx = getAudioContext();

  // Secuencia de notas triunfales
  const notes = [
    { freq: 523.25, start: 0, duration: 0.2 },      // C5
    { freq: 659.25, start: 0.2, duration: 0.2 },    // E5
    { freq: 783.99, start: 0.4, duration: 0.2 },    // G5
    { freq: 1046.50, start: 0.6, duration: 0.4 },   // C6 (más larga)
  ];

  notes.forEach(note => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.value = note.freq;

    gainNode.gain.setValueAtTime(0, ctx.currentTime + note.start);
    gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + note.start + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.start + note.duration);

    oscillator.start(ctx.currentTime + note.start);
    oscillator.stop(ctx.currentTime + note.start + note.duration);
  });

  // Añadir un efecto de campana
  setTimeout(() => {
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();

    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);

    bellOsc.type = 'sine';
    bellOsc.frequency.value = 2093; // C7

    bellGain.gain.setValueAtTime(0.3, ctx.currentTime);
    bellGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

    bellOsc.start(ctx.currentTime);
    bellOsc.stop(ctx.currentTime + 0.8);
  }, 600);
};
