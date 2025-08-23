<template>
  <div class="client-profile">
    <div class="profile-header">
      <h1>Mening Profilim</h1>
      <p>Shaxsiy ma'lumotlaringizni ko'ring va tahrirlang</p>
    </div>

    <div class="profile-content">
      <div class="profile-card">
        <div class="profile-avatar">
          <img
            v-if="clientStore.currentClient?.avatar"
            :src="clientStore.currentClient.avatar"
            :alt="clientStore.currentClient.name"
          >
          <div
            v-else
            class="default-avatar"
          >
            {{ getInitials(clientStore.currentClient?.name || '') }}
          </div>
          <button class="upload-btn">
            Rasm yuklash
          </button>
        </div>

        <div class="profile-info">
          <div class="info-group">
            <label>To'liq ism</label>
            <input
              v-model="profileForm.name"
              type="text"
              :disabled="!isEditing"
            >
          </div>

          <div class="info-group">
            <label>Email</label>
            <input
              v-model="profileForm.email"
              type="email"
              :disabled="!isEditing"
            >
          </div>

          <div class="info-group">
            <label>Telefon raqam</label>
            <input
              v-model="profileForm.phone"
              type="tel"
              :disabled="!isEditing"
            >
          </div>

          <div class="info-group">
            <label>Manzil</label>
            <textarea
              v-model="profileForm.address"
              :disabled="!isEditing"
              rows="3"
            />
          </div>

          <div class="info-group">
            <label>Tug'ilgan sana</label>
            <input
              v-model="profileForm.birthDate"
              type="date"
              :disabled="!isEditing"
            >
          </div>

          <div class="profile-actions">
            <button
              v-if="!isEditing"
              class="edit-btn"
              @click="startEditing"
            >
              Tahrirlash
            </button>
            <template v-else>
              <button
                class="save-btn"
                @click="saveProfile"
              >
                Saqlash
              </button>
              <button
                class="cancel-btn"
                @click="cancelEditing"
              >
                Bekor qilish
              </button>
            </template>
          </div>
        </div>
      </div>

      <div class="profile-stats">
        <h2>Statistika</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">
              {{ clientStore.stats.totalOrders }}
            </div>
            <div class="stat-label">
              Jami buyurtmalar
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              ${{ clientStore.stats.totalSpent }}
            </div>
            <div class="stat-label">
              Jami xaridlar
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              {{ clientStore.stats.bonusPoints }}
            </div>
            <div class="stat-label">
              Bonus ballari
            </div>
          </div>
        </div>
      </div>

      <div class="account-settings">
        <h2>Hisob sozlamalari</h2>
        <div class="settings-list">
          <div class="setting-item">
            <label>Email bildirishnomalar</label>
            <input
              v-model="settings.emailNotifications"
              type="checkbox"
            >
          </div>
          <div class="setting-item">
            <label>SMS bildirishnomalar</label>
            <input
              v-model="settings.smsNotifications"
              type="checkbox"
            >
          </div>
          <div class="setting-item">
            <label>Marketing xabarlari</label>
            <input
              v-model="settings.marketingEmails"
              type="checkbox"
            >
          </div>
        </div>
        <button
          class="save-settings-btn"
          @click="saveSettings"
        >
          Sozlamalarni saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useClientStore } from '../stores'

const clientStore = useClientStore()

const isEditing = ref(false)

const profileForm = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  birthDate: ''
})

const settings = reactive({
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: false
})

onMounted(() => {
  if (clientStore.currentClient) {
    Object.assign(profileForm, {
      name: clientStore.currentClient.name,
      email: clientStore.currentClient.email,
      phone: clientStore.currentClient.phone || '',
      address: clientStore.currentClient.address || '',
      birthDate: clientStore.currentClient.birthDate || ''
    })
  }
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

const startEditing = () => {
  isEditing.value = true
}

const saveProfile = () => {
  clientStore.updateProfile(profileForm)
  isEditing.value = false
  clientStore.addNotification('Profil muvaffaqiyatli yangilandi')
}

const cancelEditing = () => {
  isEditing.value = false
  // Restore original values
  if (clientStore.currentClient) {
    Object.assign(profileForm, {
      name: clientStore.currentClient.name,
      email: clientStore.currentClient.email,
      phone: clientStore.currentClient.phone || '',
      address: clientStore.currentClient.address || '',
      birthDate: clientStore.currentClient.birthDate || ''
    })
  }
}

const saveSettings = () => {
  clientStore.updateSettings(settings)
  clientStore.addNotification('Sozlamalar saqlandi')
}
</script>

<style scoped>
.client-profile {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-header h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.profile-header p {
  color: #6b7280;
  font-size: 1.1rem;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: start;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-avatar img,
.default-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.default-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
}

.upload-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background: #5a67d8;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.info-group input,
.info-group textarea {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.info-group input:focus,
.info-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.info-group input:disabled,
.info-group textarea:disabled {
  background: #f9fafb;
  color: #6b7280;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.edit-btn, .save-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.edit-btn:hover, .save-btn:hover {
  background: #5a67d8;
}

.cancel-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background: #5b6779;
}

.profile-stats {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.profile-stats h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.9rem;
}

.account-settings {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.account-settings h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.setting-item label {
  font-weight: 500;
  color: #374151;
}

.setting-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #667eea;
}

.save-settings-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.save-settings-btn:hover {
  background: #059669;
}

@media (max-width: 768px) {
  .profile-card {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
