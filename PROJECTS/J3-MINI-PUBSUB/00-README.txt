==============================================================================
J3 — MINI PUB/SUB EVENT BUS
==============================================================================

STATUS: 🟡 READY — code-free ticket prepared; Debjeet writes first.
TYPE:   Small standalone JavaScript learning project / J-series gate.
WHY:    J2 proved filter/map/sort. J3 now proves closures, subscriptions,
        event delivery, and cleanup before the next project gate.

PLAN:
  PLAN/03-SPEC-MINI-PUBSUB.txt       Hinglish ticket
  PLAN/03-SPEC-MINI-PUBSUB-EN.txt    English twin

CODE:
  CODE/src/        Debjeet's implementation goes here after the first attempt.
  CODE/tests/      Separate acceptance fixtures and expected results.

PUBLIC REPO:
  No separate public J3 repository yet. The J2 public portfolio repo remains
  separate; this J3 project stays in the continuity workspace until proof.

TARGET API:
  const bus = createPubSub();
  const unsubscribe = bus.subscribe("saved", listener);
  bus.publish("saved", "file-1");
  unsubscribe();

RULE:
  No UI, network, npm package, class, or async code. One small event bus,
  one proof, then J4. Phase 6 Objects remains paused until J1→J6 completes.

NEXT ACTION:
  Read the code-free ticket. Debjeet writes createPubSub first. Do not copy
  a finished solution before his attempt.
==============================================================================
