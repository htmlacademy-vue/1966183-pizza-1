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
          <CartPizzaAndCounterItem
            v-for="(pizza, index) in correctPizzasFormat"
            :key="pizza.id"
            :pizza="pizza"
            :pizzas-in-basket="pizzasInBasket[index]"
            :pizzas-count-and-price="pizzasCountAndPrice"
            @changePizza="setBuilderToChange"
            @incButtonClick="incCountPizza"
            @decButtonClick="incrementPizzaCount($event)"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditionalProduct
              v-for="type in types"
              :key="type.description"
              @decrementValue="decCountAdditionalProduct"
              @incrementValue="incCountAdditionalProduct"
              :type="type"
              :count="additionalProduct[type.name].count"
              :price="additionalProduct[type.name].price"
            />
          </ul>
        </div>
        <CartClientsInfo
          :clients-info="clientsInfo"
          @changeDelivery="changeClientsInfoItem"
          @changePhone="changeClientsInfoItem"
          @changeStreet="changeClientsInfoItem"
          @changeHouse="changeClientsInfoItem"
          @changeFlat="changeClientsInfoItem"
        />
      </div>
    </main>
    <CartFooter :final-price="finalPrice" @show-popup="isPopupOpen = true" />
    <CartOrderPlaced v-if="isPopupOpen" @close-popup="closePopup" />
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getSauce, getSize, getDough } from "@/common/helpers/classes";
import CartAdditionalProduct from "../modules/cart/CartAdditionalProduct";
import CartClientsInfo from "../modules/cart/CartClientsInfo";
import CartOrderPlaced from "../modules/cart/CartOrderPlaced";
import CartFooter from "../modules/cart/CartFooter";
import CartPizzaAndCounterItem from "../modules/cart/CartPizzaAndCounterItem";

export default {
  name: "Cart",
  components: {
    CartAdditionalProduct,
    CartClientsInfo,
    CartOrderPlaced,
    CartFooter,
    CartPizzaAndCounterItem,
  },
  data() {
    return {
      types: [
        { name: "cola", description: "Coca-Cola 0,5 литра" },
        { name: "sauce", description: "Острый соус" },
        { name: "potato", description: "Картошка из печи" },
      ],
      isPopupOpen: false,
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
    setBuilderToChange(event) {
      this.$store.commit("Builder/setBuilderToChange", event);
    },
    incCountPizza(event) {
      this.$store.commit("Cart/incCountPizza", event);
    },
    decCountAdditionalProduct(event) {
      this.$store.commit("Cart/decCountAdditionalProduct", event);
    },
    incCountAdditionalProduct(event) {
      this.$store.commit("Cart/incCountAdditionalProduct", event);
    },
    changeClientsInfoItem(event) {
      this.$store.commit("Cart/changeClientsInfoItem", {
        value: event.value,
        name: event.type,
      });
    },
    incrementPizzaCount(id) {
      this.decCountPizza(id);
      if (this.pizzasCountAndPrice[id].count === 0) {
        this.deletePizza(id);
      }
    },
    closePopup() {
      this.isPopupOpen = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
