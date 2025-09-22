import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // Importamos nuestra nueva vista
import { isVisible, hidePreview } from '../stores/ImagePreviewStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Esta es la URL raíz
      name: 'home',
      component: HomeView, // Le decimos que cargue nuestro componente HomeView
    },
    {
      path: '/servicios',
      name: 'servicios',
      // Esto es "lazy loading"
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/sobre-nosotros',
      name: 'sobre-nosotros',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (isVisible.value) {
    // Si está visible, lo cerramos.
    hidePreview()
  }
  next()
})

export default router
