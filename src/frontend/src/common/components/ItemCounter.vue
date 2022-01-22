<template>
  <div :class="counterClass">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="count === 0"
      @click="decCount"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="incCount"
      :disabled="count === 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    counterType: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    incCount() {
      const res = this.count + 1;
      this.$emit("changeCount", res);
    },
    decCount() {
      const res = this.count - 1;
      this.$emit("changeCount", res);
    },
  },
  computed: {
    counterClass() {
      return `counter counter--orange ${this.counterType}__counter`;
    },
  },
};
</script>

<style scoped></style>
