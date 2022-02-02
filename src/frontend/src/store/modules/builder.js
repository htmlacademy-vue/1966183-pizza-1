import { builderToDefaultState } from "../helpers";

export default {
  namespaced: true,
  state: {
    countOfIngredients: {
      ["Грибы"]: 0,
      ["Чеддер"]: 0,
      ["Салями"]: 0,
      ["Ветчина"]: 0,
      ["Ананас"]: 0,
      ["Бекон"]: 0,
      ["Лук"]: 0,
      ["Чили"]: 0,
      ["Халапеньо"]: 0,
      ["Маслины"]: 0,
      ["Томаты"]: 0,
      ["Лосось"]: 0,
      ["Моцарелла"]: 0,
      ["Блю чиз"]: 0,
      ["Пармезан"]: 0,
    },
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
    setPizzaPrice(state, money) {
      state.price = money;
    },
  },
  actions: {},
};
