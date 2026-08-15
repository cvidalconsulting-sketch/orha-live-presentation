(() => {
  const sceneOne = document.querySelector('[data-scene="0"]');
  const portrait = sceneOne?.querySelector?.('.portrait');
  const introStatus = document.querySelector('[data-intro-status]');
  const introPlay = document.querySelector('[data-intro-play]');
  const NativeAudio = window.Audio;

  let kairosVideo = null;
  if (portrait && typeof document.createElement === 'function') {
    kairosVideo = document.createElement('video');
    kairosVideo.className = 'kairos-video';
    kairosVideo.setAttribute('data-kairos-video', '');
    kairosVideo.setAttribute('preload', 'auto');
    kairosVideo.setAttribute('playsinline', '');
    kairosVideo.setAttribute('aria-label', 'Kairos presenta el análisis financiero de ORHA');
    kairosVideo.controls = false;
    kairosVideo.muted = false;
    kairosVideo.playsInline = true;
    kairosVideo.disablePictureInPicture = true;

    const videoSource = document.createElement('source');
    videoSource.src = 'media/scene-01-kairos.mp4';
    videoSource.type = 'video/mp4';
    const audioFallback = document.createElement('source');
    audioFallback.src = 'media/scene-01-kairos.mp3';
    audioFallback.type = 'audio/mpeg';
    kairosVideo.appendChild(videoSource);
    kairosVideo.appendChild(audioFallback);

    portrait.insertBefore(kairosVideo, portrait.firstChild);
    portrait.classList.add('has-real-video');

    const style = document.createElement('style');
    style.id = 'scene-one-kairos-video';
    style.textContent = `.portrait.has-real-video{overflow:hidden;border-radius:28px 28px 0 0;background:#091512;box-shadow:0 20px 55px rgba(0,0,0,.36)}.portrait.has-real-video>.hair,.portrait.has-real-video>.neck,.portrait.has-real-video>.face,.portrait.has-real-video>.shoulders{transition:opacity .25s ease}.portrait.has-real-video.video-ready>.hair,.portrait.has-real-video.video-ready>.neck,.portrait.has-real-video.video-ready>.face,.portrait.has-real-video.video-ready>.shoulders{opacity:0;pointer-events:none}.kairos-video{position:absolute;z-index:6;inset:0;width:100%;height:100%;object-fit:cover;object-position:center center;background:#091512;display:block;opacity:0;filter:saturate(.92) contrast(1.02);transition:opacity .3s ease,filter .35s ease,transform .35s ease}.portrait.video-ready .kairos-video{opacity:1}.kairos-video.is-playing{filter:saturate(1) contrast(1.03);transform:scale(1.004)}@media(max-width:760px){.portrait.has-real-video{border-radius:22px 22px 0 0}}`;
    document.head?.appendChild?.(style);

    kairosVideo.addEventListener?.('loadeddata', () => portrait.classList.add('video-ready'));
    kairosVideo.addEventListener?.('playing', () => {
      kairosVideo.classList.add('is-playing');
      if (introStatus) introStatus.textContent = 'KAIROS · EN VIDEO';
    });
    kairosVideo.addEventListener?.('pause', () => kairosVideo.classList.remove('is-playing'));
    kairosVideo.addEventListener?.('ended', () => kairosVideo.classList.remove('is-playing'));
    kairosVideo.load?.();
  }

  if (typeof NativeAudio === 'function' && kairosVideo) {
    function ORHAAudio(src) {
      if (src === 'media/scene-01-kairos.mp3') {
        try { kairosVideo.currentTime = 0; } catch (_) {}
        return kairosVideo;
      }
      return new NativeAudio(src);
    }
    ORHAAudio.prototype = NativeAudio.prototype;
    try { Object.setPrototypeOf(ORHAAudio, NativeAudio); } catch (_) {}
    window.Audio = ORHAAudio;
  }

  if (introPlay) introPlay.disabled = true;
  if (introStatus) introStatus.textContent = 'KAIROS · CARGANDO';

  const core = document.createElement('script');
  core.src = 'app-core.js';
  core.async = false;
  core.onload = () => {
    if (introPlay) introPlay.disabled = false;
    if (introStatus && !window.ORHA?.getState?.().playing) introStatus.textContent = 'KAIROS · LISTA';
  };
  core.onerror = () => {
    if (introPlay) introPlay.disabled = false;
    if (introStatus) introStatus.textContent = 'KAIROS · ERROR DE CARGA';
  };
  document.body.appendChild(core);
})();