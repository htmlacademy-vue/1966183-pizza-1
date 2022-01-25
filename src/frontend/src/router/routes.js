import Index from "../views/Index.vue";
import Cart from "../views/Cart.vue";
import Profile from "../views/Profile.vue";
import Orders from "../views/Orders.vue";
import Login from "../views/Login";

export const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];
