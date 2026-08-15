const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor(dataset = {}) {
    this.hidden = false; this.disabled = false; this.textContent = ''; this.innerHTML = '';
    this.style = {}; this.dataset = dataset; this.listeners = {}; this.classes = new Set(); this.steps = [];
    this.classList = { toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name) };
  }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  click() { this.listeners.click(); }
  querySelectorAll(selector) { return selector === '[data-step]' ? this.steps : []; }
}

const scenes = [new Element(), new Element(), new Element()];
scenes[1].steps = Array.from({ length: 9 }, (_, step) => new Element({ step: String(step) }));
scenes[2].steps = Array.from({ length: 11 }, (_, step) => new Element({ step: String(step) }));
const fragments = Array.from({ length: 5 }, () => new Element());
const replay = [new Element({ replay: '1' }), new Element({ replay: '2' })];
const statuses = [new Element(), new Element()];
const elements = Object.fromEntries(['previous', 'next', 'play-pause', 'progress', 'scene-number'].map(id => [`#${id}`, new Element()]));
elements['[data-go="1"]'] = new Element();

const document = {
  querySelectorAll: selector => ({ '[data-scene]': scenes, '.fragment': fragments, '[data-replay]': replay, '[data-kairos-status]': statuses }[selector] || []),
  querySelector: selector => elements[selector]
};
let timeoutCallback;
let timeoutDelay;
const spoken = [];
class Utterance { constructor(text) { this.text = text; } }
const sandbox = {
  document, console,
  window: {
    SpeechSynthesisUtterance: Utterance,
    speechSynthesis: { speak: utterance => spoken.push(utterance), cancel: () => {} },
    setTimeout: (callback, delay) => { timeoutCallback = callback; timeoutDelay = delay; return 1; }, clearTimeout: () => {}
  }
};

vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), sandbox);
assert.deepEqual(JSON.parse(JSON.stringify(sandbox.window.ORHA.getState())), { activeScene: 0, activeFragment: 0, activeStep: -1, playing: false });
assert.equal(scenes[0].hidden, false);
assert.equal(scenes[1].hidden, true);

elements['#next'].click();
assert.equal(sandbox.window.ORHA.getState().activeScene, 1);
assert.equal(sandbox.window.ORHA.getState().activeStep, 0);
assert.equal(sandbox.window.ORHA.getState().playing, true);
assert.match(spoken.at(-1).text, /cuánto capital puede quedar expuesto/);
for (let i = 0; i < 8; i += 1) spoken.at(-1).onend();
assert.equal(sandbox.window.ORHA.getState().activeStep, 8);
assert.match(spoken.at(-1).text, /margen exige disciplina/);
spoken.at(-1).onend();
assert.ok(timeoutDelay < 250, 'La transición de la escena 2 a la 3 debe ser imperceptible');
timeoutCallback();
assert.equal(sandbox.window.ORHA.getState().activeScene, 2, 'La escena 2 continúa automáticamente a la 3');
assert.equal(sandbox.window.ORHA.getState().activeStep, 0);
assert.match(spoken.at(-1).text, /lo que sabemos/);
for (let i = 0; i < 10; i += 1) spoken.at(-1).onend();
assert.equal(sandbox.window.ORHA.getState().activeStep, 10);
assert.match(spoken.at(-1).text, /primer día/);

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
assert.match(fs.readFileSync('styles.css', 'utf8'), /\.scene\[hidden\]\s*\{\s*display:none !important/);
for (const expected of ['≈ 5%', '≈ $0.90', '≈ $44.60', '≈ $94', '≈ 2.1 : 1', 'VIABLE,', 'PERO AJUSTADO.', 'DESDE EL DÍA 1.']) assert.ok(html.includes(expected), expected);
assert.match(js, /SpeechSynthesisUtterance/);
assert.match(js, /Ahora quiero separar dos cosas/);
assert.doesNotMatch(html, /data-scene="3"|ESCENA 4/);
console.log('Navegación 1 → 2 → 3, voz y progresión audiovisual verificadas.');
