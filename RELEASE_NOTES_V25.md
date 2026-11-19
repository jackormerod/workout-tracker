# Form v25 — 19 November 2026

## Revised programme

Day 1 retains its order and other prescriptions, replacing position 6 with Weighted Decline Sit-Ups, 4 × 12, 60-second rest. New ID: weighted-decline-sit-ups.

Day 2: Seated Tricep Dips increases from 3 × 8 to 4 × 8, keeping ID seated-tricep-dips and 90-second default rest. Position 5 becomes Plate Loaded Preacher Curl, 5 × 10, 75-second rest, with new ID plate-loaded-preacher-curl. Historical Preacher Machine Curl retains ID 1-4 and its original stored name/display alias.

Day 3: position 4 becomes Hammer Curl, 4 × 8, 75-second rest, with new ID hammer-curl. It is bilateral (one KG/reps/completion row per set). Standing Calf Raise keeps ID 2-5 and five sets, with the new target 10 reps and unchanged 60-second rest.

Day 4 and all other exercises, order, prescribed rests and identities are unchanged. Hammer Curl and Weighted Decline Sit-Ups use the existing normal bilateral tracking, timers, previous-session panel, History, Progress, PB, progression, JSON backups and accessibility labels.

## Default rests retained in Settings

| Exercise | Sets × reps | Rest |
|---|---:|---:|
| Weighted Decline Sit-Ups | 4 × 12 | 60 sec |
| Seated Tricep Dips | 4 × 8 | 90 sec |
| Plate Loaded Preacher Curl | 5 × 10 | 75 sec |
| Hammer Curl | 4 × 8 | 75 sec |
| Standing Calf Raise | 5 × 10 | 60 sec |

Existing custom rests remain saved and take precedence for their exercise identity. New movement identities do not inherit retired movement overrides.

## Totals and estimates

| Day | Programme sets | Default exact model time | Display |
|---|---:|---:|---:|
| 1 | 22 | 60m 43s | Approx. 61 min |
| 2 | 27 | 69m 55s | Approx. 70 min |
| 3 | 24 | 65m 26s | Approx. 65 min |
| 4 | 26 | 61m 39s | Approx. 62 min |

The existing model retains 20 seconds setup plus 3 seconds per rep (both sides for unilateral work), equipment transitions, rest only between working sets and its existing preparation allowances. Day 1 saves 161 seconds versus the old calf press. Day 2 adds 259 seconds for the extra preacher and dip sets. Day 3 adds 41 seconds for the hammer replacement and saves 75 seconds on calf reps, net -34 seconds. Day 4 is unchanged. Custom rests recalculate using each prescription's actual set count. Older drafts keep their original calculation.

Direct weekly set accounting: chest 15; biceps/brachialis 16; triceps 12; shoulders 13; back 12; traps 4 direct (approximately 8 including rows); quads 10; hamstrings 8; calves 5; glutes approximately 11; abs 4.

## Compatibility

No schema migration, startup rewrite or storage reset. The form-workouts-v1 storage key and schema version 1 remain unchanged. The full pre-v25 programme is retained, alongside every previously supported generation. Old histories, unfinished drafts, settings, timers, custom rests, backups, results, PBs and progression remain valid. Existing drafts keep their saved names, sets, rep targets and side tracking. New sessions use the revised programme.

Retired 45° Calf Press, Preacher Machine Curl and unilateral Concentration Curl remain in the catalogue for historical display, Progress, rest settings and import validation. Their histories/PBs/previous weights are not combined with the three new identities. Dips carries the previous three weights into its first three new sets; the new fourth starts empty until entered. Standing Calf Raise retains its weights but old sessions keep 15-rep targets. Recommendations and PB evaluation continue to use saved prescriptions. Progress now also checks each historical record against its own rep target, avoiding reclassification of old short-rep calf results when the current target falls to ten.

Existing cloud-sync code, layout, controls, icons, portrait behaviour and other functionality are unchanged. PollFitt is untouched.

## Release metadata and verification

Cache: form-offline-v25. Manifest description and its HTML/cache reference now identify v25; icon/brand references retain their existing asset versions because their bytes are unchanged. Local deployment metadata records the release, parent commit, deployed commit and asset verification.

Changed production files: model.js, workout-features.js, app.js (historic Progress target check only), sw.js, manifest.webmanifest, index.html (manifest reference only), RELEASE_NOTES_V25.md.

21 Node tests passed: all new prescriptions/counts/rests, all current custom-rest deltas, 61/70/65/62 estimates, direct weekly volumes, every historical programme/draft/backup, independent new identities, dips carry-forward, calf target/PB preservation, bilateral hammer completion, recommendations, existing sync and malformed input rejection.

Actual app-module checks passed for all changed cards, completion totals/progress bars, timers/undo, accessible labels, PB qualification, previous values, History/Progress/panels, old names and Left/Right drafts, dips' empty fourth set, calf history/qualification, custom rests, zero kg, JSON import/export and reopen. Mobile CSS/DOM checks passed at 320/375/390/430px. Offline upgrade, metadata and unchanged-asset hash checks passed; PollFitt cache/storage are retained. No browser automation or personal records were used.
