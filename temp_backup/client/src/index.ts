import type { Component } from 'vue';

export { default as ClientLayout } from './layouts/ClientLayout.vue'
export { default as ClientHome } from './pages/ClientHome.vue'
export { default as ClientProfile } from './pages/ClientProfile.vue'
export { default as ClientOrders } from './pages/ClientOrders.vue'
export { default as ClientSupport } from './pages/ClientSupport.vue'

// Stores
export { useClientStore } from './stores'

// Dynamic route configuration
export interface ClientRoute {
  path: string;
  name: string;
  component: () => Promise<Component>;
}

export function getClientRoutes(): ClientRoute[] {
  return [
    {
      path: '',
      name: 'client-home',
      component: () => import('./pages/ClientHome.vue')
    },
    {
      path: 'profile',
      name: 'client-profile',
      component: () => import('./pages/ClientProfile.vue')
    },
    {
      path: 'orders',
      name: 'client-orders',
      component: () => import('./pages/ClientOrders.vue')
    },
    {
      path: 'support',
      name: 'client-support',
      component: () => import('./pages/ClientSupport.vue')
    }
  ];
}