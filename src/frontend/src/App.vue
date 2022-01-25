<template>
  <div id="app">
    <!--    <Index />-->
    <AppLayout />
    <router-view />
    <router-view name="cart" />
    <router-view name="orders" />
    <router-view name="profile" />
    <router-view name="login" />
  </div>
</template>

<script>
// import Index from "./views/Index.vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: { AppLayout },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
