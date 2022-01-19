<template>
  <label class="radio ingredients__input">
    <radio-button
      :name-type="selectorType"
      :item-name="item.name"
      :checked="sauceType"
      @changeSauce="$emit('setSauce', $event)"
    />
    <span>{{ item.name }}</span>
  </label>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderSauceSelector",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    selectorType: {
      type: String,
    },
    sauceType: {
      type: String,
    },
  },
  components: {
    RadioButton,
  },
};
</script>

<style scoped></style>
