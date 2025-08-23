<template>
  <div class="client-layout">
    <!-- Client Header -->
    <header class="client-header">
      <div class="header-container">
        <div class="logo">
          <h2>Client Portal</h2>
        </div>
        <nav class="client-nav">
          <router-link
            to="/client"
            class="nav-item"
          >
            Bosh sahifa
          </router-link>
          <router-link
            to="/client/profile"
            class="nav-item"
          >
            Profil
          </router-link>
          <router-link
            to="/client/orders"
            class="nav-item"
          >
            Buyurtmalar
          </router-link>
          <router-link
            to="/client/support"
            class="nav-item"
          >
            Qo'llab-quvvatlash
          </router-link>
        </nav>
        <div class="user-menu">
          <span v-if="clientStore.currentClient">{{ clientStore.currentClient.name }}</span>
          <button
            class="logout-btn"
            @click="logout"
          >
            Chiqish
          </button>
        </div>
      </div>
    </header>

    <!-- Client Main Content -->
    <main class="client-main">
      <div class="container">
        <!-- Notifications -->
        <div
          v-if="clientStore.hasNotifications"
          class="notifications"
        >
          <div
            v-for="notification in clientStore.notifications"
            :key="notification"
            class="notification"
          >
            {{ notification }}
            <button @click="clientStore.removeNotification(notification)">
              ×
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div
          v-if="clientStore.loading"
          class="loading"
        >
          <div class="loading-spinner" />
          <p>Yuklanmoqda...</p>
        </div>

        <!-- Error -->
        <div
          v-if="clientStore.error"
          class="error"
        >
          <p>{{ clientStore.error }}</p>
          <button @click="clientStore.error = null">
            Yopish
          </button>
        </div>

        <!-- Router View -->
        <router-view />
      </div>
    </main>

    <!-- Client Footer -->
    <footer class="client-footer">
      <div class="footer-container">
        <p>&copy; 2025 Client Portal. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useClientStore } from '../stores'
import { useRouter } from 'vue-router'

const clientStore = useClientStore()
const router = useRouter()

const logout = () => {
  clientStore.logout()
  router.push('/')
}
</script>

<style scoped>
.client-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.client-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.client-nav {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.client-main {
  flex: 1;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.notifications {
  margin-bottom: 1rem;
}

.notification {
  background: #10b981;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  background: #ef4444;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.client-footer {
  background: #1f2937;
  color: white;
  padding: 1rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}
</style>
