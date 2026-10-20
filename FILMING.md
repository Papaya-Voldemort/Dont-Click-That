# Don't Click That! filming guide

Prepared October 13, 2026 for the Congressional App Challenge identified in the project README.
Aim for a relaxed 2:20-2:40 screen recording with your voice. A face-camera introduction is optional.

Use the [read-aloud script](docs/filming/script.txt), the
[printable filming pack](output/pdf/dont-click-that-filming-pack.pdf), and the cue sheet below.
The [readiness report](docs/filming/READINESS.md) records what was actually verified.

## Start the recording build

In this project's terminal:

```sh
bun run film
```

This runs formatting, type checks, tests, and a fresh production build, then serves it at
<http://127.0.0.1:4173>. Leave the terminal running while filming. If the preview is already running
there, open the address directly. To rebuild, stop that terminal with Control-C, then rerun the
command. A port conflict stops the command instead of silently changing the recording address.

Use a 1920 x 1080 capture at 30 fps where available, browser zoom at 100%, and a landscape frame.
Capture the app area; keep the terminal, script, desktop, bookmarks, and other tabs outside the frame.
The app was also verified at 1366 x 768, so a smaller laptop can use that size and export at 1080p.
Resizing the window is enough; there is no need to change your display configuration.

Open the page with an internet connection and wait for the fonts to settle before recording.
The fully loaded Quick Demo works if the connection drops. Keep the preview terminal running;
an initial offline load or offline reload is not part of the verified recording setup.

## Your prep before pressing Record

- [ ] Replace `[YOUR NAME]` in the script with your participant name. If this is a team submission,
      introduce every participant and change "I" to "we" where appropriate.
- [ ] Read the script aloud once. Keep the motivation in your own words and describe the tools you
      actually used. The script avoids inventing a personal scam incident or development story.
- [ ] Put the script on a phone, second screen, or printed page outside the capture area.
- [ ] Plug in the laptop, enable Do Not Disturb, close private tabs, and hide the bookmarks bar.
- [ ] Choose a quiet room and the correct microphone. If showing your face, put the camera at eye
      level and place the light in front of you.
- [ ] Record a 10-second test. Play it back with headphones and confirm your voice is clear,
      the app text is readable, and the cursor and frame look right.
- [ ] Rehearse the exact click sequence below once. Refresh to return home for the real take.
- [ ] Start recording, hold the home screen for two seconds, then begin speaking. Pause for a beat
      after each click and keep the cursor away from the words you are explaining.

The simplest shoot is one continuous screen recording with live narration. If clicking while
speaking feels awkward, capture the walkthrough first and record the same script as a voice-over.

