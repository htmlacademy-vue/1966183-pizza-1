<template>
  <div>
    <HeaderLayout />
    <PizzaConstructor />
  </div>
</template>

<script>
import PizzaConstructor from "@/layouts/PizzaConstructor.vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
export default {
  name: "Index",
  components: { PizzaConstructor, HeaderLayout },
};
</script>

<style lang="scss" scoped></style>
