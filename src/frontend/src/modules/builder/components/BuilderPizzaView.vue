<template>
  <div class="content__constructor">
    <div :class="pizzaClass">
      <div class="pizza__wrapper">
        <div
          v-for="fill in fillings"
          :key="`filling--${fill}`"
          :class="`pizza__filling pizza__filling--${correctFillingClass(fill)}`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIngredientClass } from "@/common/helpers/classes";
export default {
  name: "BuilderPizzaView",
  props: {
    size: {
      type: String,
    },
    sauce: {
      type: String,
    },
    fillings: {
      type: Array,
      default: () => [],
    },
    doughType: {
      type: String,
    },
  },
  methods: {
    getIngredientClass,
    correctFillingClass(fill) {
      return this.getIngredientClass(fill);
    },
  },
  computed: {
    pizzaClass() {
      return `pizza pizza--foundation--${this.size}-${this.sauce}`;
    },
  },
};
</script>

<style scoped></style>
