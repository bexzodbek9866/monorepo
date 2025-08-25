/**
 * String bilan ishlash uchun utility funksiyalar
 */

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const truncate = (str: string, length = 50, suffix = '...'): string => {
  if (str.length <= length) return str
  return str.substring(0, length) + suffix
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const generateId = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const formatCurrency = (amount: number, currency = 'UZS'): string => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('uz-UZ').format(num)
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  // O'zbekiston telefon raqami formati: +998901234567
  const phoneRegex = /^\+998[0-9]{9}$/
  return phoneRegex.test(phone.replace(/[\s-]/g, ''))
}

export const cleanPhone = (phone: string): string => {
  // Telefon raqamini tozalash va formatlash
  const cleaned = phone.replace(/[^\d+]/g, '')
  if (cleaned.startsWith('998')) {
    return '+' + cleaned
  }
  if (cleaned.startsWith('8') && cleaned.length === 9) {
    return '+998' + cleaned.slice(1)
  }
  return cleaned
}
