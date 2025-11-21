export interface PaginationInfo {
    total: number
    limit: number
    offset: number
    currentPage: number
    totalPages: number
    hasMore: boolean
}

export interface TableColumn<T = any> {
    key: string
    header: string
    accessor?: keyof T
    render?: (item: T, index: number) => React.ReactNode
    className?: string
    headerClassName?: string
    sortable?: boolean
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface User {
    email: string
}

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
}