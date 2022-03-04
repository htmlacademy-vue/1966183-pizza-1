import { builderToDefaultState } from "../helpers";
import IngredientsProducts from "./ingredients-products";

export default {
  namespaced: true,
  state: {
    sauceId: 1,
    sizeId: 1,
    doughId: 1,
    ingredients: [],
    name: "",
    price: 0,
    id: "",
  },
  getters: {
    allIngredients(state) {
      return state;
    },
    price(state) {
      const sauces = IngredientsProducts.state.fillings.sauces;
      const dough = IngredientsProducts.state.fillings.dough;
      const sizes = IngredientsProducts.state.fillings.sizes;
      const ingredients = IngredientsProducts.state.fillings.ingredients;
      const pickedItemById = (id, list) => {
        return list.find((item) => item.id === id);
      };

      const pickedSauce = pickedItemById(state.sauceId, sauces);
      const pickedDough = pickedItemById(state.doughId, dough);
      const pickedSize = pickedItemById(state.sizeId, sizes);
      let price = 0;
      state.ingredients.forEach((item) => {
        const pickedIngredient = pickedItemById(item.ingredientId, ingredients);
        const priceOfItem = item.quantity * pickedIngredient.price;
        price += priceOfItem;
      });
      if (pickedSauce && pickedDough && pickedSize) {
        price += pickedSauce.price;
        price += pickedDough.price;
        price *= pickedSize.multiplier;
      }
      return price;
    },
  },
  mutations: {
    changeDough(state, newDough) {
      state.doughId = newDough;
    },
    changeSize(state, newSize) {
      state.sizeId = newSize;
    },
    setSauce(state, newSauce) {
      state.sauceId = newSauce;
    },
    changeCountIngredients(state, ingredient) {
      const allIds = state.ingredients.map((item) => item.ingredientId);
      if (!allIds.includes(ingredient.ingredientId)) {
        state.ingredients = [...state.ingredients, ingredient];
      } else {
        state.ingredients.find(
          (item) => item.ingredientId === ingredient.ingredientId
        ).quantity = ingredient.quantity;
        state.ingredients = [...state.ingredients];
      }
    },
    setCounter(state, event) {
      state.countOfIngredients = { ...this.countOfIngredients, ...event };
    },
    changePizzaName(state, name) {
      state.name = name;
    },
    setBuilderToDefault(state, ingredients) {
      Object.assign(state, builderToDefaultState(ingredients));
    },
    setBuilderToChange(state, pizzaState) {
      state.name = pizzaState.name;
      state.ingredients = [...pizzaState.ingredients];
      state.sizeId = pizzaState.sizeId;
      state.sauceId = pizzaState.sauceId;
      state.dougId = pizzaState.dougId;
      state.id = pizzaState.id;
    },
    setPizzaPrice(state, price) {
      state.price = price;
    },
  },
  actions: {},
};
