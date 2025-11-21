import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { useForm } from '@tanstack/react-form'
import { CustomTable, type TableColumn, type PaginationInfo } from '~/components/Representations/CustomTable'
import { CustomTextInput } from '~/components/Inputs/CustomTextInput'
import { ConfirmDialog } from '~/components/Representations/ConfirmDialog'
import { useConfirmDialog } from '~/hooks/useConfirmDialog'
import { usePagination } from '~/hooks/usePagination'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { getPatients } from '~/server/patients/get-patients'
import { deletePatient } from '~/server/patients/delete-patient'
import { useDebounce } from '~/hooks/useDebounce'
import { Trash2, Edit, Plus, Eye } from 'lucide-react'
import { toast } from 'sonner'
import type { Patient } from '~/types'



export const Route = createFileRoute('/_authed/patients/')({
    component: PatientsPage,
})

function PatientsPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { pagination, handlePageChange, handlePageSizeChange, updateTotal } = usePagination({
        initialLimit: 5,
        dependencies: [debouncedSearchTerm]
    })
    const { dialogState, openDialog, closeDialog, handleConfirm } = useConfirmDialog()

    // Form for search filters
    const searchForm = useForm({
        defaultValues: {
            search: ''
        },
        onSubmit: () => { } // Not used, form is just for field management
    })

    // Server functions
    const getPatientsFn = useServerFn(getPatients)
    const deletePatientFn = useServerFn(deletePatient)

    // Query for patients
    const {
        data: patientsData,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['patients', pagination.limit, pagination.offset, debouncedSearchTerm],
        queryFn: () => getPatientsFn({
            data: {
                limit: pagination.limit,
                offset: pagination.offset,
                name: debouncedSearchTerm || undefined
            }
        }),
        staleTime: 30000, // 30 seconds
    })

    // Update total when data is fetched
    useEffect(() => {
        if (patientsData?.pagination?.total !== undefined) {
            updateTotal(patientsData.pagination.total)
        }
    }, [patientsData?.pagination?.total, updateTotal])



    // Mutation for deleting patients
    const deletePatientMutation = useMutation({
        mutationFn: (id: string) => deletePatientFn({ data: { id } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] })
            toast.success('Patient deleted successfully')
            closeDialog()
        },
        onError: (error) => {
            toast.error('Error deleting patient: ' + (error as Error).message)
            closeDialog()
        }
    })

    const handleSearch = (term: string) => {
        setSearchTerm(term)
    }



    const handleDeletePatient = (patientId: string) => {
        if (patientsData?.patients.find(p => p.id === patientId)?._count.orders! > 0) {
            toast.error('Cannot delete patient with existing orders.')
            return
        }
        openDialog({
            title: 'Delete Patient',
            description: 'Are you sure you want to delete this patient? This action cannot be undone.',
            id: patientId,
            confirmText: 'Delete',
            cancelText: 'Cancel',
            variant: 'destructive',
            onConfirm: (id: string) => {
                deletePatientMutation.mutate(id)
            }
        })
    }

    const patients = patientsData?.patients || []

    // Use local pagination state - server data is only for validation

    const columns: TableColumn<Patient>[] = [
        {
            key: 'name',
            header: 'Name',
            headerClassName: 'text-center',
            accessor: 'name',
            className: 'font-medium'
        },
        {
            key: 'email',
            header: 'Email',
            headerClassName: 'text-center',
            render: (patient) => patient.email || '-',
        },
        {
            key: 'phone',
            header: 'Phone',
            headerClassName: 'text-center',
            render: (patient) => patient.phone || '-',
        },
        {
            key: 'dateOfBirth',
            header: 'Date of Birth',
            headerClassName: 'text-center',
            render: (patient) =>
                patient.dateOfBirth
                    ? new Date(patient.dateOfBirth).toLocaleDateString()
                    : '-',
        },
        {
            key: 'orders',
            header: 'Orders',
            headerClassName: 'text-center',
            render: (patient) => (
                <Badge variant="secondary">
                    {patient._count?.orders || 0} orders
                </Badge>
            ),
            className: 'text-center'
        },
        {
            key: 'createdAt',
            header: 'Created',
            headerClassName: 'text-center',
            render: (patient) => new Date(patient.createdAt).toLocaleDateString(),
            className: 'text-muted-foreground text-sm'
        }
    ]

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center text-red-500">
                    Error loading patients: {(error as Error).message}
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
                    <h1 className="text-3xl font-bold">Patients</h1>
                    <p className="text-muted-foreground">
                        Manage patient information and records
                    </p>
                </div>
                <Button name='add-patient' onClick={() => navigate({ to: '/patients/new' })}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                </Button>
            </div>



            {/* Search */}
            <div className="flex items-center space-x-2">
                <div className="flex-1 max-w-sm">
                    <searchForm.Field
                        name="search"
                    >
                        {(field) => {
                            // Sync with local state
                            if (field.state.value !== searchTerm) {
                                field.handleChange(searchTerm)
                            }
                            return (
                                <CustomTextInput
                                    field={{
                                        name: field.name,
                                        state: field.state,
                                        handleChange: (value: string) => {
                                            field.handleChange(value)
                                            handleSearch(value)
                                        },
                                        handleBlur: field.handleBlur
                                    }}
                                    placeholder="Search patients by name..."
                                />
                            )
                        }}
                    </searchForm.Field>
                </div>
            </div>

            {/* Table */}
            <CustomTable
                data={patients}
                columns={columns}
                pagination={pagination}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                loading={isLoading}
                emptyMessage="No patients found"
                actions={(patient) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate({ to: '/patients/$patientId', params: { patientId: patient.id } })}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate({ to: '/patients/$patientId/edit', params: { patientId: patient.id } })}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePatient(patient.id)}
                            className="text-destructive hover:text-destructive"
                            disabled={deletePatientMutation.isPending}
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
                isLoading={deletePatientMutation.isPending}
            />
        </div>
    )
}