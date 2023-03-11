import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/todo",
      name: "todo",

      component: () => import("../views/TodoView.vue"),
      children: [
        {
          path: "/todo/statistics",
          name: "statistics",
          component: () => import("../views/TodoStatisticsView.vue"),
        },
        {
          path: "/todo/add",
          name: "add",
          component: () => import("../views/TodoAddView.vue"),
        },
      ],
    },
  ],
});

export default router;
