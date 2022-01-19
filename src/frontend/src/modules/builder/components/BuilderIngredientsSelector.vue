<template>
  <li class="ingredients__item">
    <selector-item :item="ingredient" selectorType="filling" />
    <item-counter
      counter-type="ingredients"
      :count="count"
      @changeCount="changeCountItem"
    />
  </li>
</template>

<script>
import SelectorItem from "@/common/components/SelectorItem.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredient: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    SelectorItem,
    ItemCounter,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    changeCountItem(event) {
      this.count = event;
      this.$emit("setInParent", { [this.ingredient.name]: event });
    },
  },
};
</script>

<style scoped></style>
