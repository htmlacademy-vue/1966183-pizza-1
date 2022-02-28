import AddressesApiService from "../../services/addresses";

export default {
  namespaced: true,
  state: {
    addresses: {
      byId: {},
      allIds: [],
    },
  },
  getters: {
    addressesNames(state) {
      return Object.values(state.addresses.byId).map((addr) => addr.name);
    },
  },
  mutations: {
    setAddresses(state, payload) {
      payload.forEach((addr) => {
        state.addresses.byId[addr.id] = { ...addr };
        if (!state.addresses.allIds.includes(addr.id)) {
          state.addresses.allIds.push(addr.id);
        }
      });
      state.addresses = { ...state.addresses };
    },
    addNewAddress(state, payload) {
      state.addresses = { ...state.addresses };
      state.addresses.byId[payload.id] = { ...payload };
      if (!state.addresses.allIds.includes(payload.id)) {
        state.addresses.allIds.push(payload.id);
      }
    },
    changeAddress(state, payload) {
      state.addresses = { ...state.addresses };
      state.addresses.byId[payload.id] = { ...payload };
    },
    deleteAddress(state, id) {
      state.addresses = { ...state.addresses };
      delete state.addresses.byId[id];
      state.addresses.allids = state.addresses.allIds.filter(
        (addrId) => addrId !== id
      );
    },
  },
  actions: {
    async getAddresses(context, token) {
      const addresses = await AddressesApiService.getAddresses(token);
      if (addresses) {
        context.commit("setAddresses", addresses);
      }
    },
    async createAddress(context, payload) {
      const address = await AddressesApiService.createAddress(
        payload.token,
        payload.body
      );
      if (address) {
        context.commit("addNewAddress", address);
      }
    },
    async changeAddress(context, payload) {
      const address = await AddressesApiService.changeAddress(
        payload.token,
        payload.body
      );
      if (address) {
        context.commit("changeAddress", payload.body);
      }
    },
    async deleteAddress(context, payload) {
      const address = await AddressesApiService.deleteAddress(
        payload.token,
        payload.id
      );
      if (address) {
        context.commit("deleteAddress", payload.id);
      }
    },
  },
};
