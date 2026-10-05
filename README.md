# debjeet-workspace

> Personal learning workspace of **Debjeet Dhar** (Kolkata, India)
> On the journey to Full-Stack + AI Engineer, building towards **ULTRON**.

## What is this?

This is not a code dump. It is a **complete, organised learning system**:
every reading file, every project plan, every line of real code —
backed up daily so nothing is ever lost.

## Structure

| Folder | What lives inside |
|---|---|
| `READING/` | The library — 20 plain-text study files, read in order (`00` → `19`) |
| `PROJECTS/` | The workshop — every project split into `PLAN/` (research) and `CODE/` (real code) |
| `CATALOG.txt` | **Start here.** The full map of the whole workspace, folder by folder |
| `audio/` | Voice notes from my mentor |
| `_SOURCE/` | Older files, parked safely |
| `uploads/` | Original uploaded documents |

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

Pushed via SSH deploy key, scoped to this repository only.

---

*Built with discipline, one day at a time.*
