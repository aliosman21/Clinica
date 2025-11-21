export interface LabTest {
    id: string
    code: string
    name: string
    description?: string | null
    price: number
    turnaroundHours: number
    sampleType?: string
    preparationInstructions?: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    orderItems?: OrderItem[]
}

export interface LabTestCreateInput {
    code: string
    name: string
    description?: string
    price: number
    turnaroundHours: number
    sampleType?: string
    preparationInstructions?: string
    isActive?: boolean
}

export interface LabTestUpdateInput {
    id: string
    code?: string
    name?: string
    description?: string
    price?: number
    turnaroundHours?: number
    sampleType?: string
    preparationInstructions?: string
    isActive?: boolean
}

// Import OrderItem to avoid circular dependency
import type { OrderItem } from './order'