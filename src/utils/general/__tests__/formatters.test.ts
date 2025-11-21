import { describe, it, expect } from 'vitest'
import {
    formatCurrency,
    formatDate,
    formatDateWithTime,
    formatDateForInput,
    calculateAge
} from '../formatters'

describe('formatters', () => {
    describe('formatCurrency', () => {
        it('should format positive amounts correctly', () => {
            expect(formatCurrency(100)).toBe('$100.00')
            expect(formatCurrency(1234.56)).toBe('$1,234.56')
        })

        it('should handle zero and decimal amounts', () => {
            expect(formatCurrency(0)).toBe('$0.00')
            expect(formatCurrency(0.99)).toBe('$0.99')
        })
    })

    describe('formatDate', () => {
        it('should format valid dates correctly', () => {
            const date = new Date('2024-01-15T10:00:00Z')
            expect(formatDate(date)).toBe('January 15, 2024')
            expect(formatDate('2024-12-25')).toBe('December 25, 2024')
        })

        it('should handle null and empty values', () => {
            expect(formatDate(null)).toBe('Not provided')
            expect(formatDate('')).toBe('Not provided')
        })
    })

    describe('formatDateWithTime', () => {
        it('should format dates with time correctly', () => {
            const date = new Date('2024-01-15T14:30:00Z')
            const result = formatDateWithTime(date)
            expect(result).toMatch(/January 15, 2024/)
            expect(result).toMatch(/January 15, 2024 at 04:30 PM/)
        })

        it('should handle null values', () => {
            expect(formatDateWithTime(null)).toBe('Not set')
            expect(formatDateWithTime('')).toBe('Not set')
        })
    })

    describe('formatDateForInput', () => {
        it('should format date for HTML input', () => {
            const date = new Date('2024-01-15T10:00:00Z')
            expect(formatDateForInput(date)).toBe('2024-01-15')
        })

        it('should return empty string for null date', () => {
            expect(formatDateForInput(null)).toBe('')
        })
    })

    describe('calculateAge', () => {
        it('should calculate age correctly', () => {
            const birthDate = new Date('1990-01-01')
            const age = calculateAge(birthDate)
            expect(typeof age).toBe('number')
            expect(age).toBeGreaterThan(30)
        })

        it('should handle null birth date', () => {
            expect(calculateAge(null)).toBe('Unknown')
        })
    })
})