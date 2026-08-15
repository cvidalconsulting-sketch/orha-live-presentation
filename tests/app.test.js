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

const scenes = [new Element(), new Element(), new Element(), new Element(), new Element(), new Element(), new Element()];
scenes[1].steps = Array.from({ length: 9 }, (_, step) => new Element({ step: String(step) }));
scenes[2].steps = Array.from({ length: 11 }, (_, step) => new Element({ step: String(step) }));
scenes[3].steps = Array.from({ length: 25 }, (_, step) => new Element({ step: String(step) }));
scenes[4].steps = Array.from({ length: 12 }, (_, step) => new Element({ step: String(step) }));
scenes[5].steps = Array.from({ length: 16 }, (_, step) => new Element({ step: String(step) }));
scenes[6].steps = Array.from({ length: 40 }, (_, step) => new Element({ step: String(step) }));
const fragments = Array.from({ length: 5 }, () => new Element());
const replay = [new Element({ replay: '1' }), new Element({ replay: '2' }), new Element({ replay: '3' }), new Element({ replay: '4' }), new Element({ replay: '5' }), new Element({ replay: '6' })];
const statuses = [new Element(), new Element()];
const elements = Object.fromEntries(['previous', 'next', 'play-pause', 'progress', 'scene-number'].map(id => [`#${id}`, new Element()]));
elements['[data-go="1"]'] = new Element();
elements['[data-intro-play]'] = new Element();
elements['[data-intro-status]'] = new Element();

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
assert.match(fs.readFileSync('index.html', 'utf8'), /data-intro-play[^>]*>[\s\S]*REPRODUCIR PRESENTACIÓN/);

elements['[data-intro-play]'].click();
assert.equal(elements['[data-intro-status]'].textContent, 'KAIROS · HABLANDO');
assert.equal(timeoutCallback, undefined, 'No debe existir un fallback mientras SpeechSynthesis funciona');
assert.equal(spoken.at(-1).text, 'Hola, Thelma. Soy Kairos.');
spoken.at(-1).onstart();
assert.equal(sandbox.window.ORHA.getState().activeStep, 0);
assert.equal(sandbox.window.ORHA.getState().activeFragment, -1);
for (let i = 0; i < 5; i += 1) { spoken.at(-1).onend(); spoken.at(-1).onstart(); }
assert.equal(spoken.at(-1).text, 'Estos son los resultados.');
assert.equal(sandbox.window.ORHA.getState().activeFragment, 4);
spoken.at(-1).onend();
assert.ok(timeoutDelay < 250);
timeoutCallback();
assert.equal(sandbox.window.ORHA.getState().activeScene, 1);
sandbox.window.ORHA.cancelPlayback();

