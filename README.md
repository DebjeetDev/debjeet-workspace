# debjeet-workspace

> Personal learning workspace of **Debjeet Dhar** (Kolkata, India)
> On the journey to Full-Stack + AI Engineer, building towards **ULTRON**.

## What is this?

This is not a code dump. It is a **complete, organised learning system**:
every reading file, every project plan, every line of real code —
backed up daily so nothing is ever lost.

## Current checkpoint — 8 October 2026

- Phase 5 Arrays + Phase 5B Toolkit: **complete and locked**.
- Phase 6 Objects: **paused by NIYAM #20**, not abandoned.
- Current teaching step: **two-day Array Reset Card refresh**; then strict order is
  **J1 FIN-302 `findLeaks` → J2 → J3 → J4 → J5 → J6**. Project ideas are
  research-only during the refresh.
- `findLeaks` is not implemented yet; the code-free ticket is in
  `PROJECTS/P2-UPI-LEAK-DETECTOR/PLAN/`.
- SSH authentication, `git ls-remote`, and push are verified; local and
  GitHub remote match after the latest state/spec sync.

## Structure

| Folder | What lives inside |
|---|---|
| `READING/` | The library — the current plain-text syllabus, research, and project guides |
| `PROJECTS/` | The workshop — every project split into `PLAN/` (research) and `CODE/` (real code) |
| `CATALOG.txt` | **Start here.** The full map of the whole workspace, folder by folder |
| `TEACHER/` | Activation rules, current state, and master tracker |
| `uploads/` | Original uploaded documents; frozen and not edited |

## How projects are organised

Every project follows one fixed format:

```
P<number>-<NAME>/
├── PLAN/           <- thinking, specs, research (plain text, no code)
│   ├── 00-README.txt
│   ├── 01-SPEC.txt
│   ├── 02-RESOURCES.txt
│   ├── 03-TESTS.txt
│   └── 04-DEPLOY.txt
└── CODE/           <- the actual, shippable code
    ├── src/
    ├── tests/
    └── package.json
```

**Rule: PLAN and CODE never mix.**

## Projects

| # | Project | What it does |
|---|---|---|
| P1 | **STREAM-OS** | Smart TV Live Channel Engine (iptv-org API + HLS.js) |
| P2 | **UPI-LEAK-DETECTOR** | Finds hidden subscriptions & duplicate charges in bank data |

Both are organs of **ULTRON** — the final capstone system.

## The learning order (locked 4 Oct 2026)

```
01 → 1A → 1B → 1C → 1D → 02 → 03 → 04
  → 06 (DSA + System Design)
  → 07 (Docker / DevOps / CI-CD / AWS)
  → 05 (AI Systems + Multi-Agents)
  → 08 → 09 → 10 → ★ ULTRON
```

## Engineering rules I follow

- Paper → Pseudocode → Code → Push
- Guard clauses first, descriptive names
- `Object.freeze()` on constants, JSDoc on functions
- Return `{ ok, data, error }` — never throw randomly
- No skipping. No generic todo apps.

## Backup

Remote is configured as `git@github.com:DebjeetDev/debjeet-workspace.git`.
A local SSH deploy key is ready, but GitHub registration and `git ls-remote`
verification are still pending; do not claim a push until both authenticate.

---

*Built with discipline, one day at a time.*
