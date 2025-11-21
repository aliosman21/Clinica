import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import { OrderStatus } from '@prisma/client'

export const deleteOrder = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((params: { id: string }) => params)
    .handler(async ({ data }) => {
        try {
            // Check order status - only allow deletion of PENDING or CANCELLED orders
            const order = await prismaClient.order.findUnique({
                where: { id: data.id },
                select: { status: true }
            })

            if (!order) {
                throw new Error('Order not found')
            }

            if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CANCELLED) {
                throw new Error('Only pending or cancelled orders can be deleted')
            }

            await prismaClient.order.delete({
                where: { id: data.id }
            })

            return { message: 'Order deleted successfully' }
        } catch (error) {
            throw new Error('Failed to delete order')
        }
    })