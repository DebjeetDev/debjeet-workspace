==============================================================================
J3 — MINI PUB/SUB EVENT BUS
==============================================================================

STATUS: ✅ PROOF PASSED — 8/8 checks; Save-Signal Engine implemented.
TYPE:   Small standalone JavaScript learning project / J-series gate.
WHY:    J2 proved filter/map/sort. J3 now proves closures, callbacks,
        subscriptions, event delivery, and cleanup before the next gate.

IMPORTANT LEARNING DECISION:
  The first idea used `bus.subscribe()` and `bus.publish()`. That would leak
  returned-object method syntax before Phase 6 Objects. J3 has been corrected
  to a single closure-returned function so it uses only the tools already
  learned: functions, callbacks, closures, arrays, and simple conditions.

PLAN:
  PLAN/03-SPEC-MINI-PUBSUB.txt       Hinglish ticket
  PLAN/03-SPEC-MINI-PUBSUB-EN.txt    English twin
  PLAN/04-REAL-WORLD-PUBSUB-EXAMPLES.txt
                                      12 company/product thinking examples

CODE:
  CODE/src/        Production implementation: mini-pubsub.js
  CODE/tests/      Separate acceptance fixtures and 8-check proof runner.

PRE-OBJECTS TARGET API:
  const bus = createPubSub();
  const unsubscribe = bus("subscribe", "saved", listener);
  bus("publish", "saved", "file-1");
  unsubscribe();

RULE:
  No object literals, object methods, Map, Set, class, UI, network, npm
  package, or async code in this first version. One small closure-based event
  bus, one proof, then J4. Phase 6 Objects remains paused until J1→J6.

PROOF:
  Run from CODE/ with: node tests/mini-pubsub.test.js
  Result: 8/8 acceptance checks passed.

NEXT ACTION:
  J4 debounce engine is the next project-gate task.
==============================================================================
