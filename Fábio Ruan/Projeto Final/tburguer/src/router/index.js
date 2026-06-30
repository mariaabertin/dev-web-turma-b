import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
import MenuView from "@/views/MenuView.vue";
import PedidosView from "@/views/PedidosView.vue";
import ConfiguracaoPedidoView from "@/views/ConfiguracaoPedidoView.vue";

=======
import HomeView from "@/views/HomeView.vue";
>>>>>>> db139f0f78775867e357ad783c72b9248265d3ef
const routes = [
  {
    path: "/",
    name: "home",
<<<<<<< HEAD
    component: MenuView,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
  },
  {
    path: "/pedidos",
    name: "pedidos",
    component: PedidosView,
  },
  {
    path: "/config-pedido",
    name: "config-pedido",
    component: ConfiguracaoPedidoView,
=======
    component: HomeView,
>>>>>>> db139f0f78775867e357ad783c72b9248265d3ef
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
