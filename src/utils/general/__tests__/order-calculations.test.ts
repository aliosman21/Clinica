import { describe, it, expect } from 'vitest'
import { calculateOrderTotal, calculateEstimatedReadyDate } from '../order-calculations'

describe('order-calculations', () => {
    describe('calculateOrderTotal', () => {
        it('should calculate total for multiple order items', () => {
            const orderItems = [
                { labTest: { price: 50 }, quantity: 2 },
                { labTest: { price: 100 }, quantity: 1 },
                { labTest: { price: 25 }, quantity: 3 }
            ]
            expect(calculateOrderTotal(orderItems)).toBe(275) // (50*2) + (100*1) + (25*3)
        })

        it('should return zero for empty order items', () => {
            expect(calculateOrderTotal([])).toBe(0)
        })
    })

    describe('calculateEstimatedReadyDate', () => {
        it('should add estimated hours to created date', () => {
            const createdAt = new Date('2024-01-01T10:00:00Z')
            const estimatedReady = 24 // 24 hours
            const result = calculateEstimatedReadyDate(createdAt, estimatedReady)

            expect(result.getTime()).toBe(new Date('2024-01-02T10:00:00Z').getTime())
        })

        it('should handle partial hours correctly', () => {
            const createdAt = new Date('2024-01-01T12:00:00Z')
            const estimatedReady = 2.5 // 2.5 hours
            const result = calculateEstimatedReadyDate(createdAt, estimatedReady)

            expect(result.getTime()).toBe(new Date('2024-01-01T14:30:00Z').getTime())
        })
    })
})