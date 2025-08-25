<template>
  <div class="client-home">
    <div class="welcome-section">
      <h1>Xush kelibsiz, Client Portal'ga!</h1>
      <p>Bu yerda siz o'zingizning hisobingizni boshqarishingiz mumkin</p>
    </div>

    <div class="dashboard-cards">
      <div class="card">
        <h3>Mening Buyurtmalarim</h3>
        <div class="card-number">
          {{ clientStore.stats.totalOrders }}
        </div>
        <p>Jami buyurtmalar soni</p>
      </div>
      
      <div class="card">
        <h3>Faol Buyurtmalar</h3>
        <div class="card-number">
          {{ clientStore.stats.activeOrders }}
        </div>
        <p>Hozirda faol buyurtmalar</p>
      </div>
      
      <div class="card">
        <h3>Jami Xaridlar</h3>
        <div class="card-number">
          ${{ clientStore.stats.totalSpent }}
        </div>
        <p>Jami sarflangan mablag'</p>
      </div>
      
      <div class="card">
        <h3>Bonuslar</h3>
        <div class="card-number">
          {{ clientStore.stats.bonusPoints }}
        </div>
        <p>To'plangan bonus ballari</p>
      </div>
    </div>

    <div class="recent-activity">
      <h2>So'nggi Faoliyat</h2>
      <div class="activity-list">
        <div
          v-for="activity in clientStore.recentActivities"
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-icon">
            📦
          </div>
          <div class="activity-content">
            <h4>{{ activity.title }}</h4>
            <p>{{ activity.description }}</p>
            <small>{{ formatDate(activity.date) }}</small>
          </div>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h2>Tezkor Amallar</h2>
      <div class="actions-grid">
        <router-link
          to="/client/orders"
          class="action-card"
        >
          <div class="action-icon">
            🛒
          </div>
          <h3>Yangi Buyurtma</h3>
          <p>Yangi buyurtma berish</p>
        </router-link>
        
        <router-link
          to="/client/profile"
          class="action-card"
        >
          <div class="action-icon">
            👤
          </div>
          <h3>Profil</h3>
          <p>Profil ma'lumotlarini ko'rish</p>
        </router-link>
        
        <router-link
          to="/client/support"
          class="action-card"
        >
          <div class="action-icon">
            💬
          </div>
          <h3>Yordam</h3>
          <p>Qo'llab-quvvatlash xizmati</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useClientStore } from '../stores'

const clientStore = useClientStore()

onMounted(() => {
  clientStore.fetchStats()
  clientStore.fetchRecentActivities()
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.client-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.welcome-section h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1rem;
}

.welcome-section p {
  font-size: 1.2rem;
  color: #6b7280;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card h3 {
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.card-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.card p {
  color: #6b7280;
  font-size: 0.9rem;
}

.recent-activity {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
}

.recent-activity h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.activity-item:hover {
  background: #f3f4f6;
}

.activity-icon {
  font-size: 1.5rem;
  padding: 0.5rem;
  background: #667eea;
  border-radius: 50%;
  color: white;
  min-width: 3rem;
  text-align: center;
}

.activity-content h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.activity-content p {
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.activity-content small {
  color: #9ca3af;
  font-size: 0.8rem;
}

.quick-actions {
  margin-bottom: 2rem;
}

.quick-actions h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  text-decoration: none;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.action-card p {
  opacity: 0.9;
  font-size: 0.9rem;
}
</style>
