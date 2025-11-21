import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const getOrder = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .inputValidator((params: { id: string }) => params)
    .handler(async ({ data }) => {
        try {
            const order = await prismaClient.order.findUnique({
                where: { id: data.id },
                include: {
                    patient: true,
                    orderItems: {
                        include: {
                            labTest: true
                        }
                    }
                }
            })

            if (!order) {
                throw new Error('Order not found')
            }

            return order
        } catch (error) {
            throw new Error('Failed to fetch order')
        }
    })