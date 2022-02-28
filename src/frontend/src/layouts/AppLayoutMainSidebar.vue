<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link to="/orders" :class="historyLinkClass"
      >История заказов</router-link
    >
    <router-link to="/profile" :class="profileLinkClass"
      >Мои данные</router-link
    >
  </div>
</template>

<script>
export default {
  name: "AppLayoutMainSidebar",
  computed: {
    historyLinkClass() {
      return this.$router.currentRoute.path === "/orders"
        ? "layout__link layout__link--active"
        : "layout__link";
    },
    profileLinkClass() {
      return this.$router.currentRoute.path === "/profile"
        ? "layout__link layout__link--active"
        : "layout__link";
    },
  },
};
</script>

<style scoped></style>
