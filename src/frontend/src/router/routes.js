export const routes = [
  // {
  //   path: "/cart",
  //   name: "Cart",
  //   component: Cart,
  // },
  {
    path: "/cart", // url
    name: "Cart", // наименование маршрута
    component: () => import("../views/Cart.vue"), // компонент для монтирования
    meta: {
      layout: "AppLayoutDefault", // применяемый шаблон
    },
  },
  // {
  //   path: "/orders",
  //   name: "Orders",
  //   component: Orders,
  // },
  {
    path: "/orders", // url
    name: "Orders", // наименование маршрута
    component: () => import("../views/Orders.vue"), // компонент для монтирования
    meta: {
      layout: "AppLayoutMain", // применяемый шаблон
    },
  },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   component: Profile,
  // },
  {
    path: "/profile", // url
    name: "Profile", // наименование маршрута
    component: () => import("../views/Profile.vue"), // компонент для монтирования
    meta: {
      layout: "AppLayoutMain", // применяемый шаблон
    },
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: Login,
  // },
  {
    path: "/login", // url
    name: "Login", // наименование маршрута
    component: () => import("../views/Login.vue"), // компонент для монтирования
    meta: {
      layout: "AppLayoutClear", // применяемый шаблон
    },
  },
  {
    path: "/", // url
    name: "IndexHome", // наименование маршрута
    component: () => import("../views/Index.vue"), // компонент для монтирования
    meta: {
      layout: "AppLayoutDefault", // применяемый шаблон
    },
  },
];
