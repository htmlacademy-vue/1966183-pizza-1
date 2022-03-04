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
    getAllFillings(context) {
      Promise.all([
        IngredientsApiService.getIngredients(),
        IngredientsApiService.getSauces(),
        IngredientsApiService.getDough(),
        IngredientsApiService.getSizes(),
        MiscApiService.getMisc(),
      ]).then(([ingredients, sauces, dough, sizes, misc]) => {
        context.commit("setIngredients", ingredients);
        context.commit("setSauces", sauces);
        context.commit("setDough", dough);
        context.commit("setSizes", sizes);
        context.commit("setMisc", misc);
      });
    },
  },
};
