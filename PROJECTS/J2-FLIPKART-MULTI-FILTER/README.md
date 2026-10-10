# J2 — Flipkart Multi-Filter Product Pipeline

A small, dependency-free JavaScript project that filters Flipkart-style product rows by category, budget, rating, and stock status.

This is a pure-logic learning project. It does **not** call the real Flipkart API, use a database, or include a UI.

## Problem

A shopping product list can contain products that are too expensive, poorly rated, out of stock, or from the wrong category. This pipeline keeps only products that match every required rule and returns a small display-friendly row.

## Rules

A valid input row has this shape:

```js
[name, category, price, rating, inStock]
```

A product is included only when:

- `category === "Mobile"`
- `price <= 50000`
- `rating >= 4`
- `inStock === true`

Malformed rows are skipped safely. Price must be a finite number greater than or equal to zero, and rating must be a finite number from `0` to `5`.

## Output

The function returns:

```js
{
  status: 200,
  ok: true,
  data: [[name, price, rating]],
  productsCount: 0
}
```

The final rows are sorted from the lowest price to the highest price. The original input array is not mutated.

For invalid outer input, the function returns a `400` failure envelope.

## Example

Input:

```js
[
  ["Pixel 8", "Mobile", 44999, 4.4, true],
  ["Moto G", "Mobile", 14999, 4.1, true],
  ["Nokia G", "Mobile", 8999, 3.8, true],
  ["Realme C", "Mobile", 50000, 4.0, true]
]
```

Output data:

```js
[
  ["Moto G", 14999, 4.1],
  ["Pixel 8", 44999, 4.4],
  ["Realme C", 50000, 4.0]
]
```

The boundary values `price === 50000` and `rating === 4` are accepted.

## Project structure

```text
J2-FLIPKART-MULTI-FILTER/
├── README.md
├── 00-README.txt
├── PLAN/
│   ├── 03-SPEC-FLIPKART-MULTI-FILTER.txt
│   └── 03-SPEC-FLIPKART-MULTI-FILTER-EN.txt
└── CODE/
    ├── README.txt
    ├── src/
    │   └── flipkart-filter.js
    └── tests/
        └── flipkart-filter.test.js
```

## Run the proof

No packages are required. Use a current Node.js version with `Array.prototype.toSorted()` support.

```bash
cd CODE
node tests/flipkart-filter.test.js
```

The test runner checks normal data, invalid outer input, empty input, malformed rows, no-match data, inclusive boundary values, invalid price/rating ranges, and original-array immutability.

## Concepts demonstrated

- `filter()` for eligibility rules
- `map()` for the final display shape
- `toSorted()` for non-mutating price ordering
- defensive validation and predictable return envelopes
- dependency-free Node.js testing

## Status

J2 acceptance proof passed: **8/8 checks**.

## Author

Debjeet Dhar — Kolkata, India
