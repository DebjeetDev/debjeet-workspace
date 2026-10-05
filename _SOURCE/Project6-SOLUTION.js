/* ============================================================
   PROJECT #6 — createSubscriptionEngine  (FIXED / MERGED VERSION)
   Ticket: FIN-204   |   Engineer: Debjeet Dhar
   Reviewed by: Dubby Bhaiya
   ------------------------------------------------------------
   BUGS FIXED IN REVIEW (4 total):
   BUG 1 -> getLatestPlan was returning { first, last } object.
            Spec wanted ONLY the last price (a number).
   BUG 2 -> addNewPlan never reset `attempts = 0` after a correct PIN.
            So Part 7 test was locking the engine wrongly.
   BUG 3 -> getPremiumPlans error return had `ok: true` (should be false).
   BUG 4 -> applyTaxToAll rejected tax 0 (`taxAmount <= 0`).
            Spec says 0 is VALID, only negatives are invalid.
   ============================================================ */

function createSubscriptionEngine(
  secretPin = "7788",
  initialPlans = [199, 499, 999],
) {
  const MAX_ATTEMPT = 3;
  let prices = initialPlans;
  let attempts = 0;

  return {
    // ---------- METHOD 1: getLatestPlan ----------
    getLatestPlan: () => {
      if (!Array.isArray(prices) || prices.length === 0) {
        return { status: 400, ok: false, error: "No plans available!" };
      }

      // ✅ BUG 1 FIX: return ONLY the last price (a number), not an object!
      return { status: 200, ok: true, data: prices.at(-1) };
    },

    // ---------- METHOD 2: addNewPlan ----------
    addNewPlan: (pin, planPrice) => {
      if (attempts >= MAX_ATTEMPT) {
        return {
          status: 403,
          ok: false,
          error: "Engine Locked! Too many wrong PINs!",
        };
      }

      if (pin !== secretPin) {
        attempts = attempts + 1;
        return { status: 401, ok: false, error: "Wrong PIN!" };
      }

      if (!Number.isFinite(planPrice) || planPrice <= 0) {
        return { status: 400, ok: false, error: "Invalid price!" };
      }

      if (!Array.isArray(prices)) {
        return { status: 400, ok: false, error: "Plans list is corrupted!" };
      }

      // ✅ BUG 2 FIX: reset the brute-force counter after a correct PIN!
      attempts = 0;

      // Non-mutating add (spread) — original array reference untouched!
      prices = [...prices, planPrice];

      return { status: 201, ok: true, data: prices };
    },

    // ---------- METHOD 3: getPremiumPlans ----------
    getPremiumPlans: (minPrice) => {
      if (!Array.isArray(prices)) {
        return { status: 400, ok: false, error: "Plans list is corrupted!" };
      }

      if (!Number.isFinite(minPrice) || minPrice <= 0) {
        // ✅ BUG 3 FIX: `ok` must be false on an error path!
        return { status: 400, ok: false, error: "Invalid minPrice!" };
      }

      // Defensive: skip any garbage element inside the array
      const premiumPlans = prices.filter(
        (p) => Number.isFinite(p) && p >= minPrice,
      );

      return { status: 200, ok: true, data: premiumPlans };
    },

    // ---------- METHOD 4: applyTaxToAll ----------
    applyTaxToAll: (taxAmount) => {
      if (!Array.isArray(prices)) {
        return { status: 400, ok: false, error: "Plans list is corrupted!" };
      }

      // ✅ BUG 4 FIX: tax 0 is VALID! Only negatives are invalid.
      if (!Number.isFinite(taxAmount) || taxAmount < 0) {
        return { status: 400, ok: false, error: "Invalid tax amount!" };
      }

      // .map() already returns a BRAND-NEW array -> prices stays untouched!
      const taxedPlans = prices.map((p) => p + taxAmount);

      return { status: 200, ok: true, data: taxedPlans };
    },
  };
}

/* ============================================================
   PART 1 — OFFICIAL QA TESTS (The 6 Company Tests)
   ============================================================ */
console.log("===== PART 1: OFFICIAL QA TESTS =====");

const engine = createSubscriptionEngine("7788", [199, 499, 999]);

