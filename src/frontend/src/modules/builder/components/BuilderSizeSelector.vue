<template>
  <label
    :class="`${selectorType}__input ${selectorType}__input--${classesHelpers.getCorrectClass(
      item.name,
      selectorType
    )}`"
  >
    <radio-button :name-type="selectorType" :item-name="item.name" is-hidden />
    <span>{{ item.name }}</span>
  </label>
</template>

<script>
import classesHelpers from "@/common/helpers/classes";
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderSizeSelector",
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
