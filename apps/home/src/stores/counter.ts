import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Options API uslubida
export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const message = ref('Salom Pinia!')

  // Getters (computed properties)
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  // Actions
  function increment() {
    count.value++
    console.log('Counter incremented to:', count.value)
  }

  function decrement() {
    count.value--
    console.log('Counter decremented to:', count.value)
  }

  function reset() {
    count.value = 0
    console.log('Counter reset to:', count.value)
  }

  function setMessage(newMessage: string) {
    message.value = newMessage
  }

  return {
    // State
    count,
    message,
    // Getters
    doubleCount,
    isEven,
    // Actions
    increment,
    decrement,
    reset,
    setMessage
  }
})
