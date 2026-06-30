import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MenuView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/config-pedido',
    name: 'config-pedido',
    component: () => import('@/views/ConfiguracaoPedidoView.vue')
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: () => import('../views/PedidosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router