const isString = (value) =>
  typeof value === "string" && value.trim() !== "";

const isNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

const isBoolean = (value) =>
  typeof value === "boolean";

function getFlipkartDeals(products) {
  if (!Array.isArray(products)) {
    return {
      status: 400,
      ok: false,
      error: "input products must be an array",
    };
  }

  const cleanProducts = products.reduce((acc, product) => {
    if (!Array.isArray(product)) return acc;

    const [name, category, price, rating, inStock] = product;

    if (
      !isString(name) ||
      !isString(category) ||
      !isNumber(price) ||
      price < 0 ||
      !isNumber(rating) ||
      rating < 0 ||
      rating > 5 ||
      !isBoolean(inStock)
    ) {
      return acc;
    }

    acc.push([name, category, price, rating, inStock]);
    return acc;
  }, []);

  const eligibleProducts = cleanProducts.filter(
    (product) =>
      product[1] === "Mobile" &&
      product[2] <= 50000 &&
      product[3] >= 4 &&
      product[4] === true,
  );

  const displayRows = eligibleProducts
    .map((product) => [product[0], product[2], product[3]])
    // toSorted() returns a new sorted array; the source array is not mutated.
    .toSorted((first, second) => first[1] - second[1]);

  return {
    status: 200,
    ok: true,
    data: displayRows,
    productsCount: displayRows.length,
  };
}

module.exports = { getFlipkartDeals };
