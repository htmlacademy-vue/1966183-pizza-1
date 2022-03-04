<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="type.image" width="39" height="60" :alt="type.name" />
      <span>{{ type.name }}</span>
    </p>

    <CartItemCounter
      :count="count"
      :price="price"
      :name="type.name"
      @buttonClickDec="$emit('decrementValue', $event)"
      @buttonClickInc="$emit('incrementValue', $event)"
    />
  </li>
</template>

<script>
import CartItemCounter from "./CartItemCounter";
export default {
  name: "CartAdditionalProduct",
  components: { CartItemCounter },
  props: {
    type: {
      type: Object,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
