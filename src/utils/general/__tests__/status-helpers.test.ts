import { describe, it, expect } from 'vitest'
import { getStatusBadgeVariant, getStatusColor } from '../status-helpers'

describe('status-helpers', () => {
    describe('getStatusBadgeVariant', () => {
        it('should return correct variant for valid status', () => {
            expect(getStatusBadgeVariant('COMPLETED')).toBe('default')
            expect(getStatusBadgeVariant('PENDING')).toBe('outline')
            expect(getStatusBadgeVariant('CANCELLED')).toBe('destructive')
        })

        it('should return outline for unknown status', () => {
            expect(getStatusBadgeVariant('UNKNOWN')).toBe('outline')
            expect(getStatusBadgeVariant('')).toBe('outline')
        })
    })

    describe('getStatusColor', () => {
        it('should return correct color classes for valid status', () => {
            expect(getStatusColor('COMPLETED')).toBe('text-green-600 bg-green-100')
            expect(getStatusColor('PENDING')).toBe('text-yellow-600 bg-yellow-100')
            expect(getStatusColor('CANCELLED')).toBe('text-red-600 bg-red-100')
        })

        it('should return default color classes for unknown status', () => {
            expect(getStatusColor('UNKNOWN')).toBe('text-gray-600 bg-gray-100')
            expect(getStatusColor('')).toBe('text-gray-600 bg-gray-100')
        })
    })
})