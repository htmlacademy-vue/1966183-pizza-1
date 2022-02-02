<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="pizzasInBasket.length === 0">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul class="cart-list sheet" v-else>
          <li
            class="cart-list__item"
            v-for="(pizza, index) in correctPizzasFormat"
            :key="index"
          >
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
                @click="incrementPizzaCount(pizza.id)"
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
                @click="$store.commit('Cart/incCountPizza', pizza.id)"
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
                  @click="
                    $store.commit(
                      'Builder/setBuilderToChange',
                      pizzasInBasket[index]
                    )
                  "
                >
                  Изменить
                </button>
              </router-link>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditionalProduct
              v-for="type in types"
              :key="type.description"
              @decrementValue="
                $store.commit('Cart/decCountAdditionalProduct', $event)
              "
              @incrementValue="
                $store.commit('Cart/incCountAdditionalProduct', $event)
              "
              :type="type"
              :count="additionalProduct[type.name].count"
              :price="additionalProduct[type.name].price"
            />
          </ul>
        </div>
        <CartClientsInfo
          :clients-info="clientsInfo"
          @changeDelivery="
            $store.commit('Cart/changeClientsInfoItem', {
              value: $event.value,
              name: $event.type,
            })
          "
          @changePhone="
            $store.commit('Cart/changeClientsInfoItem', {
              value: $event.value,
              name: $event.type,
            })
          "
          @changeStreet="
            $store.commit('Cart/changeClientsInfoItem', {
              value: $event.value,
              name: $event.type,
            })
          "
          @changeHouse="
            $store.commit('Cart/changeClientsInfoItem', {
              value: $event.value,
              name: $event.type,
            })
          "
          @changeFlat="
            $store.commit('Cart/changeClientsInfoItem', {
              value: $event.value,
              name: $event.type,
            })
          "
        />
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <a href="#" class="button button--border button--arrow"
          >Хочу еще одну</a
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: 2 228 ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getSauce, getSize, getDough } from "@/common/helpers/classes";
import CartAdditionalProduct from "../modules/cart/CartAdditionalProduct";
import CartClientsInfo from "../modules/cart/CartClientsInfo";

export default {
  name: "Cart",
  components: { CartAdditionalProduct, CartClientsInfo },
  data() {
    return {
      types: [
        { name: "cola", description: "Coca-Cola 0,5 литра" },
        { name: "sauce", description: "Острый соус" },
        { name: "potato", description: "Картошка из печи" },
      ],
    };
  },
  computed: {
    ...mapGetters("Cart", [
      "pizzasInBasket",
      "finalPrice",
      "additionalProduct",
      "clientsInfo",
      "pizzasCountAndPrice",
    ]),
    correctPizzasFormat() {
      return this.pizzasInBasket.map((pizza) => {
        return {
          name: pizza.pizzaName,
          sauce: getSauce(pizza.sauceType),
          dough: getDough(pizza.doughType),
          size: getSize(pizza.sizeType),
          ingredients: Object.keys(pizza.countOfIngredients)
            .filter((name) => {
              if (pizza.countOfIngredients[name] !== 0) {
                return true;
              }
            })
            .join(",")
            .toLowerCase(),
          price: pizza.price,
          id: pizza.id,
        };
      });
    },
  },
  methods: {
    ...mapMutations("Cart", [
      "incCountAdditionalProduct",
      "decCountAdditionalProduct",
      "deletePizza",
      "decCountPizza",
    ]),
    incrementPizzaCount(id) {
      this.decCountPizza(id);
      if (this.pizzasCountAndPrice[id].count === 0) {
        this.deletePizza(id);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
