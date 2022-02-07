import { builderToDefaultState } from "../helpers";
import pizzaJsonData from "@/static/pizza.json";
import { getSauce, getSize, getDough } from "@/common/helpers/classes";
const { dough, ingredients, sauces, sizes } = pizzaJsonData;

export default {
  namespaced: true,
  state: {
    countOfIngredients: {},
    sauceType: "tomato",
    sizeType: "small",
    doughType: "light",
    pizzaName: "",
    price: 0,
    id: "",
  },
  getters: {
    countOfIngredients(state) {
      return state.countOfIngredients;
    },
    sauceType(state) {
      return state.sauceType;
    },
    sizeType(state) {
      return state.sizeType;
    },
    doughType(state) {
      return state.doughType;
    },
    pizzaName(state) {
      return state.pizzaName;
    },
    allIngredients(state) {
      return state;
    },
    price(state) {
      const pickedItem = (arr, pickedName) => {
        return arr.find((item) => item.name === pickedName);
      };
      const pickedSauce = pickedItem(sauces, getSauce(state.sauceType));
      const pickedDough = pickedItem(dough, getDough(state.doughType));
      const pickedSize = pickedItem(sizes, getSize(state.sizeType));
      let price = 0;
      for (let key in state.countOfIngredients) {
        const item = ingredients.find((ing) => ing.name === key);
        const priceOfItem = state.countOfIngredients[key] * item.price;
        price += priceOfItem;
      }
      if (pickedSauce && pickedDough && pickedSize) {
        price += pickedSauce.price;
        price += pickedDough.price;
        price *= pickedSize.multiplier;
      }
      state.price = price;
      return price;
    },
  },
  mutations: {
    changeDough(state, newDough) {
      state.doughType = newDough;
    },
    changeSize(state, newSize) {
      state.sizeType = newSize;
    },
    setSauce(state, newSauce) {
      state.sauceType = newSauce;
    },
    changeCountIngredients(state, { count, name }) {
      state.countOfIngredients[name] = count;
    },
    changeCountIngredientsByDragAndDrop(state, name) {
      state.countOfIngredients[name] += 1;
    },
    setCounter(state, event) {
      state.countOfIngredients = { ...this.countOfIngredients, ...event };
    },
    changePizzaName(state, name) {
      state.pizzaName = name;
    },
    setBuilderToDefault(state) {
      Object.assign(state, builderToDefaultState());
    },
    setBuilderToChange(state, pizzaState) {
      state.pizzaName = pizzaState.pizzaName;
      state.countOfIngredients = { ...pizzaState.countOfIngredients };
      state.sizeType = pizzaState.sizeType;
      state.sauceType = pizzaState.sauceType;
      state.doughType = pizzaState.doughType;
      state.id = pizzaState.id;
    },
  },
  actions: {},
};
