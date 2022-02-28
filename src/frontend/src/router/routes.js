import JwtService from "../services/jwt.service";

const checkRoute = (to, next, value) => {
  const token = JwtService.getToken();
  if (to.path === `${value}` && !token) {
    next({ path: "/" });
  }
  next();
};

export const routes = [
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: "AppLayoutDefault",
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
    beforeEnter: (to, from, next) => {
      checkRoute(to, next, "/orders");
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
    beforeEnter: (to, from, next) => {
      checkRoute(to, next, "/profile");
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "AppLayoutClear",
    },
    beforeEnter: (to, from, next) => {
      const token = JwtService.getToken();
      if (to.path === "/login" && token) {
        next({ path: "/" });
      }
      next();
    },
  },
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: {
      layout: "AppLayoutDefault",
    },
  },
];
