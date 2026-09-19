# Audio / Video Formats Supported by sound2midi.xyz

A plain-reference companion to [sound2midi.xyz](https://sound2midi.xyz) — a free, browser-based
**audio-to-MIDI converter**. This repo is a *reference asset* (citable lists + a small reusable
utility), **not** the application source code.

## What the tool does

- Converts audio (and the audio track of video) into standard `.mid` files, editable in any DAW.
- Runs **entirely in the browser** — the file is never uploaded to a server. (Privacy claim:
  verified by reading the page source; transcription happens client-side via the Spotify Basic
  Pitch model loaded from the page.)
- Uses **Spotify Basic Pitch**, an open-source (MIT) polyphonic transcription model.
- Output is **polyphonic** (chords, not just melody) and includes pitch-bend for expressive
  instruments like guitar.
- Free to use; no account required to convert.

## Supported input formats

See [`supported-formats.csv`](./supported-formats.csv) for the machine-readable list.

- **Audio:** MP3, WAV, M4A, AAC, FLAC, AIFF (.aiff/.aif), OGG (.ogg/.oga), Opus, WebM
- **Video (audio track is extracted and transcribed):** MP4, M4V, MOV

> `status` column in the CSV: `verified` = run live in a browser this session and produced MIDI
> notes; `declared` = accepted by the page's file-input allow-list / browser `decodeAudioData`
> (general browser capability, not individually re-tested here).

## DAW compatibility (general knowledge, not measured)

Standard `.mid` files produced by this tool open in essentially all mainstream DAWs: Ableton Live,
Logic Pro, FL Studio, Cubase, Studio One, Reaper, GarageBand, Pro Tools, and any software that
reads General MIDI.

## Reusable utility

[`resample.js`](./resample.js) — a tiny, dependency-free browser/Node helper that resamples a
decoded `AudioBuffer` to the 22 050 Hz mono rate the transcription model expects. Extracted and
simplified from the site's own pipeline; MIT-style, free to reuse.
