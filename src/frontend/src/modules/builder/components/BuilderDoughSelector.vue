<template>
  <label :class="doughClassName" @click="$emit('changeDough', classType)">
    <radio-button
      :name-type="selectorType"
      :item-name="item.name"
      is-hidden
      :checked="doughType"
    />
    <b>{{ item.name }}</b>
    <span>{{ item.description }}</span>
  </label>
</template>

<script>
import { getCorrectClass } from "@/common/helpers/classes";
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderDoughSelector",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    selectorType: {
      type: String,
    },
    doughType: {
      type: String,
    },
  },
  components: {
    RadioButton,
  },
  computed: {
    classType() {
      return this.getCorrectClass(this.item.name, this.selectorType);
    },
    doughClassName() {
      return `dough__input dough__input--${this.classType}`;
    },
  },
  methods: { getCorrectClass },
};
</script>

<style scoped></style>
