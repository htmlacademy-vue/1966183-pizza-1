import Vue from "vue";
import Vuex from "vuex";
import builder from "./modules/builder";
import cart from "./modules/cart";
import orders from "./modules/orders";
import auth from "./modules/auth";
import ingredientsProducts from "./modules/ingredients-products";
import addresses from "./modules/addresses";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Builder: builder,
    Cart: cart,
    Orders: orders,
    Auth: auth,
    IngredientsProducts: ingredientsProducts,
    Addresses: addresses,
  },
});
