import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { CustomTable } from '~/components/Representations/CustomTable'
import { CustomTextInput } from '~/components/Inputs/CustomTextInput'
import { CustomSelect } from '~/components/Inputs/CustomSelect'
import { ConfirmDialog } from '~/components/Representations/ConfirmDialog'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { getOrders } from '~/server/orders/get-orders'
import { deleteOrder } from '~/server/orders/delete-order'
import { useDebounce } from '~/hooks/useDebounce'
import { Trash2, Eye, Plus, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency } from '~/utils/general/formatters'
import { getStatusBadgeVariant } from '~/utils/general/status-helpers'
import { usePagination } from '~/hooks/usePagination'
import { useConfirmDialog } from '~/hooks/useConfirmDialog'
import type { Order, TableColumn } from '~/types'



const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' },
]

export const Route = createFileRoute('/_authed/orders/')({
    component: OrdersPage,
})

function OrdersPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchTerm, setSearchTerm] = useState('')
    const [patientSearch, setPatientSearch] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const debouncedPatientSearch = useDebounce(patientSearch, 500)
    const { pagination, handlePageChange, handlePageSizeChange, updateTotal } = usePagination({
        initialLimit: 5,
        dependencies: [debouncedSearchTerm, debouncedPatientSearch, selectedStatus]
    })
    const { dialogState, openDialog, closeDialog, handleConfirm } = useConfirmDialog()

    // Server functions
    const getOrdersFn = useServerFn(getOrders)
    const deleteOrderFn = useServerFn(deleteOrder)

    // Query for orders
    const {
        data: ordersData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['orders', pagination.limit, pagination.offset, debouncedSearchTerm, debouncedPatientSearch, selectedStatus],
        queryFn: () => getOrdersFn({
            data: {
                limit: pagination.limit,
                offset: pagination.offset,
                orderNumber: debouncedSearchTerm || undefined,
                patientName: debouncedPatientSearch || undefined,
                status: selectedStatus as any || undefined
            }
        }),
        staleTime: 30000, // 30 seconds
    })

    // Update total when data is fetched
    useEffect(() => {
        if (ordersData?.pagination?.total !== undefined) {
            updateTotal(ordersData.pagination.total)
        }
    }, [ordersData?.pagination?.total, updateTotal])



    // Mutation for deleting orders
    const deleteOrderMutation = useMutation({
        mutationFn: (id: string) => deleteOrderFn({ data: { id } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            toast.success('Order deleted successfully')
            closeDialog()
        },
        onError: (error) => {
            toast.error('Error deleting order: ' + (error as Error).message)
            closeDialog()
        }
    })

    const handleOrderNumberSearch = (term: string) => {
        setSearchTerm(term)
    }

    const handlePatientNameSearch = (term: string) => {
        setPatientSearch(term)
    }

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status)
    }



    const handleDeleteOrder = (orderId: string) => {
        openDialog({
            title: 'Delete Order',
            description: 'Are you sure you want to delete this order? This action cannot be undone.',
            id: orderId,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            variant: 'destructive',
            onConfirm: (id: string) => {
                deleteOrderMutation.mutate(id)
            }
        })
    }





    // Use local pagination state - server data is only for validation
    const orders = ordersData?.orders || []

    const columns: TableColumn<Order>[] = [
        {
            key: 'orderNumber',
            header: 'Order #',
            accessor: 'orderNumber',
            className: 'font-medium'
        },
        {
            key: 'patient',
            header: 'Patient',
            render: (order) => (
                <div>
                    <p className="font-medium">{order.patient.name}</p>
                    <p className="text-xs text-muted-foreground">{order.patient.email || order.patient.phone || 'No contact info'}</p>
                </div>
            ),
        },
        {
            key: 'items',
            header: 'Tests',
            render: (order) => (
                <div>
                    <p className="text-sm">{order._count?.orderItems || order.orderItems.length} test{(order._count?.orderItems || order.orderItems.length) !== 1 ? 's' : ''}</p>
                    {order.orderItems.slice(0, 2).map(item => (
                        <p key={item.id} className="text-xs text-muted-foreground">
                            {item.labTest.name}
                        </p>
                    ))}
                    {order.orderItems.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                            +{order.orderItems.length - 2} more...
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: 'totalAmount',
            header: 'Total',
            render: (order) => {
                const total = order.totalCost ||
                    (order.orderItems?.reduce((sum: number, item) =>
                        sum + ((item.unitPrice || item.labTest?.price || 0) * item.quantity), 0
                    ) || 0)
                return <span className="font-medium">{formatCurrency(total)}</span>
            },
            className: 'text-right'
        },
        {
            key: 'status',
            header: 'Status',
            render: (order) => (
                <Badge variant={getStatusBadgeVariant(order.status) as any}>
                    {order.status}
                </Badge>
            ),
            className: 'text-center'
        },
        {
            key: 'estimatedReady',
            header: 'Est. Ready',
            render: (order) =>
                order.estimatedReady
                    ? new Date(order.estimatedReady).toLocaleDateString()
                    : 'TBD',
            className: 'text-muted-foreground text-sm'
        },
        {
            key: 'createdAt',
            header: 'Created',
            render: (order) => new Date(order.createdAt).toLocaleDateString(),
            className: 'text-muted-foreground text-sm'
        }
    ]

    if (error) {
        return (
            <div className="container mx-auto py-4">
                <div className="text-center text-red-500">
                    Error loading orders: {(error as Error).message}
                    <br />
                    <Button onClick={() => refetch()} className="mt-4">
                        Try Again
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-4 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Orders</h1>
                    <p className="text-muted-foreground">
                        Manage lab test orders and their statuses
                    </p>
                </div>
                <Button onClick={() => navigate({
                    to: '/orders/new', search: {
                        patientId: undefined
                    }
                })}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Order
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomTextInput
                    field={{
                        name: 'orderSearch',
                        state: {
                            value: searchTerm,
                            meta: {
                                errors: [],
                                isTouched: false,
                                isBlurred: false,
                                isDirty: false,
                                errorMap: {},
                                errorSourceMap: {},
                                isValidating: false
                            }
                        },
                        handleChange: handleOrderNumberSearch,
                        handleBlur: () => { }
                    }}
                    placeholder="Search by order number..."
                    label="Order Number"
                />

                <CustomTextInput
                    field={{
                        name: 'patientSearch',
                        state: {
                            value: patientSearch,
                            meta: {
                                errors: [],
                                isTouched: false,
                                isBlurred: false,
                                isDirty: false,
                                errorMap: {},
                                errorSourceMap: {},
                                isValidating: false
                            }
                        },
                        handleChange: handlePatientNameSearch,
                        handleBlur: () => { }
                    }}
                    placeholder="Search by patient name..."
                    label="Patient Name"
                />

                <CustomSelect
                    field={{
                        name: 'statusFilter',
                        state: {
                            value: selectedStatus,
                            meta: {
                                errors: [],
                                isTouched: false,
                                isBlurred: false,
                                isDirty: false,
                                errorMap: {},
                                errorSourceMap: {},
                                isValidating: false
                            }
                        },
                        handleChange: handleStatusChange,
                        handleBlur: () => { }
                    }}
                    options={statusOptions}
                    label="Status Filter"
                    placeholder="Select status..."
                />
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                            <p className="text-2xl font-bold">{pagination.total}</p>
                        </div>
                        <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {orders.filter((o: any) => o.status === 'PENDING').length}
                            </p>
                        </div>
                        <FileText className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Completed</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {orders.filter((o: any) => o.status === 'COMPLETED').length}
                            </p>
                        </div>
                        <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Completed</p>
                            <p className="text-2xl font-bold text-green-600">
                                {orders.filter((o: any) => o.status === 'COMPLETED').length}
                            </p>
                        </div>
                        <FileText className="h-8 w-8 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <CustomTable
                data={orders}
                columns={columns}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                loading={isLoading}
                emptyMessage="No orders found"
                actions={(order) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate({ to: '/orders/$orderId', params: { orderId: order.id } })}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteOrder(order.id)}
                            className="text-destructive hover:text-destructive"
                            disabled={deleteOrderMutation.isPending}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            />

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={dialogState.isOpen}
                onClose={closeDialog}
                onConfirm={handleConfirm}
                title={dialogState.title}
                description={dialogState.description}
                confirmText={dialogState.confirmText}
                cancelText={dialogState.cancelText}
                id={dialogState.id}
                variant={dialogState.variant}
                isLoading={deleteOrderMutation.isPending}
            />
        </div>
    )
}