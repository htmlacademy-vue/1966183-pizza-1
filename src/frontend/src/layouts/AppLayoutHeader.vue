<template>
  <header class="header">
    <div class="header__logo">
      <router-link class="logo" to="/">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ finalPrice }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link to="/profile" v-if="isAuthorized">
        <picture>
          <img
            :src="userInfo.avatar"
            :alt="userInfo.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ userInfo.name }}</span>
      </router-link>
      <router-link to="/" v-if="isAuthorized" class="header__logout"
        ><span @click="logout">Выйти</span></router-link
      >
      <router-link class="header__login" to="/login" v-if="!isAuthorized">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import JwtService from "../services/jwt.service";

export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters("Cart", ["finalPrice"]),
    ...mapState("Auth", ["userInfo"]),
    isAuthorized() {
      return Object.keys(this.userInfo).length !== 0;
    },
  },
  methods: {
    logout() {
      const token = JwtService.getToken();
      this.$store.dispatch("Auth/logout", token);
    },
  },
};
</script>

<style scoped lang="scss">
.header__user {
  display: flex;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
