/* ============================================================
   TEST SUITE — Project #6: createSubscriptionEngine
   Company Ticket: FIN-204
   Engineer: Debjeet Dhar  |  Reviewer: Dubby Bhaiya
   ------------------------------------------------------------
   HOW TO USE:
   1. Paste YOUR OWN `createSubscriptionEngine` function BELOW.
   2. Run:  node TEST-SUITE-Project6.js
   3. Compare your output with the EXPECTED comment above each test.
   ------------------------------------------------------------
   NOTE: Your `error: "..."` message text can be ANYTHING you wrote.
         Only `status`, `ok`, and `data` MUST match exactly!
   ============================================================ */

// 👇👇👇 PASTE YOUR createSubscriptionEngine FUNCTION HERE 👇👇👇

// function createSubscriptionEngine(secretPin, initialPlans) {
//   ... your code ...
// }

// 👆👆👆 PASTE YOUR FUNCTION ABOVE 👆👆👆


/* ============================================================
   PART 1 — OFFICIAL QA TESTS (The 6 Company Tests)
   ============================================================ */
console.log("===== PART 1: OFFICIAL QA TESTS =====");

const engine = createSubscriptionEngine("7788", [199, 499, 999]);

// EXPECTED: { status: 200, ok: true, data: 999 }
console.log("Test 1 (last plan):        ", engine.getLatestPlan());

// EXPECTED: { status: 401, ok: false, error: '...' }
console.log("Test 2 (wrong PIN):        ", engine.addNewPlan("0000", 1499));

// EXPECTED: { status: 201, ok: true, data: [ 199, 499, 999, 1499 ] }
console.log("Test 3 (correct PIN + add):", engine.addNewPlan("7788", 1499));

// EXPECTED: { status: 200, ok: true, data: [ 999, 1499 ] }
console.log("Test 4 (premium >= 500):   ", engine.getPremiumPlans(500));

// EXPECTED: { status: 200, ok: true, data: [ 249, 549, 1049, 1549 ] }
console.log("Test 5 (add 50 tax):       ", engine.applyTaxToAll(50));

// EXPECTED: { status: 200, ok: true, data: 1499 }   <-- IMMUTABILITY PROOF!
console.log("Test 6 (still 1499?):      ", engine.getLatestPlan());


/* ============================================================
   PART 2 — BRUTE-FORCE LOCK TEST (Security!)
   ============================================================ */
console.log("\n===== PART 2: BRUTE-FORCE LOCK TEST =====");

const tv2 = createSubscriptionEngine("1111", [100, 200, 300]);

// EXPECTED: 401, 401, 401  (attempts 1, 2, 3)
console.log("Lock A (wrong 1):   ", tv2.addNewPlan("9999", 500));
console.log("Lock B (wrong 2):   ", tv2.addNewPlan("9999", 500));
console.log("Lock C (wrong 3):   ", tv2.addNewPlan("9999", 500));

// EXPECTED: { status: 403, ok: false, error: '...Locked...' }
// SAHI PIN dene ke baad bhi LOCKED hona chahiye!
console.log("Lock D (CORRECT PIN but locked!):", tv2.addNewPlan("1111", 500));

// EXPECTED: { status: 200, ok: true, data: 300 }
// Lock sirf addNewPlan ke liye hai — getLatestPlan abhi bhi chalna chahiye!
console.log("Lock E (read still works):", tv2.getLatestPlan());


/* ============================================================
   PART 3 — INVALID PRICE / GARBAGE INPUT TEST (addNewPlan)
   ============================================================ */
console.log("\n===== PART 3: INVALID PRICE TEST =====");

const tv3 = createSubscriptionEngine("4321", [500, 1000]);

// EXPECTED: All 4 = { status: 400, ok: false, error: '...' }
console.log("Price 0:        ", tv3.addNewPlan("4321", 0));
console.log("Price -100:     ", tv3.addNewPlan("4321", -100));
console.log("Price 'abc':    ", tv3.addNewPlan("4321", "abc"));
console.log("Price NaN:      ", tv3.addNewPlan("4321", NaN));

