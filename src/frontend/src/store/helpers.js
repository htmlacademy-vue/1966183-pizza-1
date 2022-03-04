export const builderToDefaultState = (ingredients) => {
  return {
    ingredients: (() => {
      const res = [];
      for (let i = 1; i <= ingredients.length; i++) {
        res.push({ ingredientId: i, quantity: 0 });
      }
      return res;
    })(),
    sauceId: 1,
    sizeId: 1,
    doughId: 1,
    name: "",
    price: 0,
    id: "",
  };
};
