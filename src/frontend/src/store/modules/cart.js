import { nanoid } from "nanoid";
export default {
  namespaced: true,
  state: {
    pizzasInBasket: [],
    pizzasCountAndPrice: {},
    finalPrice: 0,
    additionalProduct: {
      cola: {
        price: 56,
        count: 0,
      },
      sauce: {
        price: 30,
        count: 0,
      },
      potato: {
        price: 56,
        count: 0,
      },
    },
    clientsInfo: {
      delivery: "",
      phone: "",
      street: "",
      house: "",
      flat: "",
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
    pizzasInBasket(state) {
      return state.pizzasInBasket;
    },
    additionalProduct(state) {
      return state.additionalProduct;
    },
    clientsInfo(state) {
      return state.clientsInfo;
    },
    pizzasCountAndPrice(state) {
      return state.pizzasCountAndPrice;
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
          [id]: { count: 1, price: newPizza.price, id },
        };
      }
    },
    incCountAdditionalProduct(state, type) {
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
    },
    changeClientsInfoItem(state, { name, value }) {
      state.clientsInfo[name] = value;
    },
    deletePizza(state, id) {
      delete state.pizzasCountAndPrice[id];
      state.pizzasCountAndPrice = { ...state.pizzasCountAndPrice };
      state.pizzasInBasket = [...state.pizzasInBasket].filter(
        (item) => item.id !== id
      );
      state.pizzasInBasket = [...state.pizzasInBasket];
    },
  },
  actions: {},
};
