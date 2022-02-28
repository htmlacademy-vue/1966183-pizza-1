<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ finalPrice }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="repeatOrder">
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <order-list-item
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>

    <ul class="order__additional">
      <order-additional-list-item
        v-for="misc in order.orderMisc"
        :key="misc.id"
        :currentMisc="misc"
      />
    </ul>

    <p class="order__address">Адрес доставки: {{ name }}</p>
  </section>
</template>

<script>
import OrderListItem from "./OrderListItem";
import OrderAdditionalListItem from "./OrderAdditionalListItem";
import { mapGetters, mapState } from "vuex";
import {
  findNameById,
  findPriceById,
  getOnePizzaPrice,
  getPizzasPrice,
} from "../../common/helpers/pizzasFormat";
import JwtService from "../../services/jwt.service";
export default {
  name: "OrdersItem",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  components: { OrderListItem, OrderAdditionalListItem },
  computed: {
    ...mapGetters("IngredientsProducts", [
      "sizes",
      "sauces",
      "dough",
      "ingredients",
    ]),
    ...mapState("IngredientsProducts", ["misc"]),
    name() {
      return this.order.orderAddress
        ? this.order.orderAddress.name
        : "Самовывоз";
    },
    token() {
      return JwtService.getToken();
    },
    finalPrice() {
      return getPizzasPrice(
        this.order,
        {
          sizes: this.sizes,
          sauces: this.sauces,
          dough: this.dough,
          ingredients: this.ingredients,
          misc: this.misc,
        },
        true,
        true
      );
    },
  },
  methods: {
    deleteOrder(id) {
      this.$store.dispatch("Orders/deleteOrder", { token: this.token, id });
    },
    repeatOrder() {
      this.$store.commit("Cart/setStateToDefault");
      if (this.order.orderMisc) {
        const newMisc = {};
        this.order.orderMisc.forEach((item) => {
          const name = findNameById(item.miscId, this.misc);
          const price = findPriceById(item.miscId, this.misc);
          newMisc[name] = { price, count: item.quantity };
        });
        this.$store.commit("Cart/setAdditionalProductFromOrders", newMisc);
      }

      this.order.orderPizzas.forEach((item) => {
        const price = getOnePizzaPrice(item, {
          sizes: this.sizes,
          sauces: this.sauces,
          dough: this.dough,
          ingredients: this.ingredients,
        });
        const newPizza = { ...item, id: "", price };
        this.$store.commit("Cart/addPizzaToBasket", newPizza);
      });
    },
  },
};
</script>

<style scoped></style>
