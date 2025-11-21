import { useState } from 'react'

export interface ConfirmDialogState {
    isOpen: boolean
    title: string
    description: string
    id: string
    confirmText?: string
    cancelText?: string
    variant?: 'default' | 'destructive'
    onConfirm?: (id: string) => void
}

export function useConfirmDialog() {
    const [dialogState, setDialogState] = useState<ConfirmDialogState>({
        isOpen: false,
        title: '',
        description: '',
        id: '',
    })

    const openDialog = (config: {
        title: string
        description: string
        id: string
        confirmText?: string
        cancelText?: string
        variant?: 'default' | 'destructive'
        onConfirm: (id: string) => void
    }) => {
        setDialogState({
            isOpen: true,
            ...config,
        })
    }

    const closeDialog = () => {
        setDialogState(prev => ({
            ...prev,
            isOpen: false,
        }))
    }

    const handleConfirm = (id: string) => {
        if (dialogState.onConfirm) {
            dialogState.onConfirm(id)
        }
        closeDialog()
    }

    return {
        dialogState,
        openDialog,
        closeDialog,
        handleConfirm,
    }
}