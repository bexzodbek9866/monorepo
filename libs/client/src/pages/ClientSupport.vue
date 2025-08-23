<template>
  <div class="client-support">
    <div class="support-header">
      <h1>Qo'llab-quvvatlash</h1>
      <p>Sizga qanday yordam bera olamiz?</p>
    </div>

    <div class="support-content">
      <div class="contact-methods">
        <h2>Biz bilan bog'lanish</h2>
        <div class="contact-grid">
          <div class="contact-card">
            <div class="contact-icon">
              📞
            </div>
            <h3>Telefon</h3>
            <p>+998 90 123 45 67</p>
            <p>Dushanba-Juma: 9:00-18:00</p>
            <button class="contact-btn">
              Qo'ng'iroq qilish
            </button>
          </div>

          <div class="contact-card">
            <div class="contact-icon">
              💬
            </div>
            <h3>Chat</h3>
            <p>Tez yordam olish uchun</p>
            <p>24/7 mavjud</p>
            <button
              class="contact-btn"
              @click="startChat"
            >
              Chat boshlash
            </button>
          </div>

          <div class="contact-card">
            <div class="contact-icon">
              📧
            </div>
            <h3>Email</h3>
            <p>support@company.com</p>
            <p>24 soat ichida javob</p>
            <button class="contact-btn">
              Email yuborish
            </button>
          </div>
        </div>
      </div>

      <div class="support-form">
        <h2>Yordam so'rash</h2>
        <form @submit.prevent="submitSupport">
          <div class="form-group">
            <label for="subject">Mavzu</label>
            <select
              id="subject"
              v-model="supportForm.subject"
              required
            >
              <option value="">
                Mavzuni tanlang
              </option>
              <option value="order">
                Buyurtma bilan bog'liq
              </option>
              <option value="payment">
                To'lov muammosi
              </option>
              <option value="account">
                Hisob sozlamalari
              </option>
              <option value="technical">
                Texnik muammo
              </option>
              <option value="other">
                Boshqa
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="priority">Muhimlik darajasi</label>
            <select
              id="priority"
              v-model="supportForm.priority"
              required
            >
              <option value="">
                Muhimlik darajasini tanlang
              </option>
              <option value="low">
                Past
              </option>
              <option value="medium">
                O'rta
              </option>
              <option value="high">
                Yuqori
              </option>
              <option value="urgent">
                Shoshilinch
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="message">Xabar</label>
            <textarea
              id="message"
              v-model="supportForm.message"
              rows="6"
              placeholder="Muammoingizni batafsil tasvirlab bering..."
              required
            />
          </div>

          <div class="form-group">
            <label for="attachment">Fayl biriktirish (ixtiyoriy)</label>
            <input
              id="attachment"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              @change="handleFileUpload"
            >
            <small>JPG, PNG, PDF, DOC fayllarini yuklash mumkin</small>
          </div>

          <button
            type="submit"
            class="submit-btn"
            :disabled="submitting"
          >
            <span v-if="submitting">Yuborilmoqda...</span>
            <span v-else>Xabar yuborish</span>
          </button>
        </form>
      </div>

      <div class="faq-section">
        <h2>Ko'p so'raladigan savollar</h2>
        <div class="faq-list">
          <div
            v-for="faq in faqs"
            :key="faq.id"
            class="faq-item"
            @click="toggleFaq(faq.id)"
          >
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <span
                class="faq-toggle"
                :class="{ active: faq.isOpen }"
              >+</span>
            </div>
            <div
              v-if="faq.isOpen"
              class="faq-answer"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="my-tickets">
        <h2>Mening so'rovlarim</h2>
        <div
          v-if="clientStore.supportTickets.length === 0"
          class="no-tickets"
        >
          <p>Hali hech qanday so'rov yuborilmagan</p>
        </div>
        <div
          v-else
          class="tickets-list"
        >
          <div
            v-for="ticket in clientStore.supportTickets"
            :key="ticket.id"
            class="ticket-card"
          >
            <div class="ticket-header">
              <div class="ticket-id">
                #{{ ticket.id }}
              </div>
              <div
                class="ticket-status"
                :class="ticket.status"
              >
                {{ getTicketStatusText(ticket.status) }}
              </div>
            </div>
            <div class="ticket-content">
              <h4>{{ ticket.subject }}</h4>
              <p>{{ ticket.message.substring(0, 100) }}...</p>
              <small>{{ formatDate(ticket.createdAt) }}</small>
            </div>
            <div class="ticket-actions">
              <button
                class="view-btn"
                @click="viewTicket(ticket.id)"
              >
                Ko'rish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useClientStore } from '../stores'

const clientStore = useClientStore()

const submitting = ref(false)

const supportForm = reactive({
  subject: '',
  priority: '',
  message: '',
  attachments: [] as File[]
})

