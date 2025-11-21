import { ReactNode } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { cn } from '~/lib/utils'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export interface TableColumn<T = any> {
    key: string
    header: string
    accessor?: keyof T
    render?: (item: T, index: number) => ReactNode
    className?: string
    headerClassName?: string
    sortable?: boolean
}

export interface PaginationInfo {
    total: number
    limit: number
    offset: number
    hasMore: boolean
}

export interface CustomTableProps<T = any> {
    data: T[]
    columns: TableColumn<T>[]
    pagination?: PaginationInfo
    onPageChange?: (offset: number) => void
    onPageSizeChange?: (limit: number) => void
    loading?: boolean
    emptyMessage?: string
    className?: string
    onRowClick?: (item: T, index: number) => void
    actions?: (item: T, index: number) => ReactNode
}

export function CustomTable<T = any>({
    data,
    columns,
    pagination,
    onPageChange,
    onPageSizeChange,
    loading = false,
    emptyMessage = "No data available",
    className,
    onRowClick,
    actions,
}: CustomTableProps<T>) {
    const currentPage = pagination ? Math.floor(pagination.offset / pagination.limit) + 1 : 1
    const totalPages = pagination ? Math.ceil(pagination.total / pagination.limit) : 1
    const pageSizes = [5, 10, 25, 50]

    const handlePageChange = (page: number) => {
        if (pagination && onPageChange) {
            const newOffset = (page - 1) * pagination.limit
            onPageChange(newOffset)
        }
    }

    const handlePageSizeChange = (size: string) => {
        if (onPageSizeChange) {
            onPageSizeChange(parseInt(size))
        }
    }

    // Add actions column if actions prop is provided
    const displayColumns = actions
        ? [...columns, { key: 'actions', header: 'Actions', className: 'w-[100px]' }]
        : columns

    return (
        <div className={cn("space-y-4", className)}>
            {/* Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {displayColumns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={cn(column.headerClassName, column.className)}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={displayColumns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                        <span className="ml-2">Loading...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={displayColumns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className={cn(
                                        onRowClick && "cursor-pointer hover:bg-muted/50"
                                    )}
                                    onClick={() => onRowClick?.(item, index)}
                                >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            className={column.className}
                                        >
                                            {column.render
                                                ? column.render(item, index)
                                                : column.accessor
                                                    ? String(item[column.accessor] || '-')
                                                    : '-'
                                            }
                                        </TableCell>
                                    ))}
                                    {actions && (
                                        <TableCell className="w-[100px]">
                                            {actions(item, index)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={String(pagination.limit)}
                            onValueChange={handlePageSizeChange}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {pageSizes.map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage <= 1}
                            >
                                <span className="sr-only">Go to first page</span>
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage >= totalPages}
                            >
                                <span className="sr-only">Go to last page</span>
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        {pagination.total > 0 && (
                            <>
                                Showing {pagination.offset + 1} to{' '}
                                {Math.min(pagination.offset + pagination.limit, pagination.total)} of{' '}
                                {pagination.total} entries
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CustomTable