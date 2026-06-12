import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ElencoView from "@/views/ElencoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/album",
    name: "album",
    component: HomeView,
  },
  {
    path: "/elenco",
    name: "elenco",
    component: ElencoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
