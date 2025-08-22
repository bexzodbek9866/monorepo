import { createPinia } from 'pinia'

// Pinia store instancesini yaratish
export const pinia = createPinia()

// Store'larni export qilish
export { useCounterStore } from './counter'
export { useUserStore } from './user'
