# Form v21 — 18 October 2026

Day 1 now uses Tricep Rope Pushdowns: four sets of 12, 60-second rest, bilateral set tracking. Permanent ID: tricep-rope-pushdowns. All other exercise prescriptions and IDs are unchanged.

Day 1 has 24 working sets. The existing model retains its preparation allowance and calculates the new execution/rest cost: old kickbacks 276 seconds execution + 120 seconds rest; new pushdowns 224 seconds execution + 180 seconds rest. Net +8 seconds, so the displayed estimate remains approximately 66 minutes. Custom rests still recalculate the estimate; pushdowns do not inherit a kickback-specific rest setting.

No schema migration or data rewrite. The form-workouts-v1 storage key is unchanged. All supported historical programme versions remain valid, including unfinished kickback sessions with separate arms, settings, timers and old backups. Existing unfinished workouts keep their original exercises until finished; new Day 1 workouts use pushdowns. Mixed-generation backups import without resetting data.

Kickbacks retain ID 0-4, their own weights, PBs and previous-session data. They remain readable in History and Progress. New pushdowns have independent records and progression. Current Form sync remains unchanged and retains the original history records.

Offline cache incremented to form-offline-v21. HTML, layout, icons, all other app files and PollFitt are unchanged.

Validation: 12 Node tests covering prescription, calculated timing, all legacy versions, mixed backups, data retention, separate progression/PBs and sync; actual app module tests covering four bilateral rows, timer/undo, old draft continuation, History/Progress/panels, import/reopen, custom rests, mobile controls at 320–430px and PollFitt storage isolation; service-worker offline upgrade tests and unchanged-asset hashes. No browser automation used.
