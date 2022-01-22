<template>
  <input
    type="radio"
    :name="nameType"
    :value="checkedType"
    :checked="checkedActive"
    :class="isHidden ? 'visually-hidden' : ''"
    @click="$emit('input', getCorrectClass(itemName, nameType))"
  />
</template>

<script>
import { getCorrectClass } from "@/common/helpers/classes";
export default {
  name: "RadioButton",
  props: {
    nameType: {
      type: String,
      required: "",
    },
    itemName: {
      type: String,
      required: "",
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: String,
      required: true,
    },
  },
  methods: {
    getCorrectClass,
  },
  computed: {
    checkedType() {
      return this.getCorrectClass(this.itemName, this.nameType);
    },
    checkedActive() {
      return this.checkedType === this.checked;
    },
  },
};
</script>

<style scoped></style>
