<template>
  <span :class="selectorItemClass">
    {{ item.name }}
  </span>
</template>

<script>
import { getIngredientClass } from "@/common/helpers/classes";
export default {
  name: "SelectorItem",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    selectorType: {
      type: String,
    },
  },
  methods: {
    getIngredientClass,
  },
  computed: {
    selectorItemClass() {
      return `filling filling--${this.getIngredientClass(this.item.name)}`;
    },
  },
};
</script>

<style scoped></style>
