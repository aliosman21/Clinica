import { useState, useEffect, useCallback } from 'react'

export interface PaginationInfo {
    total: number
    limit: number
    offset: number
    currentPage: number
    totalPages: number
    hasMore: boolean
}

export interface UsePaginationProps {
    initialLimit?: number
    dependencies?: any[]
}

export function usePagination({ initialLimit = 5, dependencies = [] }: UsePaginationProps = {}) {
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(initialLimit)
    const [total, setTotal] = useState(0)

    // Reset to page 1 when dependencies change (like search terms)
    useEffect(() => {
        setCurrentPage(1)
    }, dependencies)

    // Calculate derived values
    const offset = (currentPage - 1) * limit
    const totalPages = Math.ceil(total / limit)
    const hasMore = offset + limit < total

    const pagination: PaginationInfo = {
        limit,
        offset,
        total,
        currentPage,
        totalPages,
        hasMore
    }

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page)
    }, [])

    const handlePageSizeChange = useCallback((newLimit: number) => {
        setLimit(newLimit)
        setCurrentPage(1) // Reset to page 1 when changing page size
    }, [])

    const updateTotal = useCallback((newTotal: number) => {
        setTotal(newTotal)
    }, [])

    return {
        pagination,
        handlePageChange,
        handlePageSizeChange,
        updateTotal
    }
}