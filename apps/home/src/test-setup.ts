import { config } from '@vue/test-utils'
import { Quasar, Notify } from 'quasar'

// Quasar komponentlarini global registratsiya qilamiz
config.global.plugins = [
  [
    Quasar,
    {
      plugins: {
        Notify
      }
    }
  ]
]

// DOM APIs ni mock qilamiz
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {
      // Mock implementation
    },
    removeListener: () => {
      // Mock implementation
    },
    addEventListener: () => {
      // Mock implementation
    },
    removeEventListener: () => {
      // Mock implementation
    },
    dispatchEvent: () => {
      // Mock implementation
    },
  }),
})

// ResizeObserver mock - type assertion bilan
declare global {
  interface GlobalThis {
    ResizeObserver: typeof ResizeObserver
  }
}

globalThis.ResizeObserver = class MockResizeObserver {
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
}
