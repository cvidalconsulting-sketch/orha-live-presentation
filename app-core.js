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
  ],
  5: [
    'Ahora quiero mostrarte que existe más de una forma de construir la misma ORHA.',
    'La visión no tiene que cambiar. La calidad tampoco. Lo que puede cambiar es cuánto capital decides comprometer antes de saber qué está funcionando.',
    'El primer camino es el modelo actual.',
    'Hoy ese modelo contempla una comisión de tienda del 15%, mil quinientos dólares mensuales de pauta y dos mil doscientos dólares mensuales de agencia.',
    'Son tres mil setecientos dólares mensuales de marketing, además de una estructura que compromete varios costos desde el comienzo.',
    'Este camino puede funcionar. Pero es también el que deja menos espacio para equivocarse antes de haber aprendido del mercado.',
    'El segundo camino mantiene la misma ORHA, pero optimiza la arquitectura alrededor del producto.',
    'ORHA Direct puede convertirse en el núcleo del servicio. El App Store puede ser un canal adicional cuando demuestre que produce suficiente valor para justificar su costo.',
    'La publicidad se mantiene porque necesitamos aprender. Lo que no tiene que mantenerse automáticamente es toda la estructura fija alrededor de ella.',
    'La landing, la operación de marketing y otros componentes pueden construirse de forma más eficiente sin reducir la experiencia que recibe el cliente.',
    'El tercer camino lleva ese principio más lejos: evidencia primero.',
    'En lugar de comprometer toda la estructura desde el inicio, liberamos capital por etapas y utilizamos cada etapa para medir conversión, adquisición, retención y churn.',
    'Si los datos responden mejor de lo esperado, aceleramos y podemos incorporar más inversión, más canales y proveedores premium.',
    'Si los datos no responden, corregimos antes de convertir una hipótesis equivocada en un costo fijo mayor.',
    'Los tres caminos pueden conducir a la misma ORHA.',
    'La pregunta no es cuál ORHA quieres construir. Esa ya la definiste. La pregunta es cuánto capital quieres arriesgar antes de demostrar que el mercado también la quiere.'
  ],
  6: [
    'Hay una parte del modelo que merece verse de otra forma.',
    'Actualmente proyectas aproximadamente mil seiscientas sesenta y siete personas entrando al período gratuito cada mes.',
    'ORHA paga el costo de inteligencia artificial de todas ellas, no solamente de las que después se suscriben.',
    'El modelo estima aproximadamente mil sesenta y siete dólares mensuales financiando esos trials.',
    'Y con una conversión cercana al cinco por ciento, aproximadamente ochenta y tres personas terminan pagando.',
    'Eso significa que alrededor de mil quinientas ochenta y cuatro personas utilizaron ORHA, generaron costo y no produjeron ingreso.',
    'Ahora incorporemos el costo de conseguir esas conversiones.',
    'El modelo contempla mil quinientos dólares mensuales de pauta y dos mil doscientos dólares mensuales de agencia y gestión.',
    'Sumados al costo de inteligencia artificial de los trials, hablamos de aproximadamente cuatro mil setecientos sesenta y siete dólares mensuales asociados a adquirir usuarios y permitirles probar el producto.',
    'Distribuido entre las conversiones nuevas del modelo, el desembolso económico inicial asociado es de aproximadamente cincuenta y siete dólares por nuevo cliente pago.',
    'Ese número no sustituye al CAC del modelo. Incluye también el costo de financiar a quienes probaron ORHA y no pagaron.',
    'Entonces aparece una pregunta más importante: ¿cuánto tiempo tiene que quedarse un cliente para devolver aproximadamente lo que costó conseguirlo?',
    'En Plus mensual, el modelo calcula aproximadamente diez dólares con veinte centavos de contribución mensual por suscriptor.',
    'Con esta estructura de adquisición, hablamos de aproximadamente cinco punto seis meses. En términos prácticos, cerca de seis meses.',
    'En Básico, con una contribución aproximada de cinco dólares con seis centavos al mes, la recuperación simple se acerca a once punto tres meses.',
    'Y eso ocurre antes de atribuir otros costos fijos de la empresa.',
    'Además, conseguir que alguien pague no significa que el problema terminó.',
    'El modelo supone un churn mensual cercano al ocho por ciento para Básico y Plus mensual.',
    'Por eso adquirir clientes no basta. Necesitamos adquirirlos, convertirlos y mantenerlos durante suficiente tiempo para recuperar lo que costaron.',
    'Ahora veamos qué ocurre si ampliamos el alcance demasiado pronto.',
    'Como ejemplo ilustrativo, cinco mil personas entrando al trial, al costo actual del modelo, representarían aproximadamente tres mil doscientos dólares solamente en inteligencia artificial de prueba.',
    'Eso no es una proyección. Es una forma de entender que ampliar cobertura también amplía exposición.',
    'No podemos convertir en constantes la conversión, el churn, la retención, la demanda o la disposición a pagar.',
    'No podemos ordenar al mercado que convierta cinco por ciento ni ordenar al cliente que permanezca seis meses.',
    'Pero sí podemos convertir en constantes los límites económicos que estamos dispuestos a aceptar mientras aprendemos.',
    'Podemos limitar cuánto cuesta experimentar con cada usuario gratuito.',
    'Podemos limitar cuánto invertimos en publicidad antes de validar que funciona.',
    'Podemos exigir que una estructura fija, como una agencia, demuestre que justifica su costo.',
    'Podemos definir cuánto CAC puede soportar realmente el margen antes de comprar más crecimiento.',
    'Y podemos expandir mercados solamente después de demostrar que la cohorte anterior convierte y permanece.',
    'Eso cambia la lógica del lanzamiento.',
    'En lugar de comenzar con tres días de trial y descubrir después si eran necesarios, podemos empezar con una exposición menor y ampliar solamente si la evidencia demuestra que mejora suficientemente la conversión.',
    'En lugar de asumir toda la inversión publicitaria desde el inicio, podemos comenzar con adquisición orgánica y aumentar pauta progresivamente.',
    'También hay un dato que merece atención: el modelo asigna dos mil doscientos dólares mensuales a agencia y gestión, frente a mil quinientos dólares mensuales de pauta.',
    'Es decir, actualmente el modelo presupuestó más para agencia y gestión que para la propia compra de publicidad.',
    'El precio también puede cambiar, pero subirlo mejora margen mientras puede reducir conversión. Esa variable debe probarse, no suponerse.',
    'Y el canal también importa. Una venta directa puede evitar parte de la comisión de tienda, pero el canal debe evaluarse por el valor real que produzca.',
    'El objetivo no es crecer más lento.',
    'Es evitar quedarnos sin capital antes de descubrir cómo crecer.',
    'Primero convertimos. Después comprobamos permanencia. Luego calculamos recuperación. Y solamente entonces compramos crecimiento.'
  ]
};

