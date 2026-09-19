# sound2midi — formats reference & resampler utility

Plain, citable reference assets for **[sound2midi.xyz](https://sound2midi.xyz)**, a free
browser-based **audio-to-MIDI converter**.

> This is a *reference repo*, not the app source. It exists so the facts about the tool
> (supported formats, how it works, a reusable resampler snippet) are easy to link to and
> verify.

## What's inside

| File | What it is |
|------|------------|
| `supported-formats.csv` | Machine-readable list of every audio/video format the converter accepts, with a `status` column (`verified` = run live this session, `declared` = in the page's allow-list). |
| `audio-to-midi-formats.md` | Human-readable reference: what the tool does, supported formats, DAW compatibility, privacy model. |
| `resample.js` | Tiny dependency-free helper that resamples a decoded `AudioBuffer` to mono @ 22 050 Hz. Extracted from the site's own pipeline. |

## The tool in one line

Drop in an audio file (or a video — its audio track is used) and get a standard `.mid` you can
edit in any DAW. Runs 100% in the browser with the open-source Spotify Basic Pitch model, so
nothing is uploaded.

🔗 **Try it / cite it:** https://sound2midi.xyz

## License

Reference content MIT. The converter itself lives at https://sound2midi.xyz.