replay[0].click();
spoken.at(-1).onstart();
for (let i = 0; i < 8; i += 1) { spoken.at(-1).onend(); spoken.at(-1).onstart(); }
assert.equal(sandbox.window.ORHA.getState().activeStep, 8);
assert.match(spoken.at(-1).text, /margen exige disciplina/);
spoken.at(-1).onend(); timeoutCallback();
assert.equal(sandbox.window.ORHA.getState().activeScene, 2);
spoken.at(-1).onstart();
for (let i = 0; i < 10; i += 1) { spoken.at(-1).onend(); spoken.at(-1).onstart(); }
assert.match(spoken.at(-1).text, /primer día/);
spoken.at(-1).onend(); timeoutCallback();
assert.equal(sandbox.window.ORHA.getState().activeScene, 3);
spoken.at(-1).onstart();
for (let i = 0; i < 24; i += 1) { spoken.at(-1).onend(); spoken.at(-1).onstart(); }
assert.match(spoken.at(-1).text, /resultado de ORHA/);
spoken.at(-1).onend(); timeoutCallback();
assert.equal(sandbox.window.ORHA.getState().activeScene, 4);
spoken.at(-1).onstart();
for (let i = 0; i < 11; i += 1) { spoken.at(-1).onend(); spoken.at(-1).onstart(); }
assert.equal(spoken.at(-1).text, 'Evidencia antes de liberar más capital.');
spoken.at(-1).onend(); timeoutCallback();
assert.equal(sandbox.window.ORHA.getState().activeScene, 5);
spoken.at(-1).onstart();
for (let i = 0; i < 15; i += 1) { spoken.at(-1).onend(); spoken.at(-1).onstart(); }
assert.match(spoken.at(-1).text, /cuánto capital quieres arriesgar/);
spoken.at(-1).onend(); timeoutCallback();
assert.equal(sandbox.window.ORHA.getState().activeScene, 6);
assert.equal(elements['#scene-number'].textContent, '07');
assert.match(spoken.at(-1).text, /parte del modelo que merece verse de otra forma/);
spoken.at(-1).onstart();
for (let i = 0; i < 39; i += 1) { spoken.at(-1).onend(); spoken.at(-1).onstart(); }
assert.equal(sandbox.window.ORHA.getState().activeStep, 39);
assert.match(spoken.at(-1).text, /solamente entonces compramos crecimiento/);
spoken.at(-1).onend();
assert.equal(sandbox.window.ORHA.getState().activeScene, 6, 'La escena 7 termina sin navegar');
assert.equal(sandbox.window.ORHA.getState().playing, false);
replay[5].click();
assert.match(spoken.at(-1).text, /parte del modelo que merece verse de otra forma/, 'La escena 7 puede reproducirse nuevamente');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
assert.match(css, /\.scene\[hidden\]\s*\{\s*display:none !important/);
assert.match(js, /SpeechSynthesisUtterance/);
assert.equal((html.match(/data-scene="[0-6]"/g) || []).length, 7);
assert.doesNotMatch(html, /data-scene="7"|ESCENA 8/);
assert.equal((html.match(/id="scene-number"/g) || []).length, 1);
assert.match(html, /id="scene-number">01<\/b> \/ 07/);

for (const expected of ['≈ 5%', '≈ $0.90', '≈ $44.60', '≈ $94', '≈ 2.1 : 1', 'VIABLE,', 'PERO AJUSTADO.', 'DESDE EL DÍA 1.']) assert.ok(html.includes(expected), expected);
for (const expected of ['≈ MES 22', '≈ $58K – $63K', '&gt; 48 MESES', 'MES 15', '$50,955', 'MES 43', '≈ $41,593', '≈ $96,500', '2 PUNTOS PORCENTUALES']) assert.ok(html.includes(expected), expected);
for (const expected of ['TRES CAMINOS PARA EJECUTAR ORHA', 'MODELO ACTUAL', 'ORHA DIRECT', '$3,700 / MES', 'EVIDENCIA PRIMERO']) assert.ok(html.includes(expected), expected);

assert.equal(sandbox.window.ORHA.timelines[6].length, 40);
const sceneSevenSource = js;
for (const expected of ['ECONOMÍA REAL DEL CRECIMIENTO', '≈ 1,667', '≈ $1,067', '≈ 83', '≈ 1,584', '$1,500', '$2,200', '≈ $4,767', '≈ $57', '≈ $10.20', '5.6', '≈ $5.06', '11.3', '8%', '5,000', '≈ $3,200', '15%', 'ORHA DIRECT', 'ORGÁNICO PRIMERO', 'PAUTA PROGRESIVA', 'DOBLE VERIFICACIÓN KAIROS', 'DATOS DE FUENTE', 'RECONSTRUCCIÓN MATEMÁTICA']) assert.ok(sceneSevenSource.includes(expected), expected);
assert.match(sceneSevenSource, /<strong>≈ \$57<\/strong><small>COSTO ECONÓMICO INICIAL<br \/>POR NUEVO CLIENTE PAGO/);
assert.doesNotMatch(sceneSevenSource, /\$1,066\.67|\$57\.43|\$4,766\.67|1 DÍA = \$0\.21|AHORRO DE 66%|AHORRO EXACTO DEL TRIAL|\$20/);
const installedScene = sceneSevenSource.match(/function installSceneSevenV2\(\)[\s\S]*?installSceneSevenV2\(\);/)?.[0] || '';
assert.ok(installedScene, 'La nueva escena 7 debe instalarse explícitamente');
assert.doesNotMatch(installedScene, /PUERTA 1|PUERTA 2|PUERTA 3|PUERTAS DE CAPITAL/);
assert.match(sceneSevenSource, /ESCENARIO ILUSTRATIVO[\s\S]*NO PROYECCIÓN DEL MODELO[\s\S]*5,000[\s\S]*\$3,200/);
assert.doesNotMatch(sandbox.window.ORHA.timelines[6].join(' '), /por gestionar una pauta|para administrar la publicidad/);
assert.match(sceneSevenSource, /EL MODELO PRESUPUESTA MÁS PARA AGENCIA Y GESTIÓN QUE PARA LA PROPIA PAUTA\./);
assert.match(sceneSevenSource, /@media\(max-width:620px\)[\s\S]*\.financial-levers\{grid-template-columns:1fr/);

console.log('Navegación 1 → 2 → 3 → 4 → 5 → 6 → 7, voz y progresión audiovisual verificadas.');