On your Mac, press **Shift-Command-5**, choose **Record Selected Portion**, and frame the browser's
app area. In **Options**, select your microphone, a five-second timer, and a save location. The
`output/recordings/` folder is ready for your takes and excluded from Git. Stop with
**Control-Command-Escape**. The built-in recorder saves `.mov` files. See
[Apple's recording instructions](https://support.apple.com/en-us/102618).

## Timed cue sheet

Times are pacing targets, not subtitle timestamps. The spoken script is 272 words before personalization; rehearse
with your own name and pauses. Keep the finished video comfortably below three minutes.

| Target time | Show and click                                                                                     | What your narration covers                                                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00-0:15   | Home screen. Hold before moving the cursor.                                                        | Participant name, app name, and one-sentence purpose.                                                                                              |
| 0:15-0:30   | Stay on Home.                                                                                      | Motivation and audience: everyday users, families, and older adults.                                                                               |
| 0:30-0:45   | **Start Training**. Show **Level 1 / 15**, then **Home**, then **Quick Demo**.                     | Full training has 15 examples; use the fixed three-example demo for this walkthrough. Do not answer the randomized training example.               |
| 0:45-1:05   | Read the fake URL. Select **Threat**.                                                              | A familiar name at the beginning does not establish trust.                                                                                         |
| 1:05-1:30   | Select **Why? (Deep Dive)**. Point at the highlighted domain, then move the cursor away.           | `paypal.com` is the subdomain; `login-verify.example` is the actual domain. HTTPS does not prove trust.                                            |
| 1:30-1:50   | **Next Level**. Show the email body. Select **Safe**.                                              | This example asks you to open your existing banking app and requests no sensitive information. A sender address alone does not prove authenticity. |
| 1:50-2:10   | **Next Level**. Hold the wrong-number conversation. Select **Suspicious**.                         | The unexpected stranger tries to continue a personal conversation.                                                                                 |
| 2:10-2:25   | **Finish Training**. Hold the **3/3** results.                                                     | Results separate correct answers, partial credit, and missed answers; replay supports more practice.                                               |
| 2:25-2:40   | Keep the results visible through your closing sentence. Hold for two seconds, then stop recording. | Languages, Svelte, Vite, Bun, and the final takeaway.                                                                                              |

## Exact demo route for every take

1. **Quick Demo**.
2. URL `https://paypal.com.login-verify.example` -> **Threat**.
3. **Why? (Deep Dive)** -> explain the actual domain.
4. **Next Level** -> statement email -> **Safe**.
5. **Next Level** -> wrong-number text -> **Suspicious**.
6. **Finish Training** -> **3/3**, **100%**, **3 correct**, **0 partial credit**, **0 missed**.
7. After recording stops, **Play Again** returns home for another take.

Quick Demo uses the same three examples and fixed email time, **9:41 AM**, every time.
Start Training generates new examples for each 15-level session. The sample addresses are displayed
as text; the demo stays inside the app. The small email toolbar icons are decorative; the recording
uses the classification buttons.

## Retakes and recovery

- Chose the wrong answer: refresh and restart **Quick Demo**, or finish and choose **Play Again**.
  Retake from home so the filmed score is exactly 3/3.
- On a challenge, **Home** discards the session. Refresh also returns home.
- **Back** in Deep Dive returns to feedback. **Next Level** advances directly from either screen.
- If the browser disconnects because the preview terminal stopped, rerun `bun run film`, reload,
  wait for fonts, and restart the take.
- If your first read is too long, shorten the motivation and tooling sentences. Keep all three
  examples, the domain explanation, participant names, purpose, and audience.
- For a 60-90 second cut, keep the same fixed demo route, trim pauses and the full-training insert,
  and retain the required introduction and tooling sentence.

Suspicious earns half a point where it is cautious but incomplete. In the wrong-number example,
Suspicious is the fully correct answer and earns one point. Explain the behavior shown; this app
teaches classification through simulated scenarios.

## Finish and submission prep

- [ ] Trim the start and end; let key examples remain visible long enough to read. Check any captions
      against the recording, especially `paypal.com` and `login-verify.example`.
- [ ] Save the finished video and original recording locally. Suggested filename:
      `dont-click-that-cac-2026.mp4`; use `.mov` if that is your recorder's output.
- [ ] Watch the whole exported video, with audio, before uploading.
- [ ] Confirm every participant is named and the video covers purpose, audience, tools/languages,
      and functioning app screens. The required duration is **1-3 minutes**.
- [ ] Upload to **YouTube or Vimeo with Public visibility**, then test the link while signed out.
- [ ] Complete registration, eligibility details, written answers, and the full AI-use disclosure.
      List your actual contributions and all development help; adapt the disclosure prompt below.
- [ ] Submit by **Monday, October 26, 2026, at 10:00 AM in Denver (MDT)**,
      equivalent to noon EDT. Aim to finish the day before.

Video requirements, visibility, AI disclosure, and the deadline were checked against the
[official 2026 CAC rules](https://www.congressionalappchallenge.us/wp-content/uploads/2026/05/2026-CAC-Rules.pdf).
The [Utah's 4th District office page](https://owens.house.gov/congressional-app-challenge) confirms
its participation. Confirm your eligibility in your registration account.

For the written portion, prepare truthful notes on your motivation, an actual coding difficulty,
what you learned, and one future improvement. Use your own experience; the filming script does not
invent these answers.

AI disclosure starting point, to complete accurately:

```text
I used Codex to help prepare the filming script and materials and check the app through automated
tests and browser walkthroughs. [Add every earlier use of AI in planning, coding, design, or
content, if applicable.] My own contributions were [describe what you personally designed,
implemented, and understood].
```

Optional upload title: **Don't Click That! | 2026 Congressional App Challenge**.

Optional description:

> Don't Click That! helps people practice spotting phishing links, scam emails, and suspicious texts
> through interactive challenges. This demo shows immediate feedback, Deep Dive explanations, and
> the results screen. Created by [PARTICIPANT NAME(S)]. Built with Svelte, TypeScript, JavaScript,
> HTML, and CSS, using Vite and Bun.

## Reference frames

The [stills folder](docs/filming/stills) contains actual screenshots from the verified production
build. Use them to compare your recording frame or for brief cutaways; record the button presses
and transitions in the main demo.

| Frame                       | Reference                                                        |
| --------------------------- | ---------------------------------------------------------------- |
| Home                        | [01-home.png](docs/filming/stills/01-home.png)                   |
| Fake URL                    | [02-link.png](docs/filming/stills/02-link.png)                   |
| Correct-answer feedback     | [03-feedback.png](docs/filming/stills/03-feedback.png)           |
| Domain breakdown            | [04-deep-dive.png](docs/filming/stills/04-deep-dive.png)         |
| Statement email             | [05-email.png](docs/filming/stills/05-email.png)                 |
| Wrong-number text           | [06-text.png](docs/filming/stills/06-text.png)                   |
| 3/3 results                 | [07-results.png](docs/filming/stills/07-results.png)             |
| Full session, Level 1 / 15  | [08-full-training.png](docs/filming/stills/08-full-training.png) |
| Optional phone-size cutaway | [09-mobile-text.png](docs/filming/stills/09-mobile-text.png)     |
