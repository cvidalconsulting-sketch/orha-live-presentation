const scenes = [...document.querySelectorAll('[data-scene]')];
const fragments = [...document.querySelectorAll('.fragment')];
const timelines = {
  0: [
    'Hola, Thelma. Soy Kairos.',
    'Charly me pidió que te compartiera los resultados del análisis financiero de ORHA.',
    'También me pidió que te dijera que, si le hicieras caso, probablemente te iría mejor en todo. Pero como, según él, casi siempre lo ignoras, decidió que fuera yo quien te presentara los resultados. Tal vez así sí sigues el consejo.',
    'No podría decirte si está hablando en serio o no, o si muy probablemente está siendo sarcástico. Eso se los dejo a ustedes dos.',
    'Yo, por mi parte, voy a concentrarme en lo que sí puedo demostrar: lo que tus números dicen de verdad.',
    'Estos son los resultados.'
  ],
  1: [
    'Vamos a empezar por las dos preguntas que importan: cuánto capital puede quedar expuesto y cuándo se recupera.',
    'El punto de mayor exposición ocurre en el mes 14.',
    'En ese momento, la caja acumulada llega a menos 50 mil 955 dólares.',
    'De ese total, 24 mil 918 dólares ya fueron invertidos.',
    'Eso significa que aproximadamente 26 mil dólares de capital nuevo quedan en riesgo.',
    'Después de cubrir esa exposición, todavía quedarían 12 mil 963 dólares de colchón.',
    'En el mes 15, la operación mensual se vuelve rentable.',
    'Y en el mes 43, la inversión completa queda recuperada.',
    'La conclusión es clara: tu capital alcanza, pero el margen exige disciplina.'
  ],
  2: [
    'Ahora quiero separar dos cosas: lo que sabemos y lo que todavía estamos suponiendo.',
    'Hay componentes bastante sólidos: los precios definidos, los costos tecnológicos, la infraestructura disponible, el capital con el que cuentas y, por supuesto, la aritmética del modelo. El problema no está ahí.',
    'La principal variable que todavía tenemos que demostrar es cuántas personas que prueban ORHA realmente terminarán pagando.',
    'El escenario base supone una conversión cercana al 5%.',
    'También estamos trabajando con un costo por instalación cercano a 90 centavos.',
    'Pero cuando incorporamos el gasto publicitario y el costo de agencia, adquirir un cliente puede terminar costando aproximadamente 44 dólares con 60 centavos.',
    'Frente a eso, el valor estimado de un cliente durante su permanencia es de aproximadamente 94 dólares.',
    'Eso nos deja una relación entre valor del cliente y costo de adquisición cercana a 2.1 a 1. ¿Qué significa?',
    'Que el modelo puede funcionar.',
    'Pero todavía no tiene suficiente margen como para permitir errores importantes en conversión, publicidad o retención.',
    'Por eso estas variables no deben tratarse como hechos. Deben medirse desde el primer día.'
  ]
};

let activeScene = 0;
let activeFragment = 0;
let activeStep = -1;
let playing = false;
let playbackId = 0;
let fallbackTimer = null;
let activeUtterance = null;

const controls = {
  previous: document.querySelector('#previous'), next: document.querySelector('#next'),
  playPause: document.querySelector('#play-pause'), progress: document.querySelector('#progress'),
  number: document.querySelector('#scene-number')
};

function render() {
  scenes.forEach((scene, index) => {
    const active = index === activeScene;
    scene.hidden = !active;
    scene.classList.toggle('is-active', active);
    scene.querySelectorAll?.('[data-step]').forEach(item => item.classList.toggle('is-revealed', active && Number(item.dataset.step) <= activeStep));
  });
  fragments.forEach((fragment, index) => fragment.classList.toggle('is-visible', index <= activeFragment));
  controls.number.textContent = String(activeScene + 1).padStart(2, '0');
  controls.progress.style.width = `${((activeScene + 1) / scenes.length) * 100}%`;
  controls.previous.disabled = activeScene === 0;
  controls.next.disabled = activeScene === scenes.length - 1;
}

