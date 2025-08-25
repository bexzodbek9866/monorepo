<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

const router = useRouter();

// Check if routes exist
const hasAdminRoute = computed(() => {
  return router.getRoutes().some(route => route.path === '/admin');
});

const hasClientRoute = computed(() => {
  return router.getRoutes().some(route => route.path === '/client');
});

// Force reactivity update when routes change
const routesCount = ref(0);

onMounted(() => {
  // Update routes count periodically to trigger computed updates
  const interval = setInterval(() => {
    const currentCount = router.getRoutes().length;
    if (currentCount !== routesCount.value) {
      routesCount.value = currentCount;
    }
  }, 100);

  // Clean up after 3 seconds (routes should be loaded by then)
  setTimeout(() => {
    clearInterval(interval);
  }, 3000);
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          My Quasar App
        </q-toolbar-title>

        <q-tabs align="right">
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/about" label="About" />
          <q-route-tab to="/demo" label="Demo" />
          <q-route-tab to="/pinia" label="Pinia Demo" />
          <q-route-tab to="/test" label="Test" />
          <q-route-tab to="/shared-test" label="Shared Test" />
          <q-route-tab 
            v-if="hasAdminRoute"
            to="/admin" 
            label="Admin" 
          />
          <q-route-tab 
            v-if="hasClientRoute"
            to="/client" 
            label="Client" 
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <RouterView />
    </q-page-container>
  </q-layout>
</template>
