<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { mapState } from "vuex";

const defaultLayout = "AppLayoutDefault";
export default {
  name: "AppLayout",
  computed: {
    ...mapState("Auth", ["userInfo"]),
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
