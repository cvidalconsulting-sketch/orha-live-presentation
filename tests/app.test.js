const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor() {
    this.hidden = false;
    this.disabled = false;
    this.textContent = '';
    this.innerHTML = '';
    this.style = {};
    this.dataset = {};
    this.listeners = {};
    this.classes = new Set();
    this.classList = { toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name) };
  }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  click() { this.listeners.click(); }
  querySelector() { return this.label || (this.label = new Element()); }
}

const scenes = [new Element(), new Element()];
const fragments = Array.from({ length: 5 }, () => new Element());
const speeches = Array.from({ length: 8 }, (_, index) => Object.assign(new Element(), { dataset: { speech: String(index) } }));
const reveals = Array.from({ length: 9 }, (_, index) => Object.assign(new Element(), { dataset: { reveal: String(Math.min(index, 7)) } }));
const elements = Object.fromEntries(['previous', 'next', 'play-pause', 'progress', 'scene-number', 'step-number', 'advance-step'].map(id => [`#${id}`, new Element()]));
elements['[data-go="1"]'] = new Element();

const document = {
  querySelectorAll: selector => selector === '[data-scene]' ? scenes : selector === '.fragment' ? fragments : selector === '[data-speech]' ? speeches : reveals,
  querySelector: selector => elements[selector],
};
let intervalCallback;
const sandbox = {
  document,
  console,
  window: {
    setInterval: callback => { intervalCallback = callback; return 1; },
    clearInterval: () => {},
  },
};

vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), sandbox);

assert.deepEqual(JSON.parse(JSON.stringify(sandbox.window.ORHA.getState())), { activeScene: 0, activeFragment: 0, activeStep: 0, playing: false });
assert.equal(scenes[0].hidden, false);
assert.equal(scenes[1].hidden, true);
assert.equal(elements['#previous'].disabled, true);

elements['#next'].click();
assert.equal(sandbox.window.ORHA.getState().activeScene, 1);
assert.equal(scenes[0].hidden, true);
assert.equal(scenes[1].hidden, false);
assert.equal(elements['#scene-number'].textContent, '02');
assert.equal(elements['#step-number'].textContent, '01');
assert.equal(speeches[0].classes.has('is-current'), true);
assert.equal(reveals[0].classes.has('is-revealed'), true);
elements['#advance-step'].click();
assert.equal(sandbox.window.ORHA.getState().activeStep, 1);
assert.equal(speeches[1].classes.has('is-current'), true);
for (let step = 2; step <= 7; step += 1) sandbox.window.ORHA.advanceAnalysis();
assert.equal(sandbox.window.ORHA.getState().activeStep, 7);
assert.equal(speeches[7].classes.has('is-current'), true);
assert.equal(elements['#advance-step'].classes.has('is-complete'), true);

elements['#previous'].click();
assert.equal(sandbox.window.ORHA.getState().activeScene, 0);
elements['#play-pause'].click();
assert.equal(sandbox.window.ORHA.getState().playing, true);
intervalCallback();
assert.equal(sandbox.window.ORHA.getState().activeFragment, 1);
elements['#play-pause'].click();
assert.equal(sandbox.window.ORHA.getState().playing, false);

const html = fs.readFileSync('index.html', 'utf8');
assert.match(html, /Hola, Thelma/);
assert.match(html, /−\$50,955/);
assert.match(html, /YA INVERTIDO/);
assert.match(html, /CAPITAL NUEVO EN RIESGO/);
assert.match(html, /COLCHÓN RESTANTE/);
assert.doesNotMatch(html, /ESCENA 3|data-scene="2"/);

console.log('Las dos escenas, su contenido y navegación fueron verificados.');
