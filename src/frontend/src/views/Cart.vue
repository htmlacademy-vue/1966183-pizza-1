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
            @decButtonClick="decrementPizzaCount($event)"
          />
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <CartAdditionalProduct
              v-for="type in misc"
              :key="type.name"
              @decrementValue="decCountAdditionalProduct"
              @incrementValue="incCountAdditionalProduct"
              :type="type"
              :count="
                additionalProduct[type.name]
                  ? additionalProduct[type.name].count
                  : 0
              "
              :price="type.price"
            />
          </ul>
        </div>
        <CartClientsInfo
          @update:infoForm="changeClientsInfo"
          :infoForm="infoForm"
          :is-street-empty-prop="showStreetNotif"
          :is-building-empty-prop="showBuildingNotif"
        />
      </div>
    </main>
    <CartFooter
      :final-price="finalPrice"
      @make-order="makeOrder"
      :order-button-disabled="orderButtonDisabled"
    />
    <transition name="popup">
      <CartOrderPlaced v-if="isPopupOpen" @close-popup="closePopup" />
    </transition>
  </form>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import CartAdditionalProduct from "../modules/cart/CartAdditionalProduct";
import CartClientsInfo from "../modules/cart/CartClientsInfo";
import CartOrderPlaced from "../modules/cart/CartOrderPlaced";
import CartFooter from "../modules/cart/CartFooter";
import CartPizzaAndCounterItem from "../modules/cart/CartPizzaAndCounterItem";
import {
  findNameById,
  getIngredientsString,
  miscBasketToMiscOrder,
} from "../common/helpers/pizzasFormat";
import JwtService from "../services/jwt.service";

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
      showStreetNotif: false,
      showBuildingNotif: false,
      token: JwtService.getToken(),
    };
  },
  computed: {
    ...mapState("Cart", [
      "pizzasInBasket",
      "additionalProduct",
      "clientsInfo",
      "pizzasCountAndPrice",
    ]),
    ...mapState("IngredientsProducts", ["misc", "fillings"]),
    ...mapState("Auth", ["userInfo"]),
    ...mapGetters("Cart", ["finalPrice"]),
    infoForm() {
      return { ...this.clientsInfo };
    },
    isAuth() {
      return Object.keys(this.userInfo).length !== 0;
    },
    correctPizzasFormat() {
      return this.pizzasInBasket.map((pizza) => {
        return {
          name: pizza.name,
          sauce: findNameById(pizza.sauceId, this.fillings.sauces),
          dough: findNameById(pizza.doughId, this.fillings.dough),
          size: findNameById(pizza.sizeId, this.fillings.sizes),
          ingredients: getIngredientsString(
            pizza.ingredients,
            this.fillings.ingredients
          ),
          price: pizza.price,
          id: pizza.id,
        };
      });
    },
    orderButtonDisabled() {
      return this.pizzasInBasket.length === 0;
    },
  },
  methods: {
    ...mapMutations("Cart", [
      "incCountAdditionalProduct",
      "decCountAdditionalProduct",
      "decCountPizza",
      "setStateToDefault",
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
    changeClientsInfo(event) {
      this.$store.commit("Cart/changeClientsInfoItem", event);
    },
    decrementPizzaCount(id) {
      this.decCountPizza(id);
    },
    closePopup() {
      this.isPopupOpen = false;
      if (!this.isAuth) this.$router.push("/");
      else this.$router.push("/orders");
    },
    async makeOrder() {
      this.showStreetNotif = false;
      this.showBuildingNotif = false;
      const address =
        this.clientsInfo.name === "Заберу сам"
          ? undefined
          : {
              street: this.clientsInfo.street,
              building: this.clientsInfo.building,
              flat: this.clientsInfo.flat,
              comment: this.clientsInfo.comment,
            };
      if (this.clientsInfo.name !== "Заберу сам") {
        if (address.street === "") {
          this.showStreetNotif = true;
          return;
        }
        if (address.building === "") {
          this.showBuildingNotif = true;
          return;
        }
      }
      const ordersBodyRequest = {
        userId: this.userInfo.id,
        phone: this.clientsInfo.phone,
        address,
        pizzas: this.pizzasInBasket.map((item) => {
          return {
            name: item.name,
            sauceId: item.sauceId,
            doughId: item.doughId,
            sizeId: item.sizeId,
            quantity: this.pizzasCountAndPrice[item.id].count,
            ingredients: [...item.ingredients].map((item) => {
              return {
                ingredientId: item.ingredientId,
                quantity: item.quantity,
              };
            }),
          };
        }),
        misc: miscBasketToMiscOrder(this.additionalProduct, this.misc),
      };
      if (this.isAuth) {
        const res = await this.$store.dispatch("Orders/createOrder", {
          body: ordersBodyRequest,
          token: this.token,
        });
        if (res) {
          this.isPopupOpen = true;
          this.setStateToDefault();
          await this.$store.dispatch("Addresses/getAddresses", this.token);
        }
      } else {
        const res = await this.$store.dispatch(
          "Orders/createOrderWithoutAuth",
          ordersBodyRequest
        );
        if (res) {
          this.isPopupOpen = true;
          this.setStateToDefault();
        }
      }
    },
  },
  watch: {
    misc: {
      deep: true,
      handler(value) {
        this.$store.commit("Cart/setAdditionalProduct", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
