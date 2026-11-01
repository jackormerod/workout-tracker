# Form v24 — 1 November 2026

## Shoulder replacements

Day 2 position 4: Seated Dumbbell Shoulder Press — 3 × 10, 90-second rest. This is the seated, back-supported dumbbell press. New permanent ID: seated-dumbbell-shoulder-press. Replaces Standing Barbell Overhead Press (ID 1-3) only in newly created workouts.

Day 4 position 5: Machine Lateral Raise — 4 × 10, 60-second rest. New permanent ID: machine-lateral-raise. Replaces EZ-Bar Upright Row (ID 3-5) only in newly created workouts.

Both use normal bilateral KG/reps/set completion, timers, last-session panels, History, Progress, PBs, progression, JSON backups and accessible labels. Other exercise order, prescriptions and identities are unchanged. Day 1 retains Bulgarian Split Squat. Set totals remain 23/25/23/26.

## Timing

The existing setup/rep, transition and between-set-rest model is retained, along with the existing preparation allowance. For new shoulder sessions the reference preparation uses the pre-replacement programme; existing drafts keep their original estimates.

Day 2: old press 114 execution seconds + 240 rest seconds; new press 150 execution seconds + 180 rest seconds. Net -24 seconds: 65m 36s, rounded to 66 minutes.

Day 4: old upright row 176 execution seconds + 225 rest seconds; new lateral raise 200 execution seconds + 180 rest seconds. Net -21 seconds: 61m 39s, rounded to 62 minutes.

Default rounded estimates are 63/66/66/62 minutes. New custom press rests adjust two intervals; new custom lateral-raise rests adjust three intervals. Old custom rest settings stay with their original exercise identities.

## Data safety

No migration or startup data rewrite. Storage key form-workouts-v1 and schema version 1 are unchanged. Old standing-press and upright-row histories, PBs, previous values, progression, custom rests and unfinished drafts remain valid and keep their names. New exercises do not inherit their data. Their separate previous-session records, loads, PBs and progression begin independently. All earlier accepted programme versions and mixed old/new backups remain supported. Historical exercises remain available in History, Progress, last-session panels and rest settings. Existing cloud-sync logic is unchanged. PollFitt is untouched.

## Changed files and checks

model.js: two new identities/prescriptions, retained previous programme version, catalogue and backup validation.
workout-features.js: preserve existing preparation allowances when accounting for the two replacement costs.
sw.js: cache form-offline-v24.
RELEASE_NOTES_V24.md: release description and verification record.

App rendering, history-panel code, HTML, CSS, icons, portrait behaviour and cloud-sync code remain byte-for-byte unchanged.

16 Node tests passed for exact scope/order/prescriptions, timing/rest calculations, legacy drafts/history/estimates, all programme generations, independent loads/PBs/progression, mixed backups, validation and existing sync. Actual app-module checks passed for both replacements, timers/undo, accessible labels, original and new history/Progress/panels, independent prefills and PBs, custom rest settings, old drafts, mixed import/reopen and PollFitt isolation. Mobile layout checks passed at 320/375/390/430px. Offline upgrade checks passed from v23 to v24 and hashes verify all unrelated production assets are unchanged. No browser automation used.