const sceneMedia = {
  0: {
    src: 'media/scene-01-kairos.mp3',
    cues: [0, 2.16, 6.88, 18.05, 25.77, 34.12]
  },
  1: {
    src: 'media/scene-02-kairos.mp3',
    cues: [0, 7.74, 11.61, 18.90, 24.45, 30.92, 38.29, 42.46, 47.27]
  }
};

let activeScene = 0;
let activeFragment = 0;
let activeStep = -1;
let playing = false;
let playbackId = 0;
let fallbackTimer = null;
let activeUtterance = null;
let activeAudio = null;
let mediaFallbackUsed = false;

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

function setKairosStatus(status, introStatus = status) {
  document.querySelectorAll('[data-kairos-status]').forEach(item => { item.textContent = status; });
  document.querySelector('[data-intro-status]').textContent = `KAIROS · ${introStatus}`;
}

function stopActiveAudio() {
  if (!activeAudio) return;
  activeAudio.pause?.();
  try { activeAudio.currentTime = 0; } catch (_) {}
  activeAudio.ontimeupdate = null;
  activeAudio.onended = null;
  activeAudio.onerror = null;
  activeAudio = null;
}

function cancelPlayback(label = 'Reproducir') {
  playbackId += 1;
  playing = false;
  window.clearTimeout(fallbackTimer);
  stopActiveAudio();
  if (activeUtterance || window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  activeUtterance = null;
  mediaFallbackUsed = false;
  controls.playPause.innerHTML = `<i>▶</i><span>${label}</span>`;
  setKairosStatus('LISTA PARA PRESENTAR', 'LISTA');
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

function completeTimeline(sceneIndex, id) {
  if (id !== playbackId || activeScene !== sceneIndex) return;
  playing = false;
  controls.playPause.innerHTML = '<i>↻</i><span>Repetir</span>';
  setKairosStatus('PRESENTACIÓN COMPLETA', 'COMPLETA');
  if (sceneIndex < scenes.length - 1) fallbackTimer = window.setTimeout(() => goToScene(sceneIndex + 1), 120);
}

function playSpeechTimeline(sceneIndex, fromStart = true) {
  activeStep = fromStart ? -1 : activeStep;
  const id = playbackId;
  const lines = timelines[sceneIndex];
  let lineIndex = 0;
  playing = true;
  controls.playPause.innerHTML = '<i>Ⅱ</i><span>Pausar</span>';
  setKairosStatus('HABLANDO AHORA', 'HABLANDO');
  render();
  const nextLine = () => {
    if (id !== playbackId || activeScene !== sceneIndex) return;
    if (lineIndex >= lines.length) return completeTimeline(sceneIndex, id);
    const currentStep = lineIndex;
    speak(lines[lineIndex], () => {
      activeStep = currentStep;
      if (sceneIndex === 0) activeFragment = currentStep - 1;
      render();
    }, () => { lineIndex += 1; nextLine(); }, id);
  };
  nextLine();
}

function playMediaTimeline(sceneIndex, fromStart = true) {
  const config = sceneMedia[sceneIndex];
  if (!config || typeof window.Audio !== 'function') return playSpeechTimeline(sceneIndex, fromStart);

  activeStep = fromStart ? -1 : activeStep;
  if (sceneIndex === 0) activeFragment = -1;
  const id = playbackId;
  const audio = new window.Audio(config.src);
  activeAudio = audio;
  mediaFallbackUsed = false;
  playing = true;
  controls.playPause.innerHTML = '<i>Ⅱ</i><span>Pausar</span>';
  setKairosStatus('HABLANDO AHORA', 'VOZ REAL');
  render();

  const revealAt = time => {
    if (id !== playbackId || activeScene !== sceneIndex) return;
    let cueIndex = -1;
    for (let i = 0; i < config.cues.length; i += 1) {
      if (time + 0.04 >= config.cues[i]) cueIndex = i;
      else break;
    }
    if (cueIndex < 0 || cueIndex === activeStep) return;
    activeStep = cueIndex;
    if (sceneIndex === 0) activeFragment = cueIndex - 1;
    render();
  };

  const fallbackToSpeech = () => {
    if (mediaFallbackUsed || id !== playbackId || activeScene !== sceneIndex) return;
    mediaFallbackUsed = true;
    stopActiveAudio();
    playSpeechTimeline(sceneIndex, true);
  };

  audio.preload = 'auto';
  audio.ontimeupdate = () => revealAt(audio.currentTime || 0);
  audio.onplaying = () => revealAt(audio.currentTime || 0);
  audio.onended = () => {
    if (id !== playbackId || activeScene !== sceneIndex) return;
    activeAudio = null;
    activeStep = config.cues.length - 1;
    if (sceneIndex === 0) activeFragment = fragments.length - 1;
    render();
    completeTimeline(sceneIndex, id);
  };
  audio.onerror = fallbackToSpeech;

  let playResult;
  try { playResult = audio.play(); } catch (_) { fallbackToSpeech(); return; }
  if (playResult?.catch) playResult.catch(fallbackToSpeech);
}

function playTimeline(sceneIndex, fromStart = true) {
  if (sceneMedia[sceneIndex]) return playMediaTimeline(sceneIndex, fromStart);
  return playSpeechTimeline(sceneIndex, fromStart);
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

function installSceneSevenV2() {
  if (!scenes[6] || typeof document.createElement !== 'function' || !document.head) return;
  scenes[6].innerHTML = `
    <header class="scene-seven-head reveal" data-step="0"><div><p class="kicker">ECONOMÍA REAL DEL CRECIMIENTO</p><h2 id="scene-seven-title">EL RIESGO QUE TODAVÍA<br />PODEMOS CONTROLAR</h2></div><div class="kairos-stage"><div class="avatar-mount" data-avatar-mount></div><p><b>KAIROS</b><span data-kairos-status>LISTA PARA PRESENTAR</span></p></div></header>
    <div class="risk-stage">
      <div class="trial-funnel reveal" data-step="1" data-until="5"><p>TRIAL · 3 DÍAS<strong>≈ 1,667</strong><small>PERSONAS / MES</small></p><i>→</i><p>IA POR TRIAL<strong>≈ $0.64</strong><small>TOTAL IA · ≈ $1,067</small></p><i>→</i><p>CONVERSIÓN · ≈ 5%<strong>≈ 83</strong><small>CLIENTES PAGOS</small></p><em>≈ 1,584 PRUEBAN Y NO PAGAN</em></div>
      <div class="economic-equation reveal" data-step="6" data-until="10"><small class="kairos-verification">DOBLE VERIFICACIÓN KAIROS · DATOS DE FUENTE + RECONSTRUCCIÓN MATEMÁTICA</small><p>PAUTA<strong>$1,500</strong></p><b>+</b><p>AGENCIA / GESTIÓN<strong>$2,200</strong></p><b>+</b><p>IA DE TRIALS<strong>≈ $1,067</strong></p><b>=</b><p class="total">≈ $4,767<small>DESEMBOLSO MENSUAL ASOCIADO<br />A ADQUISICIÓN + TRIAL</small></p><span>÷ ≈ 83 CLIENTES PAGOS</span><div><strong>≈ $57</strong><small>COSTO ECONÓMICO INICIAL<br />POR NUEVO CLIENTE PAGO · NO SUSTITUYE EL CAC DEL MODELO</small></div></div>
      <div class="payback-stage reveal" data-step="11" data-until="15"><article class="reveal" data-step="12">PLUS MENSUAL<small>COSTO INICIAL · ≈ $57</small><b>≈ $10.20 / MES</b><strong>PAYBACK SIMPLE · ≈ 5.6 MESES</strong><em>≈ 6 MESES PARA RECUPERAR</em></article><article class="reveal" data-step="14">BÁSICO<small>COSTO INICIAL · ≈ $57</small><b>≈ $5.06 / MES</b><strong>PAYBACK SIMPLE · ≈ 11.3 MESES</strong></article><p>ANTES DE OTROS COSTOS FIJOS</p></div>
      <div class="churn-stage reveal" data-step="16" data-until="18"><h3>ADQUIRIR ≠ RENTABILIDAD</h3><div>ADQUIRIR + CONVERTIR + PERMANECER = <strong>POSIBILIDAD DE RENTABILIDAD</strong></div><p>CHURN MENSUAL DEL MODELO<br />BÁSICO <b>8%</b> · PLUS MENSUAL <b>8%</b> · PLUS ANUAL <b>2%</b></p></div>
      <div class="scale-risk reveal" data-step="19" data-until="21"><small>ESCENARIO ILUSTRATIVO<br /><b>NO PROYECCIÓN DEL MODELO</b></small><strong>5,000 PERSONAS EN TRIAL</strong><span>5,000 × $0.64 =</span><em>≈ $3,200</em><p>SOLO EN IA DE PRUEBA</p><h3>EL ALCANCE PUEDE CRECER MÁS RÁPIDO QUE LA CAPACIDAD DE FINANCIAR EL APRENDIZAJE.</h3></div>
      <div class="unknown-variables reveal" data-step="22" data-until="23"><h3>NO PODEMOS FIJAR</h3><p>CONVERSIÓN · CHURN · RETENCIÓN · DISPOSICIÓN A PAGAR · CPI · DEMANDA · USO REAL DE IA</p></div>
      <div class="controlled-limits reveal" data-step="24" data-until="29"><h3>LO QUE SÍ PODEMOS CONTROLAR</h3><p>TRIAL <b>→ COSTO MÁXIMO DE EXPERIMENTACIÓN</b></p><p>PUBLICIDAD <b>→ PRESUPUESTO MÁXIMO ANTES DE VALIDAR</b></p><p>AGENCIA <b>→ COSTO FIJO MÁXIMO JUSTIFICABLE</b></p><p>CAC <b>→ MÁXIMO QUE EL MARGEN PUEDE RECUPERAR</b></p><p>EXPANSIÓN <b>→ SOLO DESPUÉS DE VALIDAR LA COHORTE ANTERIOR</b></p><p>CAPITAL <b>→ TRAMOS, NO CHEQUE EN BLANCO</b></p></div>
      <div class="financial-levers reveal" data-step="30" data-until="36"><article class="reveal" data-step="31">01 · TRIAL<strong>ACTUAL · 3 DÍAS</strong><b>ALTERNATIVA A MODELAR · 1 DÍA</b><small>EMPEZAR CON MENOR EXPOSICIÓN Y AMPLIAR SOLO SI LA CONVERSIÓN LO JUSTIFICA</small></article><article class="reveal" data-step="32">03 · ADQUISICIÓN<strong>PAUTA · $1,500 / MES</strong><b>ORGÁNICO PRIMERO + PAUTA PROGRESIVA</b></article><article class="reveal" data-step="33">04 · AGENCIA<strong>AGENCIA / GESTIÓN · $2,200 / MES</strong><b>VS. PAUTA · $1,500 / MES</b><small>EL MODELO PRESUPUESTA MÁS PARA AGENCIA Y GESTIÓN QUE PARA LA PROPIA PAUTA.</small></article><article class="reveal" data-step="35">02 · PRECIO<strong>BÁSICO $7.99 · PLUS $14.99</strong><b>PRECIO MAYOR → MAYOR CONTRIBUCIÓN POTENCIAL · POSIBLE MENOR CONVERSIÓN</b><small>EL PRECIO DEBE PROBARSE, NO SUPONERSE.</small></article><article class="reveal" data-step="36">05 · CANAL<strong>TIENDA · 15%</strong><b>ORHA DIRECT + TIENDA CUANDO JUSTIFIQUE SU COSTO</b></article></div>
      <div class="growth-sequence reveal" data-step="37" data-until="38"><p>PRIMERO<strong>CONVERTIR</strong></p><i>↓</i><p>DESPUÉS<strong>COMPROBAR PERMANENCIA</strong></p><i>↓</i><p>LUEGO<strong>CALCULAR PAYBACK</strong></p><i>↓</i><p>ENTONCES<strong>COMPRAR CRECIMIENTO</strong></p></div>
      <div class="risk-close reveal" data-step="39">EL OBJETIVO<br /><strong>NO ES CRECER MÁS LENTO.</strong><span>ES EVITAR<br />QUEDARSE SIN CAPITAL<br />ANTES DE SABER<br />CÓMO CRECER.</span></div>
    </div><button class="replay-scene" data-replay="6" type="button">REPRODUCIR DE NUEVO</button>`;
  const style = document.createElement('style');
  style.id = 'scene-seven-v2';
  style.textContent = `.scene-seven{padding:3.5vh 1.2vw 2vh}.scene-seven-head{display:flex;justify-content:space-between}.scene-seven h2{font-size:clamp(28px,2.7vw,46px)}.risk-stage{position:relative;height:530px;margin-top:2vh;border:1px solid var(--line);background:#091512;overflow:hidden}.risk-stage i{font-style:normal}.trial-funnel,.economic-equation,.payback-stage,.churn-stage,.scale-risk,.unknown-variables,.controlled-limits,.financial-levers,.growth-sequence,.risk-close{position:absolute;inset:0;background:#091512}.trial-funnel,.economic-equation,.payback-stage,.growth-sequence{display:flex;align-items:center;justify-content:center;gap:12px;padding:25px}.trial-funnel p,.economic-equation p,.payback-stage article,.growth-sequence p{padding:16px;border:1px solid var(--line);text-align:center}.trial-funnel strong,.trial-funnel small,.economic-equation strong,.economic-equation small,.payback-stage strong,.payback-stage small,.payback-stage b,.payback-stage em,.growth-sequence strong{display:block;margin-top:7px}.trial-funnel strong,.economic-equation strong{color:var(--aqua);font:500 24px "Manrope"}.trial-funnel em{position:absolute;bottom:60px;color:var(--peach)}.economic-equation{flex-wrap:wrap}.economic-equation .total,.economic-equation>div strong{color:var(--lime);font-size:30px}.economic-equation>div{width:100%;text-align:center}.payback-stage article{width:40%}.payback-stage>p{position:absolute;bottom:40px;color:var(--peach)}.churn-stage,.scale-risk,.unknown-variables,.controlled-limits,.financial-levers,.risk-close{display:grid;place-content:center;text-align:center;padding:30px}.churn-stage h3,.unknown-variables h3,.controlled-limits h3{color:var(--lime);font:500 42px "Manrope"}.churn-stage strong{color:var(--aqua)}.scale-risk strong,.scale-risk span,.scale-risk em,.scale-risk p{display:block;margin:8px}.scale-risk em{color:var(--peach);font:500 55px "Manrope"}.scale-risk small{color:var(--aqua)}.controlled-limits p{margin:4px;padding:9px;border:1px solid var(--line);text-align:left}.controlled-limits b{color:var(--aqua)}.financial-levers{grid-template-columns:repeat(5,1fr);gap:7px}.financial-levers article{padding:12px;border:1px solid var(--line);text-align:left;font-size:clamp(10px,.8vw,13px);line-height:1.35}.financial-levers strong,.financial-levers b,.financial-levers small{display:block;margin-top:9px;font-size:inherit}.financial-levers b{color:var(--aqua)}.financial-levers small{color:var(--lime)}.growth-sequence p{font-size:clamp(10px,.75vw,12px)}.growth-sequence strong{color:var(--lime);font-size:clamp(14px,1.15vw,18px)}.risk-close{color:var(--sage);font:500 clamp(34px,5vw,70px)/1.05 "Manrope"}.risk-close strong,.risk-close span{display:block}.risk-close strong{color:var(--cream)}.risk-close span{margin-top:20px;color:var(--lime)}.kairos-verification{position:absolute;top:18px;left:22px;color:var(--sage);font-size:clamp(9px,.7vw,11px);letter-spacing:.16em}@media(max-width:620px){.scene-seven-head{display:block}.risk-stage{height:820px;overflow:hidden}.trial-funnel,.economic-equation,.payback-stage,.growth-sequence{flex-direction:column;gap:5px;padding:14px}.trial-funnel p,.economic-equation p,.payback-stage article,.growth-sequence p{width:auto;margin:0;padding:9px}.trial-funnel em,.payback-stage>p{position:static}.financial-levers{grid-template-columns:1fr;padding:12px}.financial-levers article{padding:8px;font-size:11px;line-height:1.4}.controlled-limits{padding:12px}.controlled-limits h3,.unknown-variables h3,.churn-stage h3{font-size:28px}.kairos-verification{position:static;width:100%;font-size:10px;text-align:center}.growth-sequence p{font-size:11px}.growth-sequence strong{font-size:16px}}`;
  document.head.appendChild(style);
}

installSceneSevenV2();

controls.previous.addEventListener('click', () => goToScene(activeScene - 1));
controls.next.addEventListener('click', () => goToScene(activeScene + 1));
controls.playPause.addEventListener('click', play);
document.querySelector('[data-go="1"]').addEventListener('click', () => goToScene(1));
document.querySelector('[data-intro-play]').addEventListener('click', play);
document.querySelectorAll('[data-replay]').forEach(button => button.addEventListener('click', () => { cancelPlayback(); playTimeline(Number(button.dataset.replay)); }));

render();
window.ORHA = { goToScene, play, cancelPlayback, playTimeline, timelines, sceneMedia, getState: () => ({ activeScene, activeFragment, activeStep, playing }) };