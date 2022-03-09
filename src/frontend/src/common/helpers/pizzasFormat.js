export const findId = (value, list) => {
  return list.find((item) => item.name === value).id;
};
export const findIdByClass = (value, list, callback) => {
  const correctValue = callback(value);
  return list.find((item) => item.name === correctValue).id;
};

export const findNameById = (id, list) => {
  if (list) {
    const correctValue = list.find((item) => item.id === id);
    return correctValue ? correctValue.name : "";
  }
  return "";
};

export const findPriceById = (id, list) => {
  if (list) {
    const correctValue = list.find((item) => item.id === id);
    return correctValue ? correctValue.price : 0;
  }
  return 0;
};

export const findMultiplyById = (id, list) => {
  if (list) {
    const correctValue = list.find((item) => item.id === id);
    return correctValue ? correctValue.multiplier : 0;
  }
  return 0;
};

export const findClassById = (id, list, callback) => {
  const nameValue = list.find((item) => item.id === id);
  if (nameValue) {
    return callback(nameValue.name);
  }
  return "";
};

export const findImageByName = (name, list) => {
  const nameValue = list.find((item) => item.name === name);
  if (nameValue) {
    return nameValue.image;
  }
  return "";
};

export const miscBasketToMiscOrder = (additionStore, misc) => {
  const keys = Object.keys(additionStore);
  return keys.map((name) => ({
    miscId: findId(name, misc),
    quantity: additionStore[name].count,
  }));
};

export const getIngredientsString = (ingredients, baseIngredients) => {
  return ingredients
    .filter((item) => item.quantity > 0)
    .map((item) => findNameById(item.ingredientId, baseIngredients))
    .join(",")
    .toLowerCase();
};

export const getPizzasPrice = (order, lists) => {
  const { sizes, sauces, dough, ingredients, misc } = lists;
  let finalPrice = 0;
  for (let i = 0; i < order.orderPizzas.length; i++) {
    finalPrice += findPriceById(order.orderPizzas[i].doughId, dough);
    finalPrice += findPriceById(order.orderPizzas[i].sauceId, sauces);
    for (let j = 0; j < order.orderPizzas[i].ingredients.length; j++) {
      finalPrice +=
        findPriceById(
          order.orderPizzas[i].ingredients[j].ingredientId,
          ingredients
        ) * order.orderPizzas[i].ingredients[j].quantity;
    }
    finalPrice *= findMultiplyById(order.orderPizzas[i].sizeId, sizes);
    finalPrice *= order.orderPizzas[i].quantity;
  }
  if (order.orderMisc) {
    for (let i = 0; i < order.orderMisc.length; i++) {
      finalPrice +=
        findPriceById(order.orderMisc[i].miscId, misc) *
        order.orderMisc[i].quantity;
    }
  }
  return finalPrice;
};

export const getOnePizzaPrice = (orderPizza, lists) => {
  const { sizes, sauces, dough, ingredients } = lists;
  let finalPrice = 0;
  finalPrice += findPriceById(orderPizza.doughId, dough);
  finalPrice += findPriceById(orderPizza.sauceId, sauces);
  for (let j = 0; j < orderPizza.ingredients.length; j++) {
    finalPrice +=
      findPriceById(orderPizza.ingredients[j].ingredientId, ingredients) *
      orderPizza.ingredients[j].quantity;
  }
  finalPrice *= findMultiplyById(orderPizza.sizeId, sizes);
  return finalPrice;
};
