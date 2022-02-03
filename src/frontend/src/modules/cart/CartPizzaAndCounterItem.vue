<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>
          {{ pizza.name === "" ? "Названия нет :(" : pizza.name }}
        </h2>
        <ul>
          <li>{{ pizza.size }}, {{ pizza.dough }}</li>
          <li>Соус: {{ pizza.sauce }}</li>
          <li>Начинка: {{ pizza.ingredients }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        @click="$emit('decButtonClick', pizza.id)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="pizzasCountAndPrice[pizza.id].count"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
        @click="$emit('incButtonClick', pizza.id)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <router-link to="/">
        <button
          type="button"
          class="cart-list__edit"
          @click="$emit('changePizza', pizzasInBasket[index])"
        >
          Изменить
        </button>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: "CartPizzaAndCounterItem",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
    pizzasInBasket: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    pizzasCountAndPrice: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
