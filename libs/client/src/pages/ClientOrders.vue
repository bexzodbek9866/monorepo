<template>
  <div class="client-orders">
    <div class="orders-header">
      <h1>Mening Buyurtmalarim</h1>
      <button
        class="new-order-btn"
        @click="createNewOrder"
      >
        + Yangi buyurtma
      </button>
    </div>

    <div class="orders-filters">
      <div class="filter-group">
        <label>Status bo'yicha filtr:</label>
        <select
          v-model="selectedStatus"
          @change="filterOrders"
        >
          <option value="">
            Barcha statuslar
          </option>
          <option value="pending">
            Kutilmoqda
          </option>
          <option value="processing">
            Jarayonda
          </option>
          <option value="shipped">
            Yuborildi
          </option>
          <option value="delivered">
            Yetkazildi
          </option>
          <option value="cancelled">
            Bekor qilindi
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Sana bo'yicha:</label>
        <input
          v-model="dateFilter"
          type="date"
          @change="filterOrders"
        >
      </div>
    </div>

    <div class="orders-list">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="order-card"
      >
        <div class="order-header">
          <div class="order-id">
            <strong>Buyurtma #{{ order.id }}</strong>
          </div>
          <div class="order-date">
            {{ formatDate(order.date) }}
          </div>
          <div
            class="order-status"
            :class="order.status"
          >
            {{ getStatusText(order.status) }}
          </div>
        </div>

        <div class="order-items">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="order-item"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              class="item-image"
            >
            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p>Miqdor: {{ item.quantity }}</p>
              <p>Narx: ${{ item.price }}</p>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-total">
            <strong>Jami: ${{ order.total }}</strong>
          </div>
          <div class="order-actions">
            <button
              v-if="order.status === 'pending'"
              class="cancel-btn"
              @click="cancelOrder(order.id)"
            >
              Bekor qilish
            </button>
            <button
              class="details-btn"
              @click="viewOrderDetails(order.id)"
            >
              Batafsil
            </button>
            <button
              v-if="order.status === 'delivered'"
              class="reorder-btn"
              @click="reorder(order.id)"
            >
              Qayta buyurtma berish
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="filteredOrders.length === 0"
      class="no-orders"
    >
      <div class="no-orders-icon">
        📦
      </div>
      <h3>Buyurtmalar topilmadi</h3>
      <p>Hali hech qanday buyurtma yo'q yoki filterga mos keluvchi buyurtma topilmadi.</p>
      <button
        class="new-order-btn"
        @click="createNewOrder"
      >
        Birinchi buyurtmani bering
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useClientStore } from '../stores'

const clientStore = useClientStore()

const selectedStatus = ref('')
const dateFilter = ref('')

const filteredOrders = computed(() => {
  let orders = clientStore.orders
  
  if (selectedStatus.value) {
    orders = orders.filter(order => order.status === selectedStatus.value)
  }
  
  if (dateFilter.value) {
    const filterDate = new Date(dateFilter.value)
    orders = orders.filter(order => {
      const orderDate = new Date(order.date)
      return orderDate.toDateString() === filterDate.toDateString()
    })
  }
  
  return orders
})

onMounted(() => {
  clientStore.fetchOrders()
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

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: 'Kutilmoqda',
    processing: 'Jarayonda',
    shipped: 'Yuborildi',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi'
  }
  return statusMap[status] || status
}

const filterOrders = () => {
  // Filter functionality is handled by computed property
}

const createNewOrder = () => {
  clientStore.addNotification('Yangi buyurtma sahifasiga o\'tilmoqda...')
  // Navigate to create order page
}

const cancelOrder = (orderId: number) => {
  if (confirm('Buyurtmani bekor qilishni xohlaysizmi?')) {
    clientStore.cancelOrder(orderId)
    clientStore.addNotification('Buyurtma bekor qilindi')
  }
}

const viewOrderDetails = (orderId: number) => {
  clientStore.addNotification(`Buyurtma #${orderId} batafsil ma'lumotlari`)
  // Navigate to order details page
}

const reorder = (orderId: number) => {
  clientStore.reorderItems(orderId)
  clientStore.addNotification('Buyurtma qayta berildi')
}
</script>

<style scoped>
.client-orders {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.orders-header h1 {
  font-size: 2.5rem;
  color: #1f2937;
}

.new-order-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.new-order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.orders-filters {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.filter-group select,
.filter-group input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  min-width: 200px;
  transition: border-color 0.3s;
}

.filter-group select:focus,
.filter-group input:focus {
  outline: none;
  border-color: #667eea;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
}

.order-id {
  font-size: 1.1rem;
  color: #1f2937;
}

.order-date {
  color: #6b7280;
  font-size: 0.9rem;
}

.order-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.order-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.order-status.processing {
  background: #dbeafe;
  color: #1e40af;
}

.order-status.shipped {
  background: #e0e7ff;
  color: #5b21b6;
}

.order-status.delivered {
  background: #d1fae5;
  color: #065f46;
}

.order-status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.order-items {
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details h4 {
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.item-details p {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 2px solid #f3f4f6;
}

.order-total {
  font-size: 1.2rem;
  color: #1f2937;
}

.order-actions {
  display: flex;
  gap: 0.5rem;
}

.cancel-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background: #dc2626;
}

.details-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.details-btn:hover {
  background: #5b6779;
}

.reorder-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.reorder-btn:hover {
  background: #059669;
}

.no-orders {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.no-orders-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-orders h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.no-orders p {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .orders-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .orders-filters {
    flex-direction: column;
  }

  .order-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .order-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .order-actions {
    justify-content: center;
  }
}
</style>
