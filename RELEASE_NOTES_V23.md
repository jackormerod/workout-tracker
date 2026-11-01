# Form v23 — 1 November 2026

## Day 1

1. Flat Barbell Bench Press — 4 × 6, 180-second rest
2. Bulgarian Split Squat — 3 × 6 per leg, 180-second rest
3. EZ-Bar Curl — 4 × 8, 75-second rest
4. Leg Extension — 3 × 10, 90-second rest
5. Tricep Rope Pushdowns — 4 × 12, 60-second rest
6. 45° Calf Press — 5 × 15, 60-second rest

Bulgarian Split Squat has a new permanent ID: bulgarian-split-squat. Each of its three programme sets has independent Left/Right weights, reps, completion, accessibility labels and previous-session values. Both legs must finish for the set to count and for rest to begin. Day 1 has 23 programme sets, not 26.

The unchanged timing model retains the existing preparation allowance. Hack Squat execution/rest: 4 × (20 + 6 × 3) = 152 execution seconds and 3 × 180 = 540 rest seconds. Split squat: 3 × (20 + 6 × 3 × 2) = 168 execution seconds and 2 × 180 = 360 rest seconds. Net reduction: 164 seconds. Day 1 now totals 3,804 seconds (63 minutes 24 seconds), displayed as Approx. 63 min. A custom split-squat rest of 240 seconds adds 120 seconds and displays Approx. 65 min. Days 2–4 are unchanged.

## Compatibility

No schema migration or startup rewrite. Storage key form-workouts-v1 and schema version 1 are retained. Hack Squat keeps ID hack-squat; its histories, unfinished drafts, weights, reps, PBs, custom rests and previous-session values remain independent and valid. Unfinished Hack Squat workouts retain their saved exercises until finished. Newly created Day 1 sessions use split squats. Old and mixed-generation backups import correctly, including all earlier accepted programme versions. Historical exercises remain in History, Progress and rest settings. The existing last-session panel, timer labels and accessibility labels render each stored exercise correctly.

Bulgarian Split Squat does not inherit any Hack Squat weight, PB, progression, rest override or previous performance. Its PB requires both legs to reach the target reps at new qualifying weights. Other exercises, IDs, history and settings are unchanged. PollFitt is untouched.

## Release and verification

Cache: form-offline-v23. Changed production files: model.js, sw.js, RELEASE_NOTES_V23.md. App rendering, timing model, history-panel code, icons, CSS, HTML, portrait logic and cloud-sync code are byte-for-byte unchanged from v22.

15 Node tests passed for exact programme/counts, both-leg completion/rest/undo, 63-minute/custom-rest estimates, previous-session independence, PB/progression separation, all legacy data versions, Hack Squat drafts, mixed backups, validation and existing sync. Actual app-module tests passed for six side rows, accessible Left/Right labels, independent editing and prefilling, 23-set counter/progress bar, second-leg timers, undo, History/Progress/panels, import/reopen, legacy draft completion and PollFitt storage isolation. Mobile CSS/DOM checks passed at 320/375/390/430px. Offline upgrade and unchanged-file hash checks passed, retaining PollFitt's cache. No browser automation used.
