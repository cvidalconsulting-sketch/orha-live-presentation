const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class ClassList {
  constructor(){this.values=new Set()}
  add(v){this.values.add(v)} remove(v){this.values.delete(v)}
}
class Element {
  constructor(tag='div'){this.tag=tag;this.children=[];this.listeners={};this.classList=new ClassList();this.disabled=false;this.textContent='';this.attrs={};this.firstChild=null;}
  setAttribute(k,v){this.attrs[k]=v}
  addEventListener(t,cb){this.listeners[t]=cb}
  appendChild(n){this.children.push(n);if(!this.firstChild)this.firstChild=n;return n}
  insertBefore(n){this.children.unshift(n);this.firstChild=this.children[0];return n}
  load(){this.loaded=true}
}
class NativeAudio { constructor(src){this.src=src;} }
const portrait=new Element('div');
const sceneOne=new Element('section');
sceneOne.querySelector=(s)=>s==='.portrait'?portrait:null;
const introStatus=new Element('small');
const introPlay=new Element('button');
const head=new Element('head');
const body=new Element('body');
let coreScript;
body.appendChild=(n)=>{coreScript=n;return n};
const created=[];
const document={
  head,body,
  querySelector(sel){return {'[data-scene="0"]':sceneOne,'[data-intro-status]':introStatus,'[data-intro-play]':introPlay}[sel]||null},
  createElement(tag){const e=new Element(tag);created.push(e);return e}
};
const sandbox={document,console,Object,window:{Audio:NativeAudio}};
vm.runInNewContext(fs.readFileSync('app.js','utf8'),sandbox);

const video=created.find(x=>x.tag==='video');
assert.ok(video,'debe crear video para Kairos');
assert.equal(video.children[0].src,'media/scene-01-kairos.mp4');
assert.equal(video.children[0].type,'video/mp4');
assert.equal(video.children[1].src,'media/scene-01-kairos.mp3');
assert.equal(video.children[1].type,'audio/mpeg');
assert.ok(portrait.classList.values.has('has-real-video'));
assert.equal(introPlay.disabled,true);
assert.equal(introStatus.textContent,'KAIROS · CARGANDO');
assert.equal(coreScript.src,'app-core.js');

const intercepted=new sandbox.window.Audio('media/scene-01-kairos.mp3');
assert.equal(intercepted,video,'la escena 1 debe usar el elemento de video');
const other=new sandbox.window.Audio('media/scene-02-kairos.mp3');
assert.equal(other.src,'media/scene-02-kairos.mp3','las demás escenas mantienen Audio normal');
video.listeners.loadeddata();
assert.ok(portrait.classList.values.has('video-ready'));
video.listeners.playing();
assert.equal(introStatus.textContent,'KAIROS · EN VIDEO');
coreScript.onload();
assert.equal(introPlay.disabled,false);

console.log('Escena 1: loader MP4 + fallback MP3 + aislamiento de escenas verificados.');