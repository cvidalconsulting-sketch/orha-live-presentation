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
  ],
  3: [
    'Ahora quiero mostrarte por qué la conversión es probablemente la variable más importante de todo este modelo.',
    'Una diferencia de apenas uno o dos puntos porcentuales cambia radicalmente el resultado.',
    'Primero veamos un escenario cauteloso.',
    'Si la conversión se queda alrededor del 4%, ORHA todavía puede llegar a ser rentable operativamente, aproximadamente en el mes 22.',
    'Pero el problema es el capital.',
    'La necesidad acumulada de caja podría subir a un rango cercano a 58 mil o incluso 63 mil dólares.',
    'Eso consumiría prácticamente todo el capital disponible y podría llevar la recuperación total más allá de los 48 meses.',
    'En otras palabras: el negocio podría sobrevivir, pero financieramente sería un escenario muy exigente.',
    'Ahora veamos el escenario base.',
    'Con una conversión cercana al 5%, la operación se vuelve rentable alrededor del mes 15.',
    'La máxima exposición acumulada es de aproximadamente 50 mil 955 dólares.',
    'La inversión completa se recupera cerca del mes 43.',
    'Y al finalizar los 48 meses, el resultado operativo acumulado generado es de aproximadamente 41 mil 593 dólares.',
    'Este es el escenario sobre el cual está construido actualmente el plan.',
    'Ahora veamos qué ocurre si la conversión mejora solamente un punto más.',
    'Con aproximadamente 6%, la operación entra en rentabilidad antes.',
    'La necesidad máxima de capital disminuye.',
    'La recuperación ocurre más rápido.',
    'Y el beneficio acumulado proyectado al final del período puede acercarse a 96 mil 500 dólares.',
    'Ese es el dato importante.',
    'Estamos hablando de una diferencia entre 4%, 5% y 6%.',
    'Solo dos puntos porcentuales.',
    'Pero financieramente es la diferencia entre consumir prácticamente todo el capital disponible y construir un negocio saludable.',
    'Por eso la conversión no es una métrica secundaria.',
    'Es una de las variables que decidirán el resultado de ORHA.'
  ],
  4: [
    'Ahora viene la parte más importante: qué haría yo con esta información.',
    'No comprometería los 39 mil dólares líquidos de una sola vez.',
    'Eso no significa invertir menos. Significa liberar capital progresivamente, a medida que ORHA demuestre que los supuestos del modelo se están cumpliendo.',
    'Cada nueva inversión debe comprar algo más valioso que crecimiento: debe comprar evidencia.',
    'La conversión, el costo de adquisición, la retención y el churn deben determinar cuánto capital se libera después.',
    'Si los resultados son mejores que el modelo, aceleramos.',
    'Si están cerca del modelo, continuamos con disciplina.',
    'Y si son peores que el modelo, ajustamos antes de seguir exponiendo capital. Si la evidencia lo exige, detenemos.',
    'El capital no es solamente dinero disponible. También es tiempo para aprender antes de quedarnos sin opciones.',
    'Por eso mi recomendación no es invertir menos.',
    'Es invertir con control.',
    'Evidencia antes de liberar más capital.'
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
    scene.querySelectorAll?.('[data-step]').forEach(item => {
      const withinRange = item.dataset.until === undefined || activeStep <= Number(item.dataset.until);
      item.classList.toggle('is-revealed', active && Number(item.dataset.step) <= activeStep && withinRange);
    });
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