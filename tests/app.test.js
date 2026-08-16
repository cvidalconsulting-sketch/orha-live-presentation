const assert = require('node:assert/strict');
const fs = require('node:fs');

const contractSource = fs.readFileSync('tests/app.contract.js', 'utf8')
  .replaceAll("fs.readFileSync('app.js', 'utf8')", "fs.readFileSync('app-core.js', 'utf8')");

new Function('require', 'console', contractSource)(require, console);

const loader = fs.readFileSync('app.js', 'utf8');
assert.match(loader, /media\/scene-01-kairos\.mp4/);
assert.match(loader, /media\/scene-01-kairos\.mp3/);
assert.match(loader, /core\.src = 'app-core\.js'/);
require('./scene1-video-loader.test.js');