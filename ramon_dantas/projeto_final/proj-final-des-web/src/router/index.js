import { createRouter, createWebHistory } from "vue-router";
import PedidosView from "@/views/PedidosView.vue";
import CatalogoView from "@/views/CatalogoView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import HomeView from "@/views/HomeView.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/catalogo",
    name: "catalogo",
    component: CatalogoView,
  },
  {
    path: "/pedidos",
    name: "pedidos",
    component: PedidosView,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
