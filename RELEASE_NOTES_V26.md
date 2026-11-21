# Form v26 — 21 November 2026

## Day 3

1. Decline Barbell Bench Press — 4 × 8, 120-second rest
2. Dumbbell Overhead Triceps Extension — 4 × 10, 75-second rest
3. Hammer Curl — 4 × 8, 75-second rest
4. Plate-Loaded Shoulder Press — 3 × 10, 90-second rest
5. Standing Calf Raise — 5 × 10, 60-second rest
6. Cable Bicep Curls — 3 × 12, 75-second rest

Cable Bicep Curls has a new permanent identity: cable-bicep-curls. It uses standard bilateral KG/reps/completion rows, timers, History, Progress, previous-session panel, weight PBs, progression, JSON backups and accessibility labels. Moved exercises retain their existing identities; their prior values and custom rests follow the movement rather than its old array position. Days 1, 2 and 4 are unchanged.

Day 3 contains 23 programme sets. Across Days 1–4 totals are 22/27/23/26 and default rounded estimates are 61/70/59/62 minutes.

## Timing

The existing timing model and preparation allowance are unchanged. The removed RDL cost was 4 × (20 + 8 × 3) = 176 execution seconds plus 3 × 180 = 540 rest seconds. Cable curls cost 3 × (20 + 12 × 3) = 168 execution seconds plus 2 × 75 = 150 rest seconds. Net reduction: 398 seconds. Day 3 decreases from 65m 26s to 58m 48s, displayed as Approx. 59 min. Transitions remain unchanged. Custom cable-curl rests adjust two between-set intervals; 105-second rests display Approx. 60 min. All moved exercises' own rest overrides still apply. RDL rest overrides do not transfer to cable curls.

## Data compatibility

No storage migration, startup rewrite or schema reset. Storage key form-workouts-v1 and schema version 1 are unchanged. The full pre-v26 programme is retained as a historical definition, along with all previously accepted generations.

Romanian Barbell Deadlift retains identity 1-0 and its original stored name/display alias, set/rep/rest prescriptions, results, weight PBs, progression, previous-session values, custom rests, History/Progress and backups. Retired RDL remains in the catalogue for settings and import validation. Unfinished Day 3 drafts retain their original exercise order and deadlift rows until finished. Newly created sessions use the new order and cable curls. No RDL data is inherited by the new movement. Old and mixed-generation JSON backups remain readable/importable.

The workout page, labels, timers, History, Progress, panels and recommendations use the programme/catalogue and stored exercise identities; no UI rewrite is required. Existing app rendering, timing-model code, PB logic, recommendations, layout, icons, portrait behaviour and cloud-sync code are byte-for-byte unchanged. PollFitt is untouched.

## Release and verification

Cache: form-offline-v26. Manifest description and its HTML/cache reference identify v26. Unchanged icon/brand asset references keep their existing versions. Local deployment metadata records the tested asset hashes, parent commit, deployed commit, build and live verification.

Changed production files: model.js, sw.js, manifest.webmanifest, index.html (manifest reference only), RELEASE_NOTES_V26.md.

14 Node tests passed for the exact new order/prescription, unchanged exercises and identities, 23-set total, 59-minute estimate and precise cost delta, every current Day 3 rest override, no RDL setting leakage, all old records/drafts/PBs/recommendations/estimates, legacy programme versions and backups, moved-value lookup, curl PB/progression isolation, bilateral completion/rest/undo, mixed JSON backups, existing sync and malformed prescription rejection.

Actual app-module checks passed for the exact screen order, three bilateral curl rows, rep fields and accessible labels, count/progress bar, 75-second timer and undo, custom rests, PB target qualification, retired RDL history/Progress/panels/drafts, moved-value/custom-rest association, independent curl previous sessions, JSON import/export, reopen and PollFitt storage isolation. Mobile CSS/DOM checks passed at 320/375/390/430px for current and legacy Day 3 and unchanged other days. Offline v25→v26 upgrade, manifest/version references and all unrelated asset hashes passed. No browser automation or personal workout records were used.
