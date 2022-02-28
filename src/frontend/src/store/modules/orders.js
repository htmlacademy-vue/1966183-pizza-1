import OrdersApiService from "../../services/orders";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  getters: {},
  mutations: {
    addOrder(state, payload) {
      state.orders = [...state.orders, payload];
    },
    setAllOrders(state, payload) {
      state.orders = [...payload];
    },
  },
  actions: {
    async createOrder(context, payload) {
      const res = await OrdersApiService.createOrder(
        payload.token,
        payload.body
      );
      if (res) {
        const allOrders = await OrdersApiService.getOrders(payload.token);
        if (allOrders) {
          context.commit("setAllOrders", allOrders);
          return true;
        }
      }
    },
    async createOrderWithoutAuth(context, payload) {
      const res = await OrdersApiService.createOrderWithoutAuth(payload);
      if (res) {
        return true;
      }
    },
    async getOrders(context, token) {
      const res = await OrdersApiService.getOrders(token);
      if (res) {
        context.commit("setAllOrders", res);
      }
    },
    async deleteOrder(context, payload) {
      const res = await OrdersApiService.deleteOrder(payload.token, payload.id);
      if (res) {
        const allOrders = await OrdersApiService.getOrders(payload.token);
        if (allOrders) {
          context.commit("setAllOrders", allOrders);
          return true;
        }
      }
    },
  },
};
