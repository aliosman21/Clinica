/**
 * Utility functions for formatting data
 */

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export const formatDate = (date: Date | null | string) => {
    if (!date) return 'Not provided'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

export const formatDateWithTime = (date: Date | null | string) => {
    if (!date) return 'Not set'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const formatDateForInput = (date: Date | null) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().split('T')[0]
}

export const calculateAge = (birthDate: Date | null) => {
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