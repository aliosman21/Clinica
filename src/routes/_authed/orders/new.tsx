import { useForm } from '@tanstack/react-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { CustomTextInput } from '~/components/Inputs/CustomTextInput'
import { CustomComboBox } from '~/components/Inputs/CustomComboBox'
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { createOrder } from '~/server/orders/create-order'
import { getPatients } from '~/server/patients/get-patients'
import { getLabTests } from '~/server/lab-tests/get-lab-tests'
import { formatCurrency } from '~/utils/general/formatters'
import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import type { Patient, LabTest, OrderCreateInput } from '~/types'

interface OrderItemForm {
    labTestId: string
    quantity: number
    labTest?: LabTest
}

export const Route = createFileRoute('/_authed/orders/new')({
    loader: async () => {
        const [patientsData, labTestsData] = await Promise.all([
            getPatients({ data: { limit: 100, offset: 0 } }),
            getLabTests({ data: { limit: 100, offset: 0, isActive: true } })
        ])
        return { patients: patientsData.patients, labTests: labTestsData.labTests }
    },
    validateSearch: (search) => ({
        patientId: (search.patientId as string) || undefined
    }),
    component: NewOrderPage,
})

function NewOrderPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { patients, labTests } = Route.useLoaderData()
    const search = Route.useSearch()
    const [orderItems, setOrderItems] = useState<OrderItemForm[]>([])

    // Server functions
    const createOrderFn = useServerFn(createOrder)

    // Mutation for creating orders
    const createOrderMutation = useMutation({
        mutationFn: (data: OrderCreateInput) => createOrderFn({ data }),
        onSuccess: (order) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            toast.success('Order created successfully')
            navigate({ to: '/orders/$orderId', params: { orderId: order.id } })
        },
        onError: (error) => {
            toast.error('Error creating order: ' + (error as Error).message)
        }
    })



    const patientOptions = patients.map(patient => ({
        value: patient.id,
        label: patient.name
    }))

    const availableLabTests = labTests.filter(test =>
        !orderItems.some(item => item.labTestId === test.id)
    )

    const labTestOptions = availableLabTests.map(test => ({
        value: test.id,
        label: `${test.code} - ${test.name} (${formatCurrency(test.price)})`
    }))

    const addOrderItem = (labTestId: string) => {
        const labTest = labTests.find(test => test.id === labTestId)
        if (labTest) {
            setOrderItems(prev => [...prev, {
                labTestId,
                quantity: 1,
                labTest
            }])
        }
    }

    const removeOrderItem = (index: number) => {
        setOrderItems(prev => prev.filter((_, i) => i !== index))
    }

    const updateOrderItemQuantity = (index: number, quantity: number) => {
        if (quantity < 1) return
        setOrderItems(prev => prev.map((item, i) =>
            i === index ? { ...item, quantity } : item
        ))
    }

    const calculateTotal = () => {
        return orderItems.reduce((total, item) => {
            return total + (item.labTest?.price || 0) * item.quantity
        }, 0)
    }

    const calculateMaxTurnaround = () => {
        if (orderItems.length === 0) return 0
        return Math.max(...orderItems.map(item => item.labTest?.turnaroundHours || 0))
    }

    // Form for creating orders
    const form = useForm({
        defaultValues: {
            patientId: search?.patientId || '',
            notes: ''
        },
        onSubmit: async ({ value }) => {
            if (orderItems.length === 0) {
                toast.error('Please add at least one lab test to the order')
                return
            }

            createOrderMutation.mutate({
                patientId: value.patientId,
                orderItems: orderItems.map(item => ({
                    labTestId: item.labTestId,
                    quantity: item.quantity
                })),
                notes: value.notes || undefined
            })
        }
    })

    return (
        <div className="container mx-auto py-4 space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate({ to: '/orders' })}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Orders
                    </Button>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Create New Order</h1>
                    <p className="text-muted-foreground">
                        Create a new lab order for a patient
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Form */}
                <div className="lg:col-span-2 space-y-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                        className="space-y-6"
                    >
                        {/* Patient Selection */}
                        <div className="bg-card rounded-lg border p-6">
                            <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
                            <form.Field
                                name="patientId"
                                validators={{
                                    onChange: ({ value }) =>
                                        !value?.trim() ? 'Patient is required' : undefined,
                                }}
                            >
                                {(field) => (
                                    <CustomComboBox
                                        field={field}
                                        placeholder="Select a patient..."
                                        options={patientOptions}
                                        label="Patient"
                                        searchPlaceholder="Search patients..."
                                        emptyText="No patients found."
                                    />
                                )}
                            </form.Field>
                        </div>

                        {/* Lab Tests Selection */}
                        <div className="bg-card rounded-lg border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">Lab Tests</h2>
                                {labTestOptions.length > 0 && (
                                    <div className="max-w-md">
                                        <CustomComboBox
                                            field={{
                                                name: 'labTestSelection',
                                                state: {
                                                    value: '',
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
                                                handleChange: (labTestId: string) => {
                                                    if (labTestId) {
                                                        addOrderItem(labTestId)
                                                    }
                                                },
                                                handleBlur: () => { }
                                            }}
                                            placeholder="Add a lab test..."
                                            options={labTestOptions}
                                            label="Add Lab Test"
                                            searchPlaceholder="Search lab tests..."
                                            emptyText="No lab tests available."
                                        />
                                    </div>
                                )}
                            </div>

                            {orderItems.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                    <p>No lab tests added yet</p>
                                    <p className="text-sm">Select lab tests from the dropdown above</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="font-medium">{item.labTest?.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Code: {item.labTest?.code} • {formatCurrency(item.labTest?.price || 0)} each
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Turnaround: {item.labTest?.turnaroundHours}h
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateOrderItemQuantity(index, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => updateOrderItemQuantity(index, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <div className="w-20 text-right font-medium">
                                                    {formatCurrency((item.labTest?.price || 0) * item.quantity)}
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeOrderItem(index)}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="bg-card rounded-lg border p-6">
                            <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
                            <form.Field name="notes">
                                {(field) => (
                                    <CustomTextInput
                                        field={field}
                                        label="Notes (Optional)"
                                        placeholder="Enter any additional notes for this order..."
                                        multiline
                                        rows={3}
                                    />
                                )}
                            </form.Field>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate({ to: '/orders' })}
                                disabled={createOrderMutation.isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={createOrderMutation.isPending || orderItems.length === 0}
                            >
                                {createOrderMutation.isPending ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                                ) : null}
                                Create Order
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-card rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Total Tests</span>
                                <span className="text-lg font-bold">{orderItems.length}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                <span className="text-sm font-medium">Total Amount</span>
                                <span className="text-2xl font-bold text-green-600">
                                    {formatCurrency(calculateTotal())}
                                </span>
                            </div>

                            {orderItems.length > 0 && (
                                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                                    <span className="text-sm font-medium">Est. Turnaround</span>
                                    <span className="text-sm font-semibold text-orange-600">
                                        {calculateMaxTurnaround()}h
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}