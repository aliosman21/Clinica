import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const deletePatient = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((params: { id: string }) => params)
    .handler(async ({ data }) => {
        try {
            // Check if patient has orders
            const orderCount = await prismaClient.order.count({
                where: { patientId: data.id }
            })

            if (orderCount > 0) {
                throw new Error('Cannot delete patient with existing orders')
            }

            await prismaClient.patient.delete({
                where: { id: data.id }
            })

            return { message: 'Patient deleted successfully' }
        } catch (error) {
            throw new Error('Failed to delete patient')
        }
    })