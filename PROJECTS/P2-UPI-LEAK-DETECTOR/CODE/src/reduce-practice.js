// ===== DEBJEET KA CODE (bilkul waisa ka waisa) =====

function sumAll(numberArray) {
  if (!Array.isArray(numberArray)) {
    return { ok: false, status: 400, error: "passed valid Arrays" };
  }
  const total = numberArray.reduce((acc, cur) => {
    if (!Number.isFinite(cur)) return acc
    return acc + cur
  }, 0)
  return { ok: true, status: 201, data: total }
}

console.log("sumAll([1,2,3])      ->", sumAll([1, 2, 3]))
console.log("sumAll([])           ->", sumAll([]))
console.log("sumAll([10,'abc',5]) ->", sumAll([10, "abc", 5]))
console.log("sumAll('hello')      ->", sumAll("hello"))

const upi = [
  ["05 Oct", "Zomato", 240],
  ["05 Oct", "Netflix", 499],
  ["06 Oct", "Swiggy", 180],
  ["06 Oct", "Chai Shop", 30],
  ["07 Oct", "Amazon", 2499],
  ["07 Oct", "Chai Shop", 25],
];

function getTotalSpend(raws) {
  if (!Array.isArray(raws)) {
    return { ok: false, status: 400, error: "invalid array" }
  }
  const totals = raws.reduce((acc, cur) => {
    return acc + cur[2]
  }, 0)
  return { ok: true, status: 201, data: totals }
}

function getCount(raws) {
  if (!Array.isArray(raws)) {
    return { ok: false, status: 400, error: "invalid array" }
  }
  if (raws.length === 0) {
    return { ok: true, status: 200, data: 0 }
  }
  const totalCount = raws.reduce((acc, cur) => {
    acc.push(cur[2])
    return acc
  }, [])
  return { ok: true, status: 200, data: totalCount.length }
}

function getBiggestSpend(raws) {
  if (!Array.isArray(raws)) {
    return { ok: false, status: 400, error: "invalid array" }
  }
  const biggest = raws.reduce((acc, cur) => (cur > acc ? cur : acc), 0)
  return { ok: true, status: 200, data: biggest }
}

console.log("")
console.log("getTotalSpend(upi)   ->", getTotalSpend(upi), "  [expected 3473]")
console.log("getCount(upi)        ->", getCount(upi), "  [expected 6]")
console.log("getBiggestSpend(upi) ->", getBiggestSpend(upi), "  [expected 2499]")

// ===== ANDAR KYA HO RAHA HAI? =====
console.log("")
console.log("=== DEBUG: getBiggestSpend ke andar ===")
console.log("  cur ki value kya hai? ->", upi[0])
console.log("  kya cur > 0 hai?      ->", upi[0] > 0)
console.log("  ['05 Oct','Zomato',240] > 0  =>", ["05 Oct", "Zomato", 240] > 0)
console.log("  cur[2] kya hai?       ->", upi[0][2])
console.log("  cur[2] > 0            ->", upi[0][2] > 0)
