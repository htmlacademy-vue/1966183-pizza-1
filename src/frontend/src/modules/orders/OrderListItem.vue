<template>
  <li class="order__item">
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ sizeType }}, {{ doughType }}</li>
          <li>Соус: {{ sauceType }}</li>
          <li>Начинка: {{ ingredientsType }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">{{ pizzaPrice }} ₽ x {{ pizza.quantity }}</p>
  </li>
</template>

<script>
import {
  findNameById,
  getIngredientsString,
  getOnePizzaPrice,
} from "../../common/helpers/pizzasFormat";
import { mapGetters } from "vuex";

export default {
  name: "OrderListItem",
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("IngredientsProducts", [
      "dough",
      "sauces",
      "sizes",
      "ingredients",
    ]),
    sizeType() {
      return findNameById(this.pizza.sizeId, this.sizes);
    },
    sauceType() {
      return findNameById(this.pizza.sauceId, this.sauces);
    },
    doughType() {
      return findNameById(this.pizza.doughId, this.dough);
    },
    ingredientsType() {
      return getIngredientsString(this.pizza.ingredients, this.ingredients);
    },
    pizzaPrice() {
      return getOnePizzaPrice(this.pizza, {
        sizes: this.sizes,
        sauces: this.sauces,
        dough: this.dough,
        ingredients: this.ingredients,
      });
    },
  },
};
</script>

<style scoped></style>
