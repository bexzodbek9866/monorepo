import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const userCount = computed(() => users.value.length)
  const isLoggedIn = computed(() => currentUser.value !== null)

  // Actions
  async function fetchUsers() {
    loading.value = true
    error.value = null
    
    try {
      // API chaqiruvi simulyatsiyasi
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data
      users.value = [
        { id: 1, name: 'Ahmad Aliyev', email: 'ahmad@example.com' },
        { id: 2, name: 'Fatima Karimova', email: 'fatima@example.com' },
        { id: 3, name: 'Bobur Usmanov', email: 'bobur@example.com' }
      ]
    } catch (err) {
      error.value = 'Foydalanuvchilarni yuklab olishda xatolik'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function setCurrentUser(user: User) {
    currentUser.value = user
  }

  function logout() {
    currentUser.value = null
  }

  function addUser(user: Omit<User, 'id'>) {
    const newUser: User = {
      ...user,
      id: Math.max(...users.value.map(u => u.id), 0) + 1
    }
    users.value.push(newUser)
  }

  function removeUser(userId: number) {
    const index = users.value.findIndex(user => user.id === userId)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }

  return {
    // State
    users,
    currentUser,
    loading,
    error,
    // Getters
    userCount,
    isLoggedIn,
    // Actions
    fetchUsers,
    setCurrentUser,
    logout,
    addUser,
    removeUser
  }
})
