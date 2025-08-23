import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface ClientUser {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  birthDate?: string
  avatar?: string
  joinDate: Date
  status: 'active' | 'inactive'
}

interface ClientStats {
  totalOrders: number
  activeOrders: number
  totalSpent: number
  bonusPoints: number
}

interface Order {
  id: number
  date: Date
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  total: number
}

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  image?: string
}

interface Activity {
  id: number
  title: string
  description: string
  date: Date
  type: 'order' | 'payment' | 'delivery' | 'support'
}

interface SupportTicket {
  id: number
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  createdAt: Date
  updatedAt: Date
}

interface ClientSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
}

interface SupportRequest {
  subject: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  message: string
  attachments: File[]
}

export const useClientStore = defineStore('client', () => {
  // State
  const currentClient = ref<ClientUser | null>(null)
  const stats = ref<ClientStats>({
    totalOrders: 0,
    activeOrders: 0,
    totalSpent: 0,
    bonusPoints: 0
  })
  const orders = ref<Order[]>([])
  const recentActivities = ref<Activity[]>([])
  const supportTickets = ref<SupportTicket[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const notifications = ref<string[]>([])

  // Getters
  const isLoggedIn = computed(() => currentClient.value !== null)
  const hasNotifications = computed(() => notifications.value.length > 0)
  const totalOrderValue = computed(() => 
    orders.value.reduce((sum, order) => sum + order.total, 0)
  )
  const pendingOrders = computed(() => 
    orders.value.filter(order => order.status === 'pending')
  )
  const completedOrders = computed(() => 
    orders.value.filter(order => order.status === 'delivered')
  )

  // Actions
  async function fetchStats() {
    loading.value = true
    error.value = null
    
    try {
      // API simulyatsiyasi
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      stats.value = {
        totalOrders: 25,
        activeOrders: 3,
        totalSpent: 1580,
        bonusPoints: 450
      }
      
      console.log('Client stats fetched:', stats.value)
    } catch (err) {
      error.value = 'Statistikalarni yuklashda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchOrders() {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      orders.value = [
        {
          id: 1001,
          date: new Date(),
          status: 'pending',
          items: [
            {
              id: 1,
              name: 'Wireless Headphones',
              quantity: 1,
              price: 89.99,
              image: '/images/headphones.jpg'
            }
          ],
          total: 89.99
        },
        {
          id: 1002,
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: 'shipped',
          items: [
            {
              id: 2,
              name: 'Smartphone Case',
              quantity: 2,
              price: 19.99,
              image: '/images/case.jpg'
            }
          ],
          total: 39.98
        },
        {
          id: 1003,
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: 'delivered',
          items: [
            {
              id: 3,
              name: 'USB Cable',
              quantity: 3,
              price: 9.99,
              image: '/images/cable.jpg'
            }
          ],
          total: 29.97
        }
      ]
      
      console.log('Orders fetched:', orders.value.length)
    } catch (err) {
      error.value = 'Buyurtmalarni yuklashda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchRecentActivities() {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      recentActivities.value = [
        {
          id: 1,
          title: 'Yangi buyurtma berdi',
          description: 'Wireless Headphones buyurtma qilindi',
          date: new Date(),
          type: 'order'
        },
        {
          id: 2,
          title: 'To\'lov amalga oshirildi',
          description: 'Buyurtma #1002 uchun to\'lov qabul qilindi',
          date: new Date(Date.now() - 12 * 60 * 60 * 1000),
          type: 'payment'
        },
        {
          id: 3,
          title: 'Buyurtma yetkazildi',
          description: 'USB Cable buyurtmasi muvaffaqiyatli yetkazildi',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          type: 'delivery'
        }
      ]
      
      console.log('Recent activities fetched:', recentActivities.value.length)
    } catch (err) {
      error.value = 'Faoliyat tarixini yuklashda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchSupportTickets() {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      supportTickets.value = [
        {
          id: 2001,
          subject: 'Buyurtma bilan bog\'liq savol',
          message: 'Mening buyurtmam qachon yetkaziladi?',
          priority: 'medium',
          status: 'in_progress',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      ]
      
      console.log('Support tickets fetched:', supportTickets.value.length)
    } catch (err) {
      error.value = 'Yordam so\'rovlarini yuklashda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function setCurrentClient(client: ClientUser) {
    currentClient.value = client
    console.log('Current client set:', client.name)
  }

  function logout() {
    currentClient.value = null
    notifications.value = []
    orders.value = []
    recentActivities.value = []
    supportTickets.value = []
    console.log('Client logged out')
  }

  async function updateProfile(profileData: Partial<ClientUser>) {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      if (currentClient.value) {
        Object.assign(currentClient.value, profileData)
        console.log('Profile updated:', profileData)
      }
    } catch (err) {
      error.value = 'Profilni yangilashda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function updateSettings(settings: ClientSettings) {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      console.log('Settings updated:', settings)
    } catch (err) {
      error.value = 'Sozlamalarni saqlashda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function cancelOrder(orderId: number) {
    const order = orders.value.find(o => o.id === orderId)
    if (order && order.status === 'pending') {
      order.status = 'cancelled'
      addNotification(`Buyurtma #${orderId} bekor qilindi`)
      console.log('Order cancelled:', orderId)
    }
  }

  function reorderItems(orderId: number) {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      // Create new order with same items
      const newOrder: Order = {
        id: Math.max(...orders.value.map(o => o.id)) + 1,
        date: new Date(),
        status: 'pending',
        items: [...order.items],
        total: order.total
      }
      orders.value.unshift(newOrder)
      addNotification('Buyurtma qayta berildi')
      console.log('Reorder created:', newOrder.id)
    }
  }

  async function submitSupportRequest(request: SupportRequest) {
    loading.value = true
    error.value = null
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newTicket: SupportTicket = {
        id: Math.max(...supportTickets.value.map(t => t.id), 2000) + 1,
        subject: request.subject,
        message: request.message,
        priority: request.priority,
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      supportTickets.value.unshift(newTicket)
      console.log('Support request submitted:', newTicket.id)
    } catch (err) {
      error.value = 'So\'rov yuborishda xatolik'
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  function addNotification(message: string) {
    notifications.value.unshift(message)
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(message)
    }, 5000)
  }

  function removeNotification(message: string) {
    const index = notifications.value.indexOf(message)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function clearAllNotifications() {
    notifications.value = []
  }

  // Initialize demo client
  function initializeDemoClient() {
    setCurrentClient({
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+998 90 123 45 67',
      address: 'Toshkent sh., Yunusobod t., 1-uy',
      birthDate: '1990-05-15',
      joinDate: new Date(2023, 0, 15),
      status: 'active'
    })
  }

  return {
    // State
    currentClient,
    stats,
    orders,
    recentActivities,
    supportTickets,
    loading,
    error,
    notifications,
    // Getters
    isLoggedIn,
    hasNotifications,
    totalOrderValue,
    pendingOrders,
    completedOrders,
    // Actions
    fetchStats,
    fetchOrders,
    fetchRecentActivities,
    fetchSupportTickets,
    setCurrentClient,
    logout,
    updateProfile,
    updateSettings,
    cancelOrder,
    reorderItems,
    submitSupportRequest,
    addNotification,
    removeNotification,
    clearAllNotifications,
    initializeDemoClient
  }
})
