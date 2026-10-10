==============================================================================
J2 — FLIPKART MULTI-FILTER PIPELINE
==============================================================================

STATUS: ✅ PROOF PASSED — source and tests organized; 8/8 checks passed.
TYPE:   Small standalone JavaScript learning project / J-series gate.
WHY:    J1 was the P2 subscription-leak module. J2 is a different product
        problem, so it has its own folder. It is not UPI code.

PLAN:
  PLAN/03-SPEC-FLIPKART-MULTI-FILTER.txt       Hinglish ticket
  PLAN/03-SPEC-FLIPKART-MULTI-FILTER-EN.txt    English twin

CODE:
  CODE/src/        Production implementation.
  CODE/tests/      Separate fixtures, expected results, and proof runner.

BACKUP:
  This folder is the canonical copy inside the learning workspace backup.
  The backup repository may be made private; it is for continuity, not the
  public portfolio presentation.

PUBLIC PORTFOLIO REPOSITORY:
  https://github.com/DebjeetDev/flipkart-multi-filter
  Public copy layout: root src/, tests/, and docs/plan/.
  Cleanup of the public README/path mismatch is deferred until Debjeet asks.
  Corrected push package: PORTFOLIO-PUSH-READY/ (tested, not pushed).

PIPELINE:
  valid rows -> eligible products -> display rows -> price order
  filter -> map -> sort

PROOF:
  Run from CODE/ with: node tests/flipkart-filter.test.js
  The source and tests are separate; the suite passed 8/8.

NEXT:
  J3 mini pub/sub is the next project-gate task.
==============================================================================
