import { createRouter, createWebHashHistory } from 'vue-router'
import ListaDeputados from '../views/ListaDeputados.vue'
import DetalhesDeputado from '../views/DetalhesDeputado.vue'

const routes = [
  {
    path: '/',
    name: 'lista',
    component: ListaDeputados
  },
  {
    path: '/deputado/:id',
    name: 'detalhes',
    component: DetalhesDeputado
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router