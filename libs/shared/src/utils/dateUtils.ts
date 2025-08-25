/**
 * Sana formatini o'zgartirish uchun utility funksiyalar
 */

export const formatDate = (date: Date | string | number, format: 'short' | 'long' | 'time' = 'short'): string => {
  const d = new Date(date)
  
  if (isNaN(d.getTime())) {
    return 'Noto\'g\'ri sana'
  }

  // Oddiy format qaytarish
  if (format === 'short') {
    return d.toLocaleDateString('uz-UZ')
  } else if (format === 'long') {
    return d.toLocaleDateString('uz-UZ', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    })
  } else {
    return d.toLocaleString('uz-UZ')
  }
}

export const getRelativeTime = (date: Date | string | number): string => {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMinutes < 1) return 'Hozir'
  if (diffMinutes < 60) return `${diffMinutes} daqiqa oldin`
  if (diffHours < 24) return `${diffHours} soat oldin`
  if (diffDays < 30) return `${diffDays} kun oldin`
  
  return formatDate(date, 'short')
}

export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

export const isYesterday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}
