<template>
  <li class="ingredients__item">
    <app-drag :transferData="ingredient.name">
      <selector-item :item="ingredient" selectorType="filling" />
    </app-drag>
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
import AppDrag from "@/common/components/AppDrag.vue";
export default {
  name: "BuilderIngredientsSelector",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  components: {
    SelectorItem,
    ItemCounter,
    AppDrag,
  },
  methods: {
    changeCountItem(event) {
      this.$emit("changeCount", event);
    },
  },
};
</script>

<style scoped></style>
