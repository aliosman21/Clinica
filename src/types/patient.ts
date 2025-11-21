export interface Patient {
    id: string
    name: string
    email: string | null
    phone: string | null
    dateOfBirth: Date | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count?: {
        orders: number
    }
    orders?: Order[]
}

export interface PatientCreateInput {
    name: string
    dateOfBirth: string
    email?: string
    phone?: string
    address?: string
}

export interface PatientUpdateInput {
    id: string
    name?: string
    dateOfBirth?: string
    email?: string
    phone?: string
    address?: string
}

// Forward declaration to avoid circular imports
interface Order {
    id: string
    orderNumber: string
    patientId: string
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
    totalAmount: number
    createdAt: Date
}