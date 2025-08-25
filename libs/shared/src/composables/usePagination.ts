import { ref, computed, watch } from 'vue'

export interface PaginationOptions {
  initialPage?: number
  initialPerPage?: number
  total?: number
}

export function usePagination(options: PaginationOptions = {}) {
  const { 
    initialPage = 1, 
    initialPerPage = 10, 
    total: initialTotal = 0 
  } = options

  const currentPage = ref(initialPage)
  const perPage = ref(initialPerPage)
  const total = ref(initialTotal)

  const totalPages = computed(() => {
    return Math.ceil(total.value / perPage.value)
  })

  const offset = computed(() => {
    return (currentPage.value - 1) * perPage.value
  })

  const hasNextPage = computed(() => {
    return currentPage.value < totalPages.value
  })

  const hasPreviousPage = computed(() => {
    return currentPage.value > 1
  })

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  const reset = () => {
    currentPage.value = 1
  }

  const setTotal = (newTotal: number) => {
    total.value = newTotal
    // Agar joriy sahifa umumiy sahifalar sonidan ko'p bo'lsa, oxirgi sahifaga o'tish
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    }
  }

  // perPage o'zgarganda sahifani qayta hisoblash
  watch(perPage, () => {
    const newTotalPages = Math.ceil(total.value / perPage.value)
    if (currentPage.value > newTotalPages && newTotalPages > 0) {
      currentPage.value = newTotalPages
    }
  })

  return {
    currentPage,
    perPage,
    total,
    totalPages,
    offset,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    reset,
    setTotal
  }
}
