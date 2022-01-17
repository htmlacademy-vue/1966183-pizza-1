<template>
  <span
    :class="`${selectorType} ${selectorType}--${classesHelpers.getIngredientClass(
      item.name
    )}`"
  >
    {{ item.name }}
  </span>
</template>

<script>
import classesHelpers from "@/common/helpers/classes";
export default {
  name: "IngrediSelectorItem",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    selectorType: {
      type: String,
    },
  },
  data() {
    return { classesHelpers };
  },
};
</script>

<style scoped></style>
