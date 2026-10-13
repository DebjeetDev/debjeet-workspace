# PROJECT CATALOG
## Active path projects and proof requirements

## A. Completed proof projects

### J1 — findLeaks / FIN-302
**Status:** Acceptance proof passed 8/8 in the student's editor.
**Role:** Array/Set/`some`/guard muscle and fraud-detector thinking.
**Evidence:** Recorded in the workspace handoff and logs. Source was not copied into the workspace.

### J2 — Flipkart Multi-Filter
**Status:** Acceptance proof passed 8/8.
**Location:** `PROJECTS/J2-FLIPKART-MULTI-FILTER/`
**Role:** `filter`, `map`, `sort`, validation, immutability, boundary handling.
**Evidence:** Standalone source/tests and public portfolio copy exist.

### J3 — Save-Signal Engine / Mini Pub/Sub
**Status:** Functional acceptance proof passed 8/8; independent student-authorship gate pending.
**Location:** `PROJECTS/J3-MINI-PUBSUB/CODE/`
**Source:** `src/mini-pubsub.js`
**Tests:** `tests/mini-pubsub.test.js`
**Role:** closures, private state, callbacks, listener order, event isolation, unsubscribe, duplicate prevention, independent instances.
**Provenance:** The current source was generated after Debjeet explicitly requested code. It is a valid reference and functional proof, but it must not be claimed as Debjeet's independent source.
**Constraint:** First version is deliberately pre-Objects: no object literals, object methods, Map, Set, class, async code, UI, or object payloads.

### J3-A — Independent Rebuild and Explain-Back
**Status:** Immediate next authorship gate; not a new product.
**Rule:** Debjeet writes a fresh implementation from the contract without copying the generated source. The old implementation may be inspected only after the attempt and review.
**Proof:** The eight acceptance checks pass, Debjeet explains closure state, duplicate prevention, unsubscribe safety, and event isolation, and he can make a change without assistance.

## B. Next JavaScript projects

### J4 — Debounce + Throttle + Rate Limit Engine
**Status:** Next project after the J3-A authorship gate.
**Skills:** higher-order functions, closures, timers, cancellation, timing, cleanup, rate limiting.
**Proof:** normal calls, bursts, cancellation, leading/trailing behaviour, repeated cleanup, timer edge cases.

### J5 — Async Retry + Timeout + Concurrency Engine
**Skills:** Promises, async/await, timeout, AbortController, retry policy, backoff, bounded concurrency, failure classification.
**Proof:** success, timeout, retry exhaustion, abort, parallel limit, rejected work, cleanup.

### J6 — Config + Permission Engine
**Skills:** objects, immutable updates, validation, nested data, permission decisions, error results.
**Proof:** valid config, invalid config, role permissions, missing fields, immutability, denied access.

### J7 — Node File and Stream Processing CLI
**Skills:** modules, filesystem, streams, buffers, CLI input, errors, resource cleanup.
**Proof:** valid file, missing file, large input, malformed input, output integrity.

### J8 — Custom Error and Validation Package
**Skills:** classes, custom error hierarchy, package boundary, TypeScript, validation, documentation.
**Proof:** error types, safe messages, invalid input, typecheck, unit tests, package usage.

## C. React and Next.js projects

### Project 1 — DevBoard
**Status:** Future.
**Stack:** React, Next.js, TypeScript, Tailwind basics, selective shadcn, API fetching.
**Features:** GitHub stats, LeetCode tracker, goals, streaks, loading/error/empty states.
**Deployment:** Vercel or equivalent.
**Proof:** React tests, accessibility checks, one Playwright user flow, production build.

### Project 2 — Backend Admin Console
**Status:** Future.
**Features:** authentication, protected routes, role-aware UI, tables, filters, pagination, forms, API error recovery.
**Purpose:** Connect frontend discipline to backend data.

## D. Backend projects

### Project 3 — AuthCore API
**Status:** Future.
**Core stack:** Node.js, TypeScript, Express, Zod, PostgreSQL, Prisma.
**Core release:** register, login, logout, password hashing, protected routes, refresh flow, RBAC, tests, OpenAPI, deployment.
**Production release:** OAuth, password reset, Redis session/refresh management, audit trail, advanced rate limits.

### Project 4 — StreamAPI
**Status:** Future.
**Core stack:** Node.js, TypeScript, Express, PostgreSQL, Prisma.
**Production layers:** Redis, object storage, queues, SSE or WebSocket, search, pagination, security, OpenAPI, monitoring.
**Purpose:** Main backend showcase and media/content product.

## E. AI project

### Project 5 — SmartAPI
**Status:** Future.
**Base:** StreamAPI.
**Features:** structured summaries, metadata extraction, semantic search, tool-based lookup, streaming chat, citations, evaluation set, prompt-security checks, cost logging.
**Stack:** backend AI provider, embeddings, PostgreSQL/pgvector, queue where justified.
**Proof:** deterministic validation around model output, failure fallback, prompt injection tests, latency/cost notes, live deployment.

## F. Advanced post-job project

### AgentOps / Secure AI Workflow Platform
**Status:** Post job-ready expansion, not a first-job gate.
**Possible features:** agent graph, human approval, MCP tools, local model fallback, sandboxed code execution, long-term memory, audit log, rate limits.
**Rule:** Never start this before AuthCore, StreamAPI, SmartAPI, and testing/deployment fundamentals are proven.

## Project completion rule

A project is complete only when it has:

1. Contract and paper design.
2. Implementation from a blank file by Debjeet unless explicitly overridden.
3. Normal, empty, invalid, boundary, and failure tests.
4. README with setup, usage, architecture, and trade-offs.
5. Security and performance review appropriate to the project.
6. Git commit with meaningful message.
7. Deployment when it is a product/API phase.
8. Explain-back without reading the solution.
