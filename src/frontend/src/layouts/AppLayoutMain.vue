<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "Index";
export default {
  name: "AppLayoutMain",
  computed: {
    layout() {
      const layout = this.$route.name || defaultLayout;
      return () => import(`@/views/${layout}.vue`);
    },
  },
};
</script>

<style scoped></style>
