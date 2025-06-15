import { describe, it, expect } from 'vitest'

// Helper functions
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR').format(date)
}

function truncateText(text: string, maxLength: number): string {
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

describe('Helper Functions', () => {
  it('should format date', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date)
    expect(result).toContain('2024')
  })

  it('should truncate text', () => {
    expect(truncateText('Hello', 10)).toBe('Hello')
    expect(truncateText('Hello world', 5)).toBe('Hello...')
  })

  it('should validate email', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('invalid')).toBe(false)
  })
}) 