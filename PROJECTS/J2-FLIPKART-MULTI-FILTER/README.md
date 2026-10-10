<div align="center">

# Flipkart Multi-Filter

### A defensive, dependency-free product filtering pipeline in JavaScript

[![Tests](https://img.shields.io/badge/tests-8%2F8%20passing-16a34a?style=for-the-badge)](#test-coverage)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](#run-the-project)
[![Dependencies](https://img.shields.io/badge/runtime%20dependencies-0-2563eb?style=for-the-badge)](#design-decisions)

**Validate → filter → shape → sort** a Flipkart-style product list without mutating the input.

</div>

---

## Overview

Shopping data is rarely perfect. A product list can contain malformed rows, products from the wrong category, items above the budget, low ratings, and out-of-stock products.

This project turns that raw list into a safe, display-ready result by applying all business rules in one predictable pipeline.

> This is a pure JavaScript logic project. It does not call the real Flipkart API and does not include a UI, database, login, cart, or payment flow.

## What it does

| Capability | Behaviour |
| --- | --- |
| **Input validation** | Rejects invalid outer input and skips malformed rows safely |
| **Category filter** | Keeps only the exact category `"Mobile"` |
| **Budget filter** | Keeps prices less than or equal to `50000` |
| **Rating filter** | Keeps ratings greater than or equal to `4` |
| **Availability filter** | Keeps only `inStock === true` |
| **Display projection** | Converts rows to `[name, price, rating]` |
| **Price ordering** | Sorts from the lowest price to the highest price |
| **Immutability** | Leaves the original product list unchanged |

## Pipeline

```text
Raw product rows
      │
      ▼
Validate row shape and value ranges
      │
      ▼
Filter: Mobile + price ≤ 50000 + rating ≥ 4 + inStock
      │
      ▼
Map to [name, price, rating]
      │
      ▼
Sort by price with toSorted()
      │
      ▼
Predictable response envelope
```

## Input contract

Each product row must follow this shape:

```js
[name, category, price, rating, inStock]
```

| Position | Field | Expected value |
| ---: | --- | --- |
| `0` | `name` | Non-empty string |
| `1` | `category` | Non-empty string |
| `2` | `price` | Finite number, `>= 0` |
| `3` | `rating` | Finite number from `0` to `5` |
| `4` | `inStock` | Boolean |

## Usage

```js
const { getFlipkartDeals } = require("./CODE/src/flipkart-filter");

const products = [
  ["Pixel 8", "Mobile", 44999, 4.4, true],
  ["Moto G", "Mobile", 14999, 4.1, true],
  ["Nokia G", "Mobile", 8999, 3.8, true],
  ["Realme C", "Mobile", 50000, 4.0, true],
];

const result = getFlipkartDeals(products);

console.log(result);
```

### Result

```js
{
  status: 200,
  ok: true,
  data: [
    ["Moto G", 14999, 4.1],
    ["Pixel 8", 44999, 4.4],
    ["Realme C", 50000, 4.0]
  ],
  productsCount: 3
}
```

The boundary values are intentional: a price of exactly `50000` and a rating of exactly `4` both pass.

## Error and edge-case behaviour

| Input | Result |
| --- | --- |
| Non-array outer input | `status: 400`, `ok: false`, error message |
| Empty array | Successful response with empty `data` |
| Malformed inner rows | Skipped without crashing |
| No matching products | Successful response with empty `data` |
| Negative price | Row skipped |
| Rating below `0` or above `5` | Row skipped |
| Original input array | Remains unchanged |

## Run the project

From this project folder:

```bash
node CODE/tests/flipkart-filter.test.js
```

No package installation is required. The project uses Node's built-in assertion library.

## Test coverage

The proof runner covers all eight acceptance checks:

1. Normal product fixture
2. Invalid outer input
3. Empty products
4. Malformed rows
5. No product matching every rule
6. Inclusive boundary values
7. Invalid price and rating ranges
8. Original-array immutability

Expected final line:

```text
J2 test suite passed.
```

## Design decisions

### Why `toSorted()`?

`toSorted()` returns a new sorted array, so the implementation does not mutate the source list. It makes the immutability intention explicit.

For an older Node.js runtime, the compatible alternative is:

```js
[...rows].sort((first, second) => first[1] - second[1]);
```

### Why array rows?

The ticket intentionally uses array rows to practise indexed access and the core pipeline methods:

```text
filter → map → sort
```

Objects, async code, APIs, and UI behaviour are intentionally outside this project's scope.

## Project structure

```text
J2-FLIPKART-MULTI-FILTER/
├── README.md                         # GitHub project overview
├── 00-README.txt                     # Workspace status note
├── PLAN/
│   ├── 03-SPEC-FLIPKART-MULTI-FILTER.txt
│   └── 03-SPEC-FLIPKART-MULTI-FILTER-EN.txt
└── CODE/
    ├── README.txt                    # Local run instructions
    ├── src/
    │   └── flipkart-filter.js        # Production function
    └── tests/
        └── flipkart-filter.test.js   # Fixtures and acceptance proof
```

## Status

**J2 complete — 8/8 acceptance checks passed.**

J3 mini pub/sub is the next project in the learning sequence.

## Author

**Debjeet Dhar** · Kolkata, India

Built as a focused JavaScript logic project with defensive validation, predictable outputs, and proof-driven testing.