// EXPECTED: { status: 200, ok: true, data: 1000 }
// PROOF ki upar ka kachra list mein ADD nahi hua!
console.log("Nothing added? (should be 1000):", tv3.getLatestPlan());


/* ============================================================
   PART 4 — getPremiumPlans EDGE CASES
   ============================================================ */
console.log("\n===== PART 4: getPremiumPlans EDGE CASES =====");

// EXPECTED: All 3 = { status: 400, ok: false, error: '...' }
console.log("minPrice 0:       ", tv3.getPremiumPlans(0));
console.log("minPrice -50:     ", tv3.getPremiumPlans(-50));
console.log("minPrice 'abc':   ", tv3.getPremiumPlans("abc"));

// EXPECTED: { status: 200, ok: true, data: [ 1000 ] }
console.log("minPrice 600:     ", tv3.getPremiumPlans(600));

// EXPECTED: { status: 200, ok: true, data: [] }
// KHALI ARRAY aana chahiye — ERROR nahi! (Ye bohot log galat karte hain!)
console.log("minPrice 99999:   ", tv3.getPremiumPlans(99999));


/* ============================================================
   PART 5 — applyTaxToAll EDGE CASES + IMMUTABILITY
   ============================================================ */
console.log("\n===== PART 5: applyTaxToAll EDGE CASES =====");

// EXPECTED: Both = { status: 400, ok: false, error: '...' }
console.log("tax -10:   ", tv3.applyTaxToAll(-10));
console.log("tax 'abc': ", tv3.applyTaxToAll("abc"));

// EXPECTED: { status: 200, ok: true, data: [ 500, 1000 ] }
// tax 0 VALID hai! Error nahi dena chahiye!
console.log("tax 0:     ", tv3.applyTaxToAll(0));

// EXPECTED: { status: 200, ok: true, data: [ 600, 1100 ] }
console.log("tax 100:   ", tv3.applyTaxToAll(100));

// EXPECTED: { status: 200, ok: true, data: 1000 }
// IMMUTABILITY PROOF — stored list abhi bhi [500, 1000] hai, [600, 1100] NAHI!
console.log("NOT mutated? (should be 1000):", tv3.getLatestPlan());


/* ============================================================
   PART 6 — BROKEN / EMPTY INPUT TEST (Default Engine)
   ============================================================ */
console.log("\n===== PART 6: BROKEN INPUT TEST =====");

// EXPECTED: { status: 400, ok: false, error: '...' }
const tvEmpty = createSubscriptionEngine("0000", []);
console.log("Empty array engine:  ", tvEmpty.getLatestPlan());

// EXPECTED: { status: 400, ok: false, error: '...' }
const tvBroken = createSubscriptionEngine("1234", "hello");
console.log("Non-array 'hello':   ", tvBroken.getLatestPlan());

// EXPECTED: { status: 401, ok: false, error: '...' }
// undefined PIN kabhi bhi sahi PIN se match nahi hona chahiye!
console.log("undefined PIN:       ", tv3.addNewPlan(undefined, 100));


/* ============================================================
   PART 7 — RESET CHECK (Attempt counter resets?)
   ============================================================ */
console.log("\n===== PART 7: ATTEMPT RESET TEST =====");

const tv4 = createSubscriptionEngine("5555", [10]);

console.log("wrong 1:        ", tv4.addNewPlan("0000", 20)); // 401 (attempts = 1)
console.log("wrong 2:        ", tv4.addNewPlan("0000", 20)); // 401 (attempts = 2)
console.log("CORRECT (reset):", tv4.addNewPlan("5555", 20)); // 201 (attempts = 0)
console.log("wrong again:    ", tv4.addNewPlan("0000", 30)); // 401 (attempts = 1, NOT locked!)
console.log("CORRECT again:  ", tv4.addNewPlan("5555", 30)); // 201 (NOT 403!)

/* ============================================================
   ✅ IF EVERY LINE MATCHES YOUR EXPECTED OUTPUT — MERGE THE PR!
   ============================================================ */
