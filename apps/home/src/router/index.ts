import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { AdminLayout, getAdminRoutes } from '@apps/admin';
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
      path: '/shared-test',
      name: 'shared-test',
      component: () => import('../views/SharedTest.vue'),
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: getAdminRoutes(),
    },
    {
      path: '/client',
      component: () => import('@apps/client').then(m => m.ClientLayout),
      children: [
        {
          path: '',
          name: 'client-home',
          component: () => import('@apps/client').then(m => m.ClientHome)
        },
        {
          path: 'profile',
          name: 'client-profile',
          component: () => import('@apps/client').then(m => m.ClientProfile)
        },
        {
          path: 'orders',
          name: 'client-orders',
          component: () => import('@apps/client').then(m => m.ClientOrders)
        },
        {
          path: 'support',
          name: 'client-support',
          component: () => import('@apps/client').then(m => m.ClientSupport)
        }
      ],
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
