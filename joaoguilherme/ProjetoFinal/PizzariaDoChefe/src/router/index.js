import { createRouter, createWebHistory } from "vue-router";
import CardapioView from "@/views/CardapioView.vue";
import PedidosView from "@/views/PedidosView.vue";
import ConfiguracaoPedidoView from "@/views/ConfiguracaoPedidoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: CardapioView,
  },
  {
    path: "/cardapio",
    name: "cardapio",
    component: CardapioView,
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