function cancelPlayback(label = 'Reproducir') {
  playbackId += 1;
  playing = false;
  window.clearTimeout(fallbackTimer);
  if (activeUtterance || window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  activeUtterance = null;
  controls.playPause.innerHTML = `<i>▶</i><span>${label}</span>`;
  document.querySelectorAll('[data-kairos-status]').forEach(item => { item.textContent = 'LISTA PARA PRESENTAR'; });
  document.querySelector('[data-intro-status]').textContent = 'KAIROS · LISTA';
}

function speak(text, started, done, id) {
  let finished = false;
  const finish = () => {
    if (finished || id !== playbackId) return;
    finished = true;
    activeUtterance = null;
    done();
  };
  if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX'; utterance.rate = 0.96; utterance.pitch = 1;
    utterance.onstart = () => { if (!finished && id === playbackId) started(); };
    utterance.onend = finish;
    utterance.onerror = () => {
      if (finished || id !== playbackId) return;
      activeUtterance = null;
      started();
      fallbackTimer = window.setTimeout(finish, Math.max(1200, text.length * 28));
    };
    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } else {
    started();
    fallbackTimer = window.setTimeout(finish, Math.max(1200, text.length * 28));
  }
}

function playTimeline(sceneIndex, fromStart = true) {
  activeStep = fromStart ? -1 : activeStep;
  const id = playbackId;
  const lines = timelines[sceneIndex];
  let lineIndex = 0;
  playing = true;
  controls.playPause.innerHTML = '<i>Ⅱ</i><span>Pausar</span>';
  document.querySelectorAll('[data-kairos-status]').forEach(item => { item.textContent = 'HABLANDO AHORA'; });
  document.querySelector('[data-intro-status]').textContent = 'KAIROS · HABLANDO';
  render();
  const nextLine = () => {
    if (id !== playbackId || activeScene !== sceneIndex) return;
    if (lineIndex >= lines.length) {
      playing = false;
      controls.playPause.innerHTML = '<i>↻</i><span>Repetir</span>';
      document.querySelectorAll('[data-kairos-status]').forEach(item => { item.textContent = 'PRESENTACIÓN COMPLETA'; });
      if (sceneIndex < scenes.length - 1) fallbackTimer = window.setTimeout(() => goToScene(sceneIndex + 1), 120);
      return;
    }
    const currentStep = lineIndex;
    speak(lines[lineIndex], () => {
      activeStep = currentStep;
      if (sceneIndex === 0) activeFragment = currentStep - 1;
      render();
    }, () => { lineIndex += 1; nextLine(); }, id);
  };
  nextLine();
}

function goToScene(index) {
  cancelPlayback();
  activeScene = Math.max(0, Math.min(index, scenes.length - 1));
  activeStep = -1;
  if (activeScene === 0) activeFragment = fragments.length - 1;
  render();
  if (timelines[activeScene]) playTimeline(activeScene);
}

function play() {
  if (playing) return cancelPlayback();
  activeFragment = 0;
  playTimeline(activeScene);
}

controls.previous.addEventListener('click', () => goToScene(activeScene - 1));
controls.next.addEventListener('click', () => goToScene(activeScene + 1));
controls.playPause.addEventListener('click', play);
document.querySelector('[data-go="1"]').addEventListener('click', () => goToScene(1));
document.querySelector('[data-intro-play]').addEventListener('click', play);
document.querySelectorAll('[data-replay]').forEach(button => button.addEventListener('click', () => { cancelPlayback(); playTimeline(Number(button.dataset.replay)); }));

render();
window.ORHA = { goToScene, play, cancelPlayback, playTimeline, timelines, getState: () => ({ activeScene, activeFragment, activeStep, playing }) };
