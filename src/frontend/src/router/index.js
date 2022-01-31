import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);

const index = new VueRouter({
  routes,
});

export default index;
