import type { OrderStatus } from '~/types'

/**
 * Utility functions for order and patient status handling
 */

export const getStatusBadgeVariant = (status: OrderStatus | string) => {
    switch (status) {
        case 'COMPLETED':
            return 'default'
        case 'PENDING':
            return 'outline'
        case 'CANCELLED':
            return 'destructive'
        default:
            return 'outline'
    }
}

export const getStatusColor = (status: OrderStatus | string) => {
    switch (status) {
        case 'COMPLETED':
            return 'text-green-600 bg-green-100'
        case 'PENDING':
            return 'text-yellow-600 bg-yellow-100'
        case 'CANCELLED':
            return 'text-red-600 bg-red-100'
        default:
            return 'text-gray-600 bg-gray-100'
    }
}