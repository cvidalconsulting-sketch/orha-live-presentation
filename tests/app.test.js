const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor(dataset = {}) { this.dataset = dataset; this.textContent = ''; this.innerHTML = ''; this.style = {}; this.attributes = {}; this.listeners = {}; this.classList = { toggle: (name, on) => this.active = name === 'active' && on }; }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  click() { this.listeners.click(); }
  setAttribute(name, value) { this.attributes[name] = value; }
}

const ids = ['scenario-name', 'slide-counter', 'slide-title', 'slide-description', 'metric-title', 'metric-value', 'progress', 'bars', 'metrics-grid', 'play-pause', 'playback-status', 'next', 'previous'];
const elements = Object.fromEntries(ids.map(id => [`#${id}`, new Element()]));
const scenarioButtons = ['negative', 'moderate', 'positive'].map(key => new Element({ scenario: key }));
const document = {
  querySelector: selector => elements[selector],
  querySelectorAll: selector => selector === '[data-scenario]' ? scenarioButtons : [],
};
let intervalCallback;
const sandbox = { document, Intl, console, setInterval: callback => { intervalCallback = callback; return 1; }, clearInterval: () => {}, window: {} };
sandbox.window = sandbox;
vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), sandbox);

assert.equal(elements['#scenario-name'].textContent, 'Moderado');
assert.match(elements['#metrics-grid'].innerHTML, /5\.0%/);

scenarioButtons[0].click();
assert.equal(elements['#scenario-name'].textContent, 'Negativo');
assert.match(elements['#metrics-grid'].innerHTML, /-.*63,000/);
assert.match(elements['#bars'].innerHTML, /Negativo/);

scenarioButtons[2].click();
assert.equal(elements['#scenario-name'].textContent, 'Positivo');
assert.match(elements['#metrics-grid'].innerHTML, /117,500/);

elements['#next'].click();
assert.equal(sandbox.ORHA.getState().activeSlide, 1);
elements['#previous'].click();
assert.equal(sandbox.ORHA.getState().activeSlide, 0);
elements['#play-pause'].click();
assert.equal(sandbox.ORHA.getState().playing, true);
intervalCallback();
assert.equal(sandbox.ORHA.getState().activeSlide, 1);
elements['#play-pause'].click();
assert.equal(sandbox.ORHA.getState().playing, false);

console.log('Escenarios, gráficas y controles verificados.');
