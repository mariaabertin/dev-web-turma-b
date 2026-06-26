import { createRouter, createWebHistory } from "vue-router";
import MenuView from "@/views/MenuView.vue";
import ConfiguracaoPedidoView from "@/views/ConfiguracaoPedidoVIew.vue";
import PedidosView from "@/views/PedidosView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MenuView,
  },
  {
    path: "/menu",
    name: "servicos",
    component: MenuView,
  },
  {
    path: "/pedidos",
    name: "agendamentos",
    component: PedidosView,
  },
  {
    path: "/config",
    name: "agendar",
    component: ConfiguracaoPedidoView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
