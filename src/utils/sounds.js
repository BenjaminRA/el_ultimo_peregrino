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

// Sonido de respuesta correcta (nota alegre y ascendente)
export const playCorrectAnswerSound = () => {
  const ctx = getAudioContext();

  // Secuencia de notas alegres ascendentes
  const notes = [
    { freq: 523.25, start: 0, duration: 0.15 },     // C5
    { freq: 659.25, start: 0.1, duration: 0.15 },   // E5
    { freq: 783.99, start: 0.2, duration: 0.3 },    // G5 (más larga y triunfal)
  ];

  notes.forEach(note => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = note.freq;

    gainNode.gain.setValueAtTime(0, ctx.currentTime + note.start);
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + note.start + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.start + note.duration);

    oscillator.start(ctx.currentTime + note.start);
    oscillator.stop(ctx.currentTime + note.start + note.duration);
  });

  // Agregar un brillo de campana al final
  const bellOsc = ctx.createOscillator();
  const bellGain = ctx.createGain();

  bellOsc.connect(bellGain);
  bellGain.connect(ctx.destination);

  bellOsc.type = 'triangle';
  bellOsc.frequency.value = 1046.50; // C6

  bellGain.gain.setValueAtTime(0.2, ctx.currentTime + 0.25);
  bellGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

  bellOsc.start(ctx.currentTime + 0.25);
  bellOsc.stop(ctx.currentTime + 0.6);
};

// Sonido de respuesta incorrecta (chicharra/buzzer clásico)
export const playIncorrectAnswerSound = () => {
  const ctx = getAudioContext();

  // Chicharra con dos pulsos rápidos y ásperos
  // Primer pulso
  const buzz1 = ctx.createOscillator();
  const gain1 = ctx.createGain();

  buzz1.connect(gain1);
  gain1.connect(ctx.destination);

  buzz1.type = 'sawtooth';
  buzz1.frequency.value = 220; // Frecuencia baja y áspera

  gain1.gain.setValueAtTime(0.4, ctx.currentTime);
  gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

  buzz1.start(ctx.currentTime);
  buzz1.stop(ctx.currentTime + 0.15);

  // Segundo pulso (un poco más corto)
  const buzz2 = ctx.createOscillator();
  const gain2 = ctx.createGain();

  buzz2.connect(gain2);
  gain2.connect(ctx.destination);

  buzz2.type = 'sawtooth';
  buzz2.frequency.value = 220;

  gain2.gain.setValueAtTime(0.4, ctx.currentTime + 0.15);
  gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  buzz2.start(ctx.currentTime + 0.15);
  buzz2.stop(ctx.currentTime + 0.3);

  // Agregar un componente de ruido/distorsión con onda cuadrada
  const square1 = ctx.createOscillator();
  const gainSquare1 = ctx.createGain();

  square1.connect(gainSquare1);
  gainSquare1.connect(ctx.destination);

  square1.type = 'square';
  square1.frequency.value = 110; // Una octava más baja

  gainSquare1.gain.setValueAtTime(0.25, ctx.currentTime);
  gainSquare1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

  square1.start(ctx.currentTime);
  square1.stop(ctx.currentTime + 0.15);

  const square2 = ctx.createOscillator();
  const gainSquare2 = ctx.createGain();

  square2.connect(gainSquare2);
  gainSquare2.connect(ctx.destination);

  square2.type = 'square';
  square2.frequency.value = 110;

  gainSquare2.gain.setValueAtTime(0.25, ctx.currentTime + 0.15);
  gainSquare2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  square2.start(ctx.currentTime + 0.15);
  square2.stop(ctx.currentTime + 0.3);
};