console.log("Test 1 (last plan):        ", engine.getLatestPlan());
console.log("Test 2 (wrong PIN):        ", engine.addNewPlan("0000", 1499));
console.log("Test 3 (correct PIN + add):", engine.addNewPlan("7788", 1499));
console.log("Test 4 (premium >= 500):   ", engine.getPremiumPlans(500));
console.log("Test 5 (add 50 tax):       ", engine.applyTaxToAll(50));
console.log("Test 6 (still 1499?):      ", engine.getLatestPlan());

/* ============================================================
   PART 2 — BRUTE-FORCE LOCK TEST (Security!)
   ============================================================ */
console.log("\n===== PART 2: BRUTE-FORCE LOCK TEST =====");

const tv2 = createSubscriptionEngine("1111", [100, 200, 300]);

console.log("Lock A (wrong 1):   ", tv2.addNewPlan("9999", 500));
console.log("Lock B (wrong 2):   ", tv2.addNewPlan("9999", 500));
console.log("Lock C (wrong 3):   ", tv2.addNewPlan("9999", 500));
console.log("Lock D (CORRECT PIN but locked!):", tv2.addNewPlan("1111", 500));
console.log("Lock E (read still works):", tv2.getLatestPlan());

/* ============================================================
   PART 3 — INVALID PRICE / GARBAGE INPUT TEST (addNewPlan)
   ============================================================ */
console.log("\n===== PART 3: INVALID PRICE TEST =====");

const tv3 = createSubscriptionEngine("4321", [500, 1000]);

console.log("Price 0:        ", tv3.addNewPlan("4321", 0));
console.log("Price -100:     ", tv3.addNewPlan("4321", -100));
console.log("Price 'abc':    ", tv3.addNewPlan("4321", "abc"));
console.log("Price NaN:      ", tv3.addNewPlan("4321", NaN));
console.log("Nothing added? (should be 1000):", tv3.getLatestPlan());

/* ============================================================
   PART 4 — getPremiumPlans EDGE CASES
   ============================================================ */
console.log("\n===== PART 4: getPremiumPlans EDGE CASES =====");

console.log("minPrice 0:       ", tv3.getPremiumPlans(0));
console.log("minPrice -50:     ", tv3.getPremiumPlans(-50));
console.log("minPrice 'abc':   ", tv3.getPremiumPlans("abc"));
console.log("minPrice 600:     ", tv3.getPremiumPlans(600));
console.log("minPrice 99999:   ", tv3.getPremiumPlans(99999));

/* ============================================================
   PART 5 — applyTaxToAll EDGE CASES + IMMUTABILITY
   ============================================================ */
console.log("\n===== PART 5: applyTaxToAll EDGE CASES =====");

console.log("tax -10:   ", tv3.applyTaxToAll(-10));
console.log("tax 'abc': ", tv3.applyTaxToAll("abc"));
console.log("tax 0:     ", tv3.applyTaxToAll(0));
console.log("tax 100:   ", tv3.applyTaxToAll(100));
console.log("NOT mutated? (should be 1000):", tv3.getLatestPlan());

/* ============================================================
   PART 6 — BROKEN / EMPTY INPUT TEST (Default Engine)
   ============================================================ */
console.log("\n===== PART 6: BROKEN INPUT TEST =====");

const tvEmpty = createSubscriptionEngine("0000", []);
console.log("Empty array engine:  ", tvEmpty.getLatestPlan());

const tvBroken = createSubscriptionEngine("1234", "hello");
console.log("Non-array 'hello':   ", tvBroken.getLatestPlan());

console.log("undefined PIN:       ", tv3.addNewPlan(undefined, 100));

/* ============================================================
   PART 7 — RESET CHECK (Attempt counter resets?)
   ============================================================ */
console.log("\n===== PART 7: ATTEMPT RESET TEST =====");

const tv4 = createSubscriptionEngine("5555", [10]);

console.log("wrong 1:        ", tv4.addNewPlan("0000", 20));
console.log("wrong 2:        ", tv4.addNewPlan("0000", 20));
console.log("CORRECT (reset):", tv4.addNewPlan("5555", 20));
console.log("wrong again:    ", tv4.addNewPlan("0000", 30));
console.log("CORRECT again:  ", tv4.addNewPlan("5555", 30));

console.log("\n✅ ALL TESTS DONE — compare with EXPECTED-OUTPUT-Project6.txt");
