'use strict';
function updateCountdown() {
  const state = getCountdown();
  for (const unit of ['days', 'hours', 'minutes', 'seconds']) {
    document.getElementById(unit).textContent = String(state[unit]).padStart(2, '0');
  }
  document.getElementById('target-date').textContent = `29 OCT ${state.year}`;
  document.getElementById('chapter-year').textContent = state.year;
  document.getElementById('progress-label').textContent = `${state.progress.toFixed(1).replace('.', ',')} %`;
  document.getElementById('progress-fill').style.width = `${state.progress}%`;
  document.querySelector('[role="progressbar"]').setAttribute('aria-valuenow', state.progress.toFixed(1));
  document.getElementById('arrival').textContent = state.arrived ? '¡El portal está abierto! Feliz 29 de octubre. Que comience la aventura. ✧' : '';
}
updateCountdown();
setInterval(updateCountdown, 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCountdown(); });
const missions = [
  'Prepará una poción: algo rico para tomar.',
  'Mandale un mensaje a alguien de tu equipo de aventuras.',
  'Elegí la canción que sonará cuando se abra el portal.',
  'Buscá algo rosa y sumalo a tu inventario.',
  'Descansá un momento. Hasta los héroes recuperan energía.',
  'Anotá un deseo para tu próximo capítulo.',
  'Salí a explorar: una vuelta corta también es una aventura.',
  'Compartí algo lindo con alguien de tu grupo.',
];
document.getElementById('roll').addEventListener('click', () => {
  const values = new Uint32Array(1);
  // Rejection sampling keeps all twenty faces equally likely.
  do { crypto.getRandomValues(values); } while (values[0] >= 4294967280);
  const roll = values[0] % 20 + 1;
  const message = roll === 20 ? '¡Éxito crítico! Hoy tenés permiso para darte un gusto.' : roll === 1 ? 'Pifia entrañable. Respirá, volvé a intentarlo y llevá un snack.' : missions[(roll - 2) % missions.length];
  document.getElementById('quest-text').textContent = `Sacaste ${roll}. ${message}`;
});
