<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="buttonDisabled"
      @click="$emit('addPizza')"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      default: 0,
    },
    buttonDisabled: {
      type: Boolean,
    },
  },
};
</script>

<style scoped></style>
