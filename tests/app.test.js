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
    this.listeners = {};
    this.classes = new Set();
    this.classList = { toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name) };
  }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  click() { this.listeners.click(); }
}

const scenes = [new Element(), new Element()];
const fragments = Array.from({ length: 5 }, () => new Element());
const elements = Object.fromEntries(['previous', 'next', 'play-pause', 'progress', 'scene-number'].map(id => [`#${id}`, new Element()]));
elements['[data-go="1"]'] = new Element();

const document = {
  querySelectorAll: selector => selector === '[data-scene]' ? scenes : fragments,
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

assert.deepEqual(JSON.parse(JSON.stringify(sandbox.window.ORHA.getState())), { activeScene: 0, activeFragment: 0, playing: false });
assert.equal(scenes[0].hidden, false);
assert.equal(scenes[1].hidden, true);
assert.equal(elements['#previous'].disabled, true);

elements['#next'].click();
assert.equal(sandbox.window.ORHA.getState().activeScene, 1);
assert.equal(scenes[0].hidden, true);
assert.equal(scenes[1].hidden, false);
assert.equal(elements['#scene-number'].textContent, '02');

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
