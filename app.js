const scenes = [...document.querySelectorAll('[data-scene]')];
const fragments = [...document.querySelectorAll('.fragment')];
let activeScene = 0;
let activeFragment = 0;
let activeStep = 0;
let timer = null;
let analysisTimer = null;

const sceneTwoCues = [
  { at: 0, speech: 0 }, { at: 5.2, speech: 1 }, { at: 10.2, speech: 2 },
  { at: 14.8, speech: 3 }, { at: 18.2, speech: 4 }, { at: 22.6, speech: 5 },
  { at: 27.4, speech: 6 }, { at: 31.2, speech: 7 }, { at: 36.2, speech: 8 },
];

const controls = {
  previous: document.querySelector('#previous'),
  next: document.querySelector('#next'),
  playPause: document.querySelector('#play-pause'),
  progress: document.querySelector('#progress'),
  number: document.querySelector('#scene-number'),
  stepNumber: document.querySelector('#step-number'),
  replayAnalysis: document.querySelector('#replay-analysis'),
  voiceStatus: document.querySelector('#voice-status'),
  sceneTwoAudio: document.querySelector('#kairos-scene-two-audio'),
};

function render() {
  scenes.forEach((scene, index) => {
    const active = index === activeScene;
    scene.hidden = !active;
    scene.classList.toggle('is-active', active);
  });
  fragments.forEach((fragment, index) => fragment.classList.toggle('is-visible', index <= activeFragment));
  controls.number.textContent = String(activeScene + 1).padStart(2, '0');
  controls.progress.style.width = `${(activeScene + 1) * 50}%`;
  controls.previous.disabled = activeScene === 0;
  controls.next.disabled = activeScene === scenes.length - 1;
  scenes[1].dataset.step = String(activeStep);
  controls.stepNumber.textContent = String(activeStep + 1).padStart(2, '0');
  document.querySelectorAll('[data-speech]').forEach(speech => speech.classList.toggle('is-current', Number(speech.dataset.speech) === activeStep));
  document.querySelectorAll('[data-reveal]').forEach(element => element.classList.toggle('is-revealed', Number(element.dataset.reveal) <= activeStep));
  controls.replayAnalysis.classList.toggle('is-playing', Boolean(analysisTimer) || !controls.sceneTwoAudio.paused);
}

function goToScene(index) {
  activeScene = Math.max(0, Math.min(index, scenes.length - 1));
  if (activeScene === 0) { activeFragment = fragments.length - 1; stopSceneTwo(); }
  if (activeScene === 1) activeStep = 0;
  render();
  if (activeScene === 1) playSceneTwo();
}

function advanceAnalysis() {
  if (activeStep < sceneTwoCues.length - 1) activeStep += 1;
  render();
}

function stopSceneTwo() {
  window.clearInterval(analysisTimer);
  analysisTimer = null;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (controls.sceneTwoAudio.pause) controls.sceneTwoAudio.pause();
}

function finishSceneTwo() {
  analysisTimer = null;
  controls.voiceStatus.innerHTML = '<i></i> ANÁLISIS COMPLETO';
  render();
}

function playTemporaryVoice(cueIndex = 0) {
  activeStep = cueIndex;
  render();
  if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
    const speech = document.querySelector(`[data-speech="${cueIndex}"]`).textContent;
    const utterance = new window.SpeechSynthesisUtterance(speech);
    utterance.lang = 'es-MX';
    utterance.rate = 0.94;
    utterance.onend = () => cueIndex < sceneTwoCues.length - 1 ? playTemporaryVoice(cueIndex + 1) : finishSceneTwo();
    window.speechSynthesis.speak(utterance);
    return;
  }
  analysisTimer = window.setInterval(() => {
    if (activeStep < sceneTwoCues.length - 1) advanceAnalysis();
    else { window.clearInterval(analysisTimer); finishSceneTwo(); }
  }, 3600);
}

function syncAudioTimeline() {
  const elapsed = controls.sceneTwoAudio.currentTime;
  const cue = sceneTwoCues.findLastIndex(item => elapsed >= item.at);
  if (cue >= 0 && cue !== activeStep) { activeStep = cue; render(); }
}

function configureSceneTwoAudio({ src, voiceId = '' }) {
  controls.sceneTwoAudio.dataset.audioSrc = src;
  controls.sceneTwoAudio.dataset.voiceId = voiceId;
}

function playSceneTwo() {
  stopSceneTwo();
  activeStep = 0;
  controls.voiceStatus.innerHTML = '<i></i> KAIROS · HABLANDO';
  const source = controls.sceneTwoAudio.dataset.audioSrc;
  if (source && controls.sceneTwoAudio.play) {
    controls.sceneTwoAudio.src = source;
    controls.sceneTwoAudio.currentTime = 0;
    controls.sceneTwoAudio.play().catch(() => playTemporaryVoice());
  } else {
    playTemporaryVoice();
  }
}

function stopPlayback(label = 'Reproducir') {
  window.clearInterval(timer);
  timer = null;
  controls.playPause.innerHTML = `<i>▶</i><span>${label}</span>`;
}

function play() {
  if (activeScene === 1 || activeFragment === fragments.length - 1) {
    activeScene = 0;
    activeFragment = 0;
    render();
  }
  controls.playPause.innerHTML = '<i>Ⅱ</i><span>Pausar</span>';
  timer = window.setInterval(() => {
    if (activeScene === 0 && activeFragment < fragments.length - 1) {
      activeFragment += 1;
      render();
    } else if (activeScene === 0) {
      activeScene = 1;
      activeStep = 0;
      render();
      window.clearInterval(timer);
      timer = null;
      playSceneTwo();
    } else {
      stopPlayback('Repetir');
    }
  }, 2600);
}

controls.previous.addEventListener('click', () => goToScene(activeScene - 1));
controls.next.addEventListener('click', () => goToScene(activeScene + 1));
controls.playPause.addEventListener('click', () => timer ? stopPlayback() : play());
document.querySelector('[data-go="1"]').addEventListener('click', () => goToScene(1));
controls.replayAnalysis.addEventListener('click', playSceneTwo);
controls.sceneTwoAudio.addEventListener('timeupdate', syncAudioTimeline);
controls.sceneTwoAudio.addEventListener('ended', finishSceneTwo);

render();
window.ORHA = { configureSceneTwoAudio, goToScene, play, stopPlayback, playSceneTwo, getState: () => ({ activeScene, activeFragment, activeStep, playing: Boolean(timer || analysisTimer) }) };
