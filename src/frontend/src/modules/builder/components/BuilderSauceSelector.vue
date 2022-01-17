<template>
  <label class="radio ingredients__input">
    <radio-button :name-type="selectorType" :item-name="item.name" />
    <span>{{ item.name }}</span>
  </label>
</template>

<script>
import classesHelpers from "@/common/helpers/classes";
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
  },
  components: {
    RadioButton,
  },
  data() {
    return { classesHelpers };
  },
};
</script>

<style scoped></style>
