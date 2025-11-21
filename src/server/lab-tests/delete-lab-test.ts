import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const deleteLabTest = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((params: { id: string }) => params)
    .handler(async ({ data }) => {
        try {
            // Check if lab test has order items
            const orderItemCount = await prismaClient.orderItem.count({
                where: { labTestId: data.id }
            })

            if (orderItemCount > 0) {
                throw new Error('Cannot delete lab test with existing orders')
            }

            await prismaClient.labTest.delete({
                where: { id: data.id }
            })

            return { message: 'Lab test deleted successfully' }
        } catch (error) {
            throw new Error('Failed to delete lab test')
        }
    })