const faqs = ref([
  {
    id: 1,
    question: 'Buyurtmamni qanday bekor qila olaman?',
    answer: 'Buyurtmani "Kutilmoqda" statusida bo\'lganda bekor qilish mumkin. Buyurtmalar sahifasiga o\'ting va "Bekor qilish" tugmasini bosing.',
    isOpen: false
  },
  {
    id: 2,
    question: 'To\'lovni qanday qilishim mumkin?',
    answer: 'Biz bank kartalari, PayPal, naqd pul va bank o\'tkazmalarini qabul qilamiz. Barcha to\'lovlar xavfsiz tarzda amalga oshiriladi.',
    isOpen: false
  },
  {
    id: 3,
    question: 'Yetkazib berish qancha vaqt oladi?',
    answer: 'Oddiy yetkazib berish 3-5 ish kuni, tezkor yetkazib berish 1-2 ish kuni davom etadi.',
    isOpen: false
  },
  {
    id: 4,
    question: 'Mahsulotni qaytarish mumkinmi?',
    answer: 'Ha, 30 kun ichida mahsulotni qaytarish mumkin. Mahsulot asl holatida bo\'lishi kerak.',
    isOpen: false
  },
  {
    id: 5,
    question: 'Parolimni unutdim, nima qilishim kerak?',
    answer: 'Kirish sahifasida "Parolni unutdim" tugmasini bosing va ko\'rsatmalarga amal qiling.',
    isOpen: false
  }
])

onMounted(() => {
  clientStore.fetchSupportTickets()
})

const submitSupport = async () => {
  submitting.value = true
  
  try {
    await clientStore.submitSupportRequest({
      subject: supportForm.subject,
      priority: supportForm.priority,
      message: supportForm.message,
      attachments: supportForm.attachments
    })
    
    // Reset form
    Object.assign(supportForm, {
      subject: '',
      priority: '',
      message: '',
      attachments: []
    })
    
    clientStore.addNotification('So\'rov muvaffaqiyatli yuborildi')
  } catch (error) {
    clientStore.addNotification('Xatolik yuz berdi. Qayta urinib ko\'ring.')
  } finally {
    submitting.value = false
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    supportForm.attachments = Array.from(target.files)
  }
}

const startChat = () => {
  clientStore.addNotification('Chat oynasi ochilmoqda...')
  // Open chat widget
}

const toggleFaq = (id: number) => {
  const faq = faqs.value.find(f => f.id === id)
  if (faq) {
    faq.isOpen = !faq.isOpen
  }
}

const getTicketStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    open: 'Ochiq',
    in_progress: 'Jarayonda',
    resolved: 'Hal qilindi',
    closed: 'Yopildi'
  }
  return statusMap[status] || status
}

const viewTicket = (ticketId: number) => {
  clientStore.addNotification(`So'rov #${ticketId} ko'rilmoqda`)
  // Navigate to ticket details
}

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
.client-support {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.support-header {
  text-align: center;
  margin-bottom: 3rem;
}

.support-header h1 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.support-header p {
  color: #6b7280;
  font-size: 1.2rem;
}

.support-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.contact-methods h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.contact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.contact-card p {
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.contact-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: transform 0.3s;
}

.contact-btn:hover {
  transform: translateY(-2px);
}

.support-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.support-form h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group select,
.form-group textarea,
.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group select:focus,
.form-group textarea:focus,
.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group small {
  color: #6b7280;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  background: #059669;
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.faq-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.faq-section h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 2px solid #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.faq-item:hover {
  border-color: #667eea;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.faq-question h3 {
  color: #1f2937;
  font-size: 1rem;
  margin: 0;
}

.faq-toggle {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  transition: transform 0.3s;
}

.faq-toggle.active {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 1rem 1rem;
  border-top: 1px solid #f3f4f6;
}

.faq-answer p {
  color: #6b7280;
  margin: 0.5rem 0 0;
}

.my-tickets {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-tickets h2 {
  color: #1f2937;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #f3f4f6;
  padding-bottom: 0.5rem;
}

.no-tickets {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ticket-card {
  border: 2px solid #f3f4f6;
  border-radius: 8px;
  padding: 1rem;
  transition: border-color 0.3s;
}

.ticket-card:hover {
  border-color: #667eea;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.ticket-id {
  font-weight: 600;
  color: #374151;
}

.ticket-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.ticket-status.open {
  background: #dbeafe;
  color: #1e40af;
}

.ticket-status.in_progress {
  background: #fef3c7;
  color: #92400e;
}

.ticket-status.resolved {
  background: #d1fae5;
  color: #065f46;
}

.ticket-status.closed {
  background: #f3f4f6;
  color: #6b7280;
}

.ticket-content h4 {
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.ticket-content p {
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.ticket-content small {
  color: #9ca3af;
}

.ticket-actions {
  margin-top: 1rem;
}

.view-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.view-btn:hover {
  background: #5a67d8;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
