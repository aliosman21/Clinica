import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { getPatient } from '~/server/patients/get-patient'
import { ArrowLeft, Edit, Calendar, Activity, Eye, DollarSign, Clock, FileText } from 'lucide-react'

export const Route = createFileRoute('/_authed/patients/$patientId/')({
    loader: ({ params }) => getPatient({ data: { id: params.patientId } }),
    component: PatientDetailsPage,
})

function PatientDetailsPage() {
    const navigate = useNavigate()
    const patient = Route.useLoaderData()
    const { patientId } = Route.useParams()

    const formatDate = (date: Date | null) => {
        if (!date) return 'Not provided'
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const calculateAge = (birthDate: Date | null) => {
        if (!birthDate) return 'Unknown'
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }

        return age
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    const getStatusBadgeVariant = (status: string) => {
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

    return (
        <div className="container mx-auto py-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate({ to: '/patients' })}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Patients
                    </Button>
                </div>
                <div className="text-center flex-1">
                    <h1 className="text-3xl font-bold">{patient.name}</h1>
                    <p className="text-muted-foreground">
                        Patient Details
                    </p>
                </div>
                <Button
                    onClick={() => navigate({ to: '/patients/$patientId/edit', params: { patientId } })}
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Patient
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Patient Information */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-4 justify-center">
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</p>
                                        <p className="text-sm">{formatDate(patient.dateOfBirth)}</p>
                                        {patient.dateOfBirth && (
                                            <p className="text-xs text-muted-foreground">
                                                Age: {calculateAge(patient.dateOfBirth)} years
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 justify-center">
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
                                        <p className="text-sm">{patient.email || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-4 justify-center">

                                    <div className="text-center">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Phone</p>
                                        <p className="text-sm">{patient.phone || 'Not provided'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 justify-center">
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
                                        <p className="text-sm">{patient.address || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-card rounded-lg border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold flex items-center">
                                <FileText className="w-5 h-5 mr-2" />
                                Recent Orders
                            </h2>
                            <div className="flex items-center space-x-2">
                                <Badge variant="secondary">
                                    {patient._count.orders} total orders
                                </Badge>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate({ to: '/orders' })}
                                >
                                    View All Orders
                                </Button>
                            </div>
                        </div>
                        {patient.orders && patient.orders.length > 0 ? (
                            <div className="space-y-4">
                                {patient.orders.map((order) => (
                                    <div key={order.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <p className="font-semibold">Order #{order.orderNumber || order.id.slice(-8)}</p>
                                                    <Badge variant={getStatusBadgeVariant(order.status) as any}>
                                                        {order.status}
                                                    </Badge>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-muted-foreground">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-muted-foreground">
                                                            {order.orderItems?.length || 0} test{(order.orderItems?.length || 0) !== 1 ? 's' : ''}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                                                        <span className="font-medium">
                                                            {order.totalCost ? formatCurrency(order.totalCost) : 'TBD'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {order.estimatedReady && (
                                                    <div className="flex items-center space-x-2 mt-2 text-sm">
                                                        <Clock className="w-4 h-4 text-orange-500" />
                                                        <span className="text-orange-600">
                                                            Est. ready: {new Date(order.estimatedReady).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Show first few lab tests */}
                                                {order.orderItems && order.orderItems.length > 0 && (
                                                    <div className="mt-2 text-left">
                                                        <p className="text-xs text-muted-foreground mb-1">Tests:</p>
                                                        <div className="space-y-1">
                                                            {order.orderItems.slice(0, 2).map((item: any) => (
                                                                <p key={item.id} className="text-xs text-muted-foreground">
                                                                    • {item.labTest?.name || 'Unknown Test'}
                                                                </p>
                                                            ))}
                                                            {order.orderItems.length > 2 && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    • +{order.orderItems.length - 2} more test{order.orderItems.length - 2 !== 1 ? 's' : ''}...
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => navigate({ to: '/orders/$orderId', params: { orderId: order.id } })}
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {patient.orders.length >= 10 && (
                                    <div className="text-center pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            onClick={() => navigate({ to: '/orders' })}
                                        >
                                            View All {patient._count.orders} Orders
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Activity className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No orders found for this patient</p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => navigate({ to: '/orders' })}
                                >
                                    View Orders
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="space-y-6">
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Total Orders</span>
                                <span className="text-lg font-bold">{patient._count.orders}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Member Since</span>
                                <span className="text-sm">{formatDate(patient.createdAt)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Last Updated</span>
                                <span className="text-sm">{formatDate(patient.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}