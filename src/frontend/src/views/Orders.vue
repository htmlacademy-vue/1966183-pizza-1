<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <div v-if="orders.length > 0">
      <orders-item v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import OrdersItem from "../modules/orders/OrdersItem";
import JwtService from "../services/jwt.service";
import { mapState } from "vuex";
export default {
  name: "Orders",
  components: { OrdersItem },
  data() {
    return {
      token: JwtService.getToken(),
    };
  },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
  mounted() {
    if (this.token) {
      this.$store.dispatch("Orders/getOrders", this.token);
    }
  },
};
</script>

<style scoped></style>
