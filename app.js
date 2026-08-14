const scenes = [...document.querySelectorAll('[data-scene]')];
const fragments = [...document.querySelectorAll('.fragment')];
let activeScene = 0;
let activeFragment = 0;
let timer = null;

const controls = {
  previous: document.querySelector('#previous'),
  next: document.querySelector('#next'),
  playPause: document.querySelector('#play-pause'),
  progress: document.querySelector('#progress'),
  number: document.querySelector('#scene-number'),
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
}

function goToScene(index) {
  activeScene = Math.max(0, Math.min(index, scenes.length - 1));
  if (activeScene === 0) activeFragment = fragments.length - 1;
  render();
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
      render();
    } else {
      stopPlayback('Repetir');
    }
  }, 2600);
}

controls.previous.addEventListener('click', () => goToScene(activeScene - 1));
controls.next.addEventListener('click', () => goToScene(activeScene + 1));
controls.playPause.addEventListener('click', () => timer ? stopPlayback() : play());
document.querySelector('[data-go="1"]').addEventListener('click', () => goToScene(1));

render();
window.ORHA = { goToScene, play, stopPlayback, getState: () => ({ activeScene, activeFragment, playing: Boolean(timer) }) };
