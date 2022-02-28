import { nanoid } from "nanoid";
import IngredientsProducts from "./ingredients-products";
export default {
  namespaced: true,
  state: {
    pizzasInBasket: [],
    pizzasCountAndPrice: {},
    finalPrice: 0,
    additionalProduct: {},
    clientsInfo: {
      street: "",
      building: "",
      flat: "",
      phone: "",
      name: "Новый адрес",
    },
  },
  getters: {
    finalPrice(state) {
      let finalPrice = 0;
      for (let key in state.pizzasCountAndPrice) {
        finalPrice +=
          state.pizzasCountAndPrice[key].price *
          state.pizzasCountAndPrice[key].count;
      }
      for (let key in state.additionalProduct) {
        finalPrice +=
          state.additionalProduct[key].price *
          state.additionalProduct[key].count;
      }
      return finalPrice;
    },
  },
  mutations: {
    addPizzaToBasket(state, newPizza) {
      if (newPizza.id !== "") {
        const index = state.pizzasInBasket.findIndex(
          (item) => item.id === newPizza.id
        );
        state.pizzasInBasket[index] = newPizza;
        state.pizzasCountAndPrice[newPizza.id] = {
          ...state.pizzasCountAndPrice[newPizza.id],
          price: newPizza.price,
        };
      } else {
        const id = nanoid();
        state.pizzasInBasket.push({ ...newPizza, id });
        state.pizzasCountAndPrice = {
          ...state.pizzasCountAndPrice,
          [id]: { count: newPizza.quantity || 1, price: newPizza.price, id },
        };
      }
    },
    setAdditionalProductFromOrders(state, miscState) {
      state.additionalProduct = { ...miscState };
    },
    incCountAdditionalProduct(state, type) {
      if (!state.additionalProduct[type]) {
        const price = IngredientsProducts.state.misc.find(
          (item) => item.name === type
        ).price;
        state.additionalProduct = {
          ...state.additionalProduct,
          [type]: { count: 0, price },
        };
      }
      state.additionalProduct[type].count += 1;
    },
    decCountAdditionalProduct(state, type) {
      if (state.additionalProduct[type].count > 0) {
        state.additionalProduct[type].count -= 1;
      }
    },
    incCountPizza(state, id) {
      state.pizzasCountAndPrice[id] = {
        ...state.pizzasCountAndPrice[id],
        count: state.pizzasCountAndPrice[id].count + 1,
      };
    },
    decCountPizza(state, id) {
      state.pizzasCountAndPrice[id] = {
        ...state.pizzasCountAndPrice[id],
        count: state.pizzasCountAndPrice[id].count - 1,
      };
      if (state.pizzasCountAndPrice[id].count === 0) {
        delete state.pizzasCountAndPrice[id];
        state.pizzasCountAndPrice = { ...state.pizzasCountAndPrice };
        state.pizzasInBasket = [...state.pizzasInBasket].filter(
          (item) => item.id !== id
        );
        state.pizzasInBasket = [...state.pizzasInBasket];
      }
    },
    changeClientsInfoItem(state, newValue) {
      state.clientsInfo = { ...newValue };
    },
    setAdditionalProduct(state, payload) {
      for (let i = 0; i < payload.length; i++) {
        const prop = payload[i];
        state.additionalProduct = {
          ...state.additionalProduct,
          [prop.name]: { price: prop.price, count: 0 },
        };
      }
    },
    setStateToDefault(state) {
      state.pizzasInBasket = [];
      state.pizzasCountAndPrice = {};
      state.finalPrice = 0;
      state.additionalProduct = {};
      state.clientsInfo = {
        street: "",
        building: "",
        flat: "",
        phone: "",
        name: "Новый адрес",
      };
    },
  },
  actions: {},
};
