import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

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
    // Admin routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@apps/admin').then(m => m.AdminLayout),
      children: [
        {
          path: '',
          name: 'admin-home',
          component: () => import('@apps/admin').then(m => m.AdminHome),
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('@apps/admin').then(m => m.AdminSettings),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@apps/admin').then(m => m.AdminUsers),
        },
      ],
    },
    // Client routes
    {
      path: '/client',
      name: 'client',
      component: () => import('@apps/client').then(m => m.ClientLayout),
      children: [
        {
          path: '',
          name: 'client-home',
          component: () => import('@apps/client').then(m => m.ClientHome),
        },
        {
          path: 'profile',
          name: 'client-profile',
          component: () => import('@apps/client').then(m => m.ClientProfile),
        },
        {
          path: 'orders',
          name: 'client-orders',
          component: () => import('@apps/client').then(m => m.ClientOrders),
        },
        {
          path: 'support',
          name: 'client-support',
          component: () => import('@apps/client').then(m => m.ClientSupport),
        },
      ],
      beforeEnter: async () => {
        try {
          const clientModule = await import('@apps/client');
          const clientStore = clientModule.useClientStore();
          if (!clientStore.currentClient) {
            clientStore.initializeDemoClient();
          }
        } catch (error) {
          console.warn('Client store initialization failed:', error);
        }
      },
    },
  ],
});



export default router;
