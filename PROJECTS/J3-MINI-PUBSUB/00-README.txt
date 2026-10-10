==============================================================================
J3 — MINI PUB/SUB EVENT BUS
==============================================================================

STATUS: 🟡 READY — pre-Objects closure ticket; Debjeet writes first.
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

CODE:
  CODE/src/        Debjeet's implementation goes here after the first attempt.
  CODE/tests/      Separate acceptance fixtures and expected results.

PRE-OBJECTS TARGET API:
  const bus = createPubSub();
  const unsubscribe = bus("subscribe", "saved", listener);
  bus("publish", "saved", "file-1");
  unsubscribe();

RULE:
  No object literals, object methods, Map, Set, class, UI, network, npm
  package, or async code in this first version. One small closure-based event
  bus, one proof, then J4. Phase 6 Objects remains paused until J1→J6.

NEXT ACTION:
  Read the corrected code-free ticket. Debjeet writes createPubSub first.
  Do not copy a finished solution before his attempt.
==============================================================================
