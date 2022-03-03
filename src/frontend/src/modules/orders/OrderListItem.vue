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
    referencesLoaded() {
      return (
        this.sizes.length !== 0 &&
        this.sauces.length !== 0 &&
        this.dough.length !== 0 &&
        this.ingredients.length !== 0
      );
    },
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
      if (this.ingredients.length !== 0 && this.pizza.ingredients) {
        return getIngredientsString(this.pizza.ingredients, this.ingredients);
      }
      return "";
    },
    pizzaPrice() {
      if (this.referencesLoaded) {
        return getOnePizzaPrice(this.pizza, {
          sizes: this.sizes,
          sauces: this.sauces,
          dough: this.dough,
          ingredients: this.ingredients,
        });
      }
      return 0;
    },
  },
};
</script>

<style scoped></style>
