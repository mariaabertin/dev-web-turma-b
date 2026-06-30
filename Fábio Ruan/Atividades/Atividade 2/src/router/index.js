import { createRouter, createWebHistory } from 'vue-router';
import DeputadosList from '../views/DeputadosList.vue';
import DeputadoDetails from '../views/DeputadoDetails.vue';

const routes = [
  {
    path: '/',
    name: 'DeputadosList',
    component: DeputadosList,
  },
  {
    path: '/deputado/:id',
    name: 'DeputadoDetails',
    component: DeputadoDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
