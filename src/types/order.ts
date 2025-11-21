export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED'

export interface Order {
    id: string
    orderNumber: string
    patientId: string
    status: OrderStatus
    totalCost: number
    estimatedReady: Date | null
    actualReady: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    patient: {
        id: string
        name: string
        email: string | null
        phone: string | null
        dateOfBirth?: Date
        address?: string | null
        city?: string | null
        state?: string | null
        zipCode?: string | null
    }
    orderItems: OrderItem[]
    _count?: {
        orderItems: number
    }
}

export interface OrderItem {
    id: string
    orderId: string
    labTestId: string
    quantity: number
    unitPrice: number
    labTest: {
        id: string
        code: string
        name: string
        description?: string | null
        price?: number
        turnaroundHours?: number
        sampleType?: string
        preparationInstructions?: string | null
    }
}

export interface OrderCreateInput {
    patientId: string
    orderItems: Array<{
        labTestId: string
        quantity: number
    }>
    notes?: string
    estimatedReady?: number // hours
}

export interface OrderUpdateInput {
    id: string
    status?: OrderStatus
    notes?: string
    estimatedReady?: Date
    actualReady?: Date
}

export interface OrderFilters {
    limit?: number
    offset?: number
    orderNumber?: string
    patientName?: string
    status?: OrderStatus | string
}

export interface OrdersResponse {
    orders: Order[]
    pagination: {
        total: number
        limit: number
        offset: number
        hasMore: boolean
    }
}