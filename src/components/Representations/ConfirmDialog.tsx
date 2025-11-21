import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (id: string) => void
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    id: string
    isLoading?: boolean
    variant?: 'default' | 'destructive'
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    id,
    isLoading = false,
    variant = 'destructive'
}: ConfirmDialogProps) {
    const handleConfirm = () => {
        onConfirm(id)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]" onClose={onClose}>
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        {variant === 'destructive' && (
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                        )}
                        <div>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription className="mt-1">
                                {description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant}
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                        ) : null}
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

// Hook for easier usage
export function useConfirmDialog() {
    const [dialogState, setDialogState] = useState<{
        isOpen: boolean
        title: string
        description: string
        id: string
        confirmText?: string
        cancelText?: string
        variant?: 'default' | 'destructive'
        onConfirm?: (id: string) => void
    }>({
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