<template>
  <div>
    <AppLayout />
    <PizzaConstructor />
  </div>
</template>

<script>
import PizzaConstructor from "@/layouts/PizzaConstructor.vue";
import AppLayout from "@/layouts/AppLayout.vue";
export default {
  name: "Index",
  components: { PizzaConstructor, AppLayout },
};
</script>

<style lang="scss" scoped></style>
