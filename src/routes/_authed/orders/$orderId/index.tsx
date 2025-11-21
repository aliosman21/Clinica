import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { getOrder } from '~/server/orders/get-order'
import { ArrowLeft, User, Calendar, DollarSign, FileText, Clock, Package, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency, formatDateWithTime } from '~/utils/general/formatters'
import { getStatusBadgeVariant, getStatusColor } from '~/utils/general/status-helpers'
import { calculateOrderTotal, calculateEstimatedReadyDate } from '~/utils/general/order-calculations'
import type { Order } from '~/types'

export const Route = createFileRoute('/_authed/orders/$orderId/')({
    loader: ({ params }) => getOrder({ data: { id: params.orderId } }),
    component: OrderDetailsPage,
})

function OrderDetailsPage() {
    const navigate = useNavigate()
    const order = Route.useLoaderData()



    return (
        <div className="container mx-auto py-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center justify-between space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate({ to: '/orders' })}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Orders
                    </Button>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
                        <p className="text-muted-foreground">
                            Order Details
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant={getStatusBadgeVariant(order.status) as any} className="text-lg px-3 py-1">
                            {order.status}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Patient Information */}
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            Patient Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                    <p className="text-lg font-semibold">{order.patient.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                                    <p className="text-sm">
                                        {order.patient.dateOfBirth
                                            ? new Date(order.patient.dateOfBirth).toLocaleDateString()
                                            : 'Not provided'
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <p className="text-sm">{order.patient.email || 'Not provided'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                    <p className="text-sm">{order.patient.phone || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate({ to: '/patients/$patientId', params: { patientId: order.patient.id } })}
                            >
                                View Patient Details
                            </Button>
                        </div>
                    </div>

                    {/* Lab Tests */}
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <Package className="w-5 h-5 mr-2" />
                            Lab Tests Ordered
                        </h2>
                        <div className="space-y-3">
                            {order.orderItems.map((item: any, index: number) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm font-medium">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.labTest.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Code: {item.labTest.code}
                                                </p>
                                                {item.labTest.turnaroundTime && (
                                                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {item.labTest.turnaroundTime} days turnaround
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        <p className="font-semibold">
                                            {formatCurrency(item.labTest.price * item.quantity)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatCurrency(item.labTest.price)} each
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Total */}
                        <div className="mt-6 pt-4 border-t">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold">Total Amount:</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(calculateOrderTotal(order.orderItems))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Order Summary
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Order Number</span>
                                <span className="font-mono">{order.orderNumber}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Status</span>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Total Tests</span>
                                <span className="text-lg font-bold">{order.orderItems.length}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Created Date</span>
                                <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Last Updated</span>
                                <span className="text-sm">{new Date(order.updatedAt).toLocaleDateString()}</span>
                            </div>

                            {order.estimatedReady && (
                                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                    <span className="text-sm font-medium">Est. Ready Date</span>
                                    <span className="text-sm font-semibold text-orange-600">
                                        {new Date(order.estimatedReady).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => navigate({ to: '/patients/$patientId', params: { patientId: order.patient.id } })}
                            >
                                <User className="w-4 h-4 mr-2" />
                                View Patient
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => {
                                    // This would typically open a print dialog or generate a PDF
                                    toast.success('Print functionality would be implemented here')
                                }}
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Print Order
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}