<template>
  <div class="additional-list__wrapper">
    <div class="counter additional-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="count === 0"
        @click="$emit('buttonClickDec', name)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" :value="count" />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="$emit('buttonClickInc', name)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
    <div class="additional-list__price">
      <b>× {{ price }} ₽</b>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItemCounter",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
