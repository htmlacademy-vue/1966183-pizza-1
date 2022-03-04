<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout.vue";
import JwtService from "./services/jwt.service";

export default {
  name: "App",
  components: { AppLayout },
  data() {
    return {
      token: JwtService.getToken(),
    };
  },
  mounted() {
    if (this.token) {
      this.$store.dispatch("Auth/getInfo", this.token);
      this.$store.dispatch("Addresses/getAddresses", this.token);
    }
    this.$store.dispatch("IngredientsProducts/getAllFillings");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
