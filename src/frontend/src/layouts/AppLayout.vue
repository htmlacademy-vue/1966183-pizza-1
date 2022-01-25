<template>
  <header class="header">
    <div class="header__logo">
      <a class="logo" @click="goToPage('/')">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a @click="goToPage('cart')">0 ₽</a>
    </div>
    <div class="header__user" @click="goToPage('/login')">
      <a class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayout",
  methods: {
    goToPage(pageName) {
      this.$router.push(pageName);
    },
  },
};
</script>

<style scoped lang="scss">
a {
  cursor: pointer;
}
</style>
