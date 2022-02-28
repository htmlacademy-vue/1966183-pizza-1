import AuthApiService from "@/services/auth";

export default {
  namespaced: true,
  state: {
    userInfo: {},
  },
  getters: {
    userInfoExisted(state) {
      return Object.keys(state.userInfo).length !== 0;
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = { ...payload };
    },
    deleteUserInfo(state) {
      state.userInfo = {};
    },
  },
  actions: {
    async login(context, payload) {
      const tokenObj = await AuthApiService.login(payload);
      if (tokenObj) {
        const response = await AuthApiService.whoAmI(tokenObj.token);
        if (response) {
          context.commit("setUserInfo", response);
          return true;
        }
      }
      return undefined;
    },
    async getInfo(context, token) {
      const response = await AuthApiService.whoAmI(token);
      if (response) {
        context.commit("setUserInfo", response);
      }
    },
    async logout(context, token) {
      const response = await AuthApiService.logout(token);
      if (response) {
        context.commit("deleteUserInfo");
      }
    },
  },
};
