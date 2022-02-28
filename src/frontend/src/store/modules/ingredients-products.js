import IngredientsApiService from "../../services/ingredients";
import MiscApiService from "../../services/misc";

export default {
  namespaced: true,
  state: {
    fillings: {
      ingredients: [],
      dough: [],
      sizes: [],
      sauces: [],
    },
    misc: [],
  },
  getters: {
    ingredients(state) {
      return state.fillings.ingredients;
    },
    dough(state) {
      return state.fillings.dough;
    },
    sizes(state) {
      return state.fillings.sizes;
    },
    sauces(state) {
      return state.fillings.sauces;
    },
  },
  mutations: {
    setIngredients(state, payload) {
      state.fillings.ingredients = [...payload];
    },
    setDough(state, payload) {
      state.fillings.dough = [...payload];
    },
    setSauces(state, payload) {
      state.fillings.sauces = [...payload];
    },
    setSizes(state, payload) {
      state.fillings.sizes = [...payload];
    },
    setMisc(state, payload) {
      state.misc = [...payload];
    },
  },
  actions: {
    async getAllFillings(context) {
      const ingredients = await IngredientsApiService.getIngredients();
      if (ingredients) {
        context.commit("setIngredients", ingredients);
      }
      const sauces = await IngredientsApiService.getSauces();
      if (sauces) {
        context.commit("setSauces", sauces);
      }
      const dough = await IngredientsApiService.getDough();
      if (dough) {
        context.commit("setDough", dough);
      }
      const sizes = await IngredientsApiService.getSizes();
      if (sizes) {
        context.commit("setSizes", sizes);
      }
      const misc = await MiscApiService.getMisc();
      if (misc) {
        context.commit("setMisc", misc);
      }
    },
  },
};
