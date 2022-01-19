<template>
  <label :class="sizeClass" @click="$emit('changeSize', className)">
    <radio-button
      :name-type="selectorType"
      :item-name="item.name"
      is-hidden
      :checked="sizeType"
    />
    <span>{{ item.name }}</span>
  </label>
</template>

<script>
import { getCorrectClass } from "@/common/helpers/classes";
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
    sizeType: {
      type: String,
    },
  },
  components: {
    RadioButton,
  },
  computed: {
    className() {
      return this.getCorrectClass(this.item.name, this.selectorType);
    },
    sizeClass() {
      return `diameter__input diameter__input--${this.className}`;
    },
  },
  methods: { getCorrectClass },
};
</script>

<style scoped></style>
