import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { AdminLayout, getAdminRoutes } from '@apps/admin';
import { ClientLayout, getClientRoutes, useClientStore } from '@apps/client';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/QuasarDemo.vue'),
    },
    {
      path: '/pinia',
      name: 'pinia',
      component: () => import('../views/PiniaDemo.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/ReactivityTest.vue'),
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: getAdminRoutes(),
    },
    {
      path: '/client',
      component: ClientLayout,
      children: getClientRoutes(),
      beforeEnter: async () => {
        // Initialize demo client when entering client routes
        const clientModule = await import('@apps/client');
        const clientStore = clientModule.useClientStore();
        if (!clientStore.currentClient) {
          clientStore.initializeDemoClient();
        }
      },
    },
  ],
});

export default router;
