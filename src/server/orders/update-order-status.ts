import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import { OrderStatus } from '@prisma/client'

export const updateOrderStatus = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: {
        id: string
        status: OrderStatus
        notes?: string
    }) => data)
    .handler(async ({ data }) => {
        try {
            const updateData: any = {
                status: data.status,
                ...(data.notes !== undefined && { notes: data.notes })
            }

            // Set actualReady when status is COMPLETED
            if (data.status === OrderStatus.COMPLETED) {
                updateData.actualReady = new Date()
            }

            const order = await prismaClient.order.update({
                where: { id: data.id },
                data: updateData,
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    orderItems: {
                        include: {
                            labTest: {
                                select: {
                                    id: true,
                                    code: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })

            return order
        } catch (error) {
            throw new Error('Failed to update order status')
        }
    })