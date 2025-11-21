/**
 * Utility functions for order calculations
 */

export const calculateOrderTotal = (orderItems: any[]) => {
    return orderItems.reduce((total: number, item: any) => {
        return total + (item.labTest.price * item.quantity)
    }, 0)
}

export const calculateEstimatedReadyDate = (createdAt: Date, estimatedReady: number) => {
    return new Date(new Date(createdAt).getTime() + (estimatedReady * 60 * 60 * 1000))
}