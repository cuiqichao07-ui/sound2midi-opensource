// resample.js — small reusable helper for sound2midi.xyz reference repo
// Resamples a decoded AudioBuffer to mono @ 22050 Hz (what Spotify Basic Pitch expects).
// No dependencies. Works in the browser (Web Audio OfflineAudioContext) and Node (with a
// Web Audio polyfill). MIT-style — free to reuse.
//
// Usage (browser):
//   const buf = await audioCtx.decodeAudioData(arrayBuffer);
//   const mono = await resampleToMono(buf, 22050);   // -> Float32Array

const TARGET_SAMPLE_RATE = 22050;

/**
 * @param {AudioBuffer} audioBuffer  decoded buffer from decodeAudioData
 * @param {number}      targetRate    target sample rate (default 22050)
 * @returns {Promise<Float32Array>}   mono samples at targetRate
 */
async function resampleToMono(audioBuffer, targetRate = TARGET_SAMPLE_RATE) {
  // 1) mix down to mono by averaging channels
  const channels = audioBuffer.numberOfChannels;
  const len = audioBuffer.length;
  const mono = new Float32Array(len);
  for (let ch = 0; ch < channels; ch++) {
    const data = audioBuffer.getChannelData(ch);
    for (let i = 0; i < len; i++) mono[i] += data[i] / channels;
  }

  // 2) resample mono -> targetRate via an OfflineAudioContext
  const targetLen = Math.ceil(audioBuffer.duration * targetRate);
  const oac = new OfflineAudioContext(1, targetLen, targetRate);
  const src = oac.createBuffer(1, len, audioBuffer.sampleRate);
  src.copyToChannel(mono, 0);

  const node = oac.createBufferSource();
  node.buffer = src;
  node.connect(oac.destination);
  node.start(0);

  const rendered = await oac.startRendering();
  return rendered.getChannelData(0);
}

// node-friendly export (ignored in the browser)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { resampleToMono, TARGET_SAMPLE_RATE };
}
