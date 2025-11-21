import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form'
import { CustomTextInput } from '~/components/Inputs/CustomTextInput'
import { Button } from '~/components/ui/button'
import { createPatient } from '~/server/patients/create-patient'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authed/patients/new')({
    component: NewPatientPage,
})

function NewPatientPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const createPatientFn = useServerFn(createPatient)

    // Mutation for creating patients
    const createPatientMutation = useMutation({
        mutationFn: (data: {
            name: string
            dateOfBirth: string
            email?: string
            phone?: string
            address?: string
        }) => createPatientFn({ data }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] })
            toast.success('Patient created successfully')
            navigate({ to: '/patients' })
        },
        onError: (error) => {
            toast.error('Error creating patient: ' + (error as Error).message)
        }
    })

    // Form for creating patients
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            address: ''
        },
        onSubmit: async ({ value }) => {
            createPatientMutation.mutate(value)
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
                        onClick={() => navigate({ to: '/patients' })}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Patients
                    </Button>
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Create New Patient</h1>
                    <p className="text-muted-foreground">
                        Add a new patient to the system
                    </p>
                </div>
            </div>

            {/* Create Patient Form */}
            <div className="bg-card rounded-lg border p-6 space-y-4 max-w-4xl mx-auto">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <form.Field
                            name="name"
                            validators={{
                                onChange: ({ value }) =>
                                    !value?.trim() ? 'Name is required' : undefined,
                            }}
                        >
                            {(field) => (
                                <CustomTextInput
                                    field={field}
                                    label="Full Name *"
                                    placeholder="Enter patient's full name"
                                />
                            )}
                        </form.Field>

                        <form.Field
                            name="dateOfBirth"
                            validators={{
                                onChange: ({ value }) => {
                                    if (!value?.trim()) return 'Date of birth is required'
                                    const date = new Date(value)
                                    if (isNaN(date.getTime())) return 'Please enter a valid date'
                                    if (date > new Date()) return 'Date cannot be in the future'
                                    return undefined
                                },
                            }}
                        >
                            {(field) => (
                                <CustomTextInput
                                    field={field}
                                    label="Date of Birth *"
                                    placeholder="YYYY-MM-DD"
                                    helperText="Format: YYYY-MM-DD"
                                />
                            )}
                        </form.Field>

                        <form.Field
                            name="email"
                            validators={{
                                onChange: ({ value }) => {
                                    if (value && value.trim()) {
                                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                        if (!emailRegex.test(value)) return 'Please enter a valid email'
                                    }
                                    return undefined
                                },
                            }}
                        >
                            {(field) => (
                                <CustomTextInput
                                    field={field}
                                    label="Email"
                                    placeholder="patient@example.com"
                                />
                            )}
                        </form.Field>

                        <form.Field name="phone">
                            {(field) => (
                                <CustomTextInput
                                    field={field}
                                    label="Phone"
                                    placeholder="+1 (555) 123-4567"
                                />
                            )}
                        </form.Field>
                    </div>

                    <form.Field name="address">
                        {(field) => (
                            <CustomTextInput
                                field={field}
                                label="Address"
                                placeholder="Enter patient's address"
                                multiline
                                rows={3}
                            />
                        )}
                    </form.Field>

                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate({ to: '/patients' })}
                            disabled={createPatientMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createPatientMutation.isPending}
                        >
                            {createPatientMutation.isPending ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                            ) : null}
                            Create Patient
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}