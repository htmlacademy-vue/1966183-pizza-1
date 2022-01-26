<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutMain";
export default {
  name: "AppLayout",
  components: {},
  computed: {
    layout() {
      const layout = defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
