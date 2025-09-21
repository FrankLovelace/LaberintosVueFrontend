import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // Importamos nuestra nueva vista

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Esta es la URL raíz
      name: 'home',
      component: HomeView, // Le decimos que cargue nuestro componente HomeView
    },
    // Puedes añadir más rutas aquí en el futuro
    // {
    //   path: '/portafolio',
    //   name: 'portafolio',
    //   component: () => import('../views/PortfolioView.vue')
    // }
  ],
})

export default router
