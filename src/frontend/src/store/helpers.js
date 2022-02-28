export const builderToDefaultState = () => {
  return {
    ingredients: (() => {
      const res = [];
      for (let i = 1; i <= 15; i++) {
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
