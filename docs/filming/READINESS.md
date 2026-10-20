# Recording readiness

Verified October 13, 2026 against the current local working tree and a fresh production build,
served at <http://127.0.0.1:4173>. This report covers the filming setup and observed behavior.

## Checks completed

| Check                    | Result                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Prettier                 | Passed                                                                                                                |
| Svelte / TypeScript      | 0 errors, 0 warnings                                                                                                  |
| Existing automated tests | 8 passed, 0 failed; 196 assertions                                                                                    |
| Production build         | Passed                                                                                                                |
| Quick Demo               | Threat -> Safe -> Suspicious produces 3/3 and 100%                                                                    |
| Quick Demo results       | 3 correct, 0 partial credit, 0 missed; replay returns home                                                            |
| Full training            | All 15 challenges completed through the browser                                                                       |
| Mixed-answer scoring     | Observed 5.5/15 with 3 correct, 5 partial, 7 missed; displayed percentage and totals matched                          |
| Deep Dive                | URL, email, and text explanations render; Back preserves feedback; Next Level advances                                |
| Home / reload            | Both restore the home screen and clear the active session                                                             |
| Keyboard                 | Quick Demo starts with Enter on its focused button                                                                    |
| Help / About             | Open and close routes work; resource links have the expected URLs and open in new tabs                                |
| Generated examples       | 300 sessions / 4,500 challenges checked for valid content, feedback, and exactly one full-credit answer per challenge |
| Browser diagnostics      | No observed page errors or console warnings/errors during the walkthroughs                                            |
| Fonts / assets           | Google Fonts, local assets, and favicon loaded successfully                                                           |
| Connection drop          | After the app and fonts loaded, the complete demo still finished at 3/3 with networking disabled                      |

## Layout checks

The demo's home, URL, Deep Dive, email, text, and result screens were checked at each size below.
No horizontal page or checked content-container overflow was found. The buttons required by the
demo remained reachable; smaller screens can scroll vertically.

| Viewport    | Result                                                     |
| ----------- | ---------------------------------------------------------- |
| 1920 x 1080 | Passed; every recording-route control fits in the viewport |
| 1366 x 768  | Passed                                                     |
| 768 x 1024  | Passed                                                     |
| 390 x 844   | Passed                                                     |
| 844 x 390   | Passed                                                     |
| 320 x 568   | Passed                                                     |

## Prepared materials

- [Read-aloud script](script.txt), with one participant-name placeholder.
- [Main filming guide and timed cue sheet](../../FILMING.md).
- [Printable filming pack](../../output/pdf/dont-click-that-filming-pack.pdf).
- [Nine production-build reference screenshots](stills).
- `bun run film` validates, rebuilds, and starts the local recording preview on a fixed port.

## Your final checks

Run a microphone and screen-capture test on your own recording setup, personalize the participant
name and motivation, rehearse once, and watch the final export before uploading. Complete the
registration, written answers, and accurate AI-use disclosure described in the filming guide.

The verification used Chromium and the local production preview. It does not establish identical
behavior in every browser, the condition of a separately hosted copy, or the quality of a camera,
microphone, recording, export, or submission that has not happened yet. Initial offline loading
was not tested. No app behavior or visual design was changed for this filming preparation.
