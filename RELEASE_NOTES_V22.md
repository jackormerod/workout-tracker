# Form v22 — 19 October 2026

Day 1 Barbell Back Squat is replaced by Hack Squat for newly created workouts. Hack Squat keeps four sets of six repetitions and a 180-second default rest. Its new permanent ID is hack-squat; barbell squat remains 0-0. No other exercise, order, prescription or rest is changed. Day 1 remains 24 working sets and approximately 66 minutes.

No migration or data rewrite. Storage key form-workouts-v1 and schema version 1 are unchanged. All supported historical programmes and mixed backups remain valid. Existing unfinished workouts retain their original Barbell Back Squat sets and values until finished. New sessions use Hack Squat. Historical barbell squat data is available in History, Progress and the last-session panel for its original sessions; Hack Squat has independent weights, progression, PBs, previous-session lookup and rest setting. Other exercises retain their IDs and history.

Offline cache incremented to form-offline-v22. Workout timing model, app rendering, icons, layout, cloud-sync implementation and all other source assets are byte-for-byte unchanged. PollFitt is untouched.

Verification: 10 Node tests cover the exact replacement, unchanged programme/timing, old/new drafts and backups, historical identity preservation, separate weights/PBs, rest/undo and existing sync. Actual app module tests verify four bilateral rows prefilled with six reps, 180-second timer, History/Progress/panels, mixed import/reopen and responsive controls at 320/375/390/430px. Offline tests cover v21→v22 upgrade, module/asset loading, unchanged-asset hashes and PollFitt cache/storage isolation. No browser automation used.
