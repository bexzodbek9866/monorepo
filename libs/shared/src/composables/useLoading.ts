import { ref, computed } from 'vue'

export interface UseLoadingOptions {
  initialState?: boolean
}

export function useLoading(options: UseLoadingOptions = {}) {
  const { initialState = false } = options
  
  const loading = ref(initialState)
  const loadingCount = ref(0)

  const start = () => {
    loadingCount.value++
    loading.value = true
  }

  const stop = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      loading.value = false
    }
  }

  const toggle = () => {
    if (loading.value) {
      stop()
    } else {
      start()
    }
  }

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    start()
    try {
      return await fn()
    } finally {
      stop()
    }
  }

  return {
    loading: computed(() => loading.value),
    start,
    stop,
    toggle,
    withLoading
  }
}
