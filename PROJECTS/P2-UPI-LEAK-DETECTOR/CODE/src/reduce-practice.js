/* ============================================================
   Debjeet ka reduce practice — STAGE 1 se 4 tak
   (Updated 6 Oct 2026)
   ============================================================ */

const upi = [
  ["05 Oct", "Zomato", 240],
  ["05 Oct", "Netflix", 499],
  ["06 Oct", "Swiggy", 180],
  ["06 Oct", "Chai Shop", 30],
  ["07 Oct", "Amazon", 2499],
  ["07 Oct", "Chai Shop", 25],
];

/* ---------- STAGE 2 ---------- */
function sumAll(numberArray) {
  if (!Array.isArray(numberArray)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const total = numberArray.reduce((acc, cur) => {
    if (!Number.isFinite(cur)) return acc;
    return acc + cur;
  }, 0);
  return { ok: true, status: 200, data: total };
}

/* ---------- STAGE 3A ---------- */
function getTotalSpend(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const total = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return acc + cur[2];
  }, 0);
  return { ok: true, status: 200, data: total };
}

/* ---------- STAGE 3B ---------- */
function getCount(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const count = rows.reduce((acc) => acc + 1, 0);
  return { ok: true, status: 200, data: count };
}

/* ---------- STAGE 3C — FIXED (cur -> cur[2]) ---------- */
function getBiggestSpend(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const biggest = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return cur[2] > acc ? cur[2] : acc;
  }, 0);
  return { ok: true, status: 200, data: biggest };
}

/* ---------- STAGE 4A — Debjeet ka (DONE ✅) ---------- */
function getSmallSpendTotal(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const total = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return cur[2] < 100 ? acc + cur[2] : acc;
  }, 0);
  return { ok: true, status: 200, data: total };
}

/* ---------- STAGE 4B — Debjeet ka (DONE ✅) ---------- */
function getSmallSpendCount(rows) {
  if (!Array.isArray(rows)) {
    return { ok: false, status: 400, error: "Input must be a valid array!" };
  }
  const count = rows.reduce((acc, cur) => {
    if (!Array.isArray(cur)) return acc;
    if (!Number.isFinite(cur[2])) return acc;
    return cur[2] < 100 ? acc + 1 : acc;
  }, 0);
  return { ok: true, status: 200, data: count };
}

/* ---------- SAB TEST ---------- */
console.log("=== STAGE 2 ===")
console.log("sumAll([1,2,3])        ->", sumAll([1,2,3]),        "  [6]")
console.log("sumAll([])             ->", sumAll([]),             "  [0]")
console.log("sumAll([10,'abc',5])   ->", sumAll([10,'abc',5]),   "  [15]")
console.log("sumAll('hello')        ->", sumAll('hello'),        "  [error]")

console.log("\n=== STAGE 3 ===")
console.log("getTotalSpend(upi)     ->", getTotalSpend(upi),     "  [3473]")
console.log("getCount(upi)          ->", getCount(upi),          "  [6]")
console.log("getBiggestSpend(upi)   ->", getBiggestSpend(upi),   "  [2499]  ⭐ FIXED")

console.log("\n=== STAGE 4 ===")
console.log("getSmallSpendTotal(upi)->", getSmallSpendTotal(upi),"  [55]  ⭐ DEBJEET")
console.log("getSmallSpendCount(upi)->", getSmallSpendCount(upi),"  [2]   ⭐ DEBJEET")

console.log("\n=== EDGE CASES (sabko bachna chahiye) ===")
console.log("null row   ->", getSmallSpendCount([["a","b",30], null, ["c","d",25]]), "  [1]")
console.log("garbage    ->", getSmallSpendTotal([["a","b",30], "GARBAGE", ["c","d",25]]), "  [55]")
console.log("empty      ->", getSmallSpendCount([]), "  [0]")
