import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import { OrderStatus } from '@prisma/client'

export const getOrders = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .inputValidator((params: {
        limit?: number
        offset?: number
        orderNumber?: string
        patientName?: string
        status?: OrderStatus
    }) => params)
    .handler(async ({ data }) => {
        try {
            const limit = Math.min(data.limit || 50, 100) // Max 100 records
            const offset = data.offset || 0

            const where: any = {}

            if (data.orderNumber) {
                where.orderNumber = {
                    contains: data.orderNumber,
                    mode: 'insensitive'
                }
            }

            if (data.patientName) {
                where.patient = {
                    name: {
                        contains: data.patientName,
                        mode: 'insensitive'
                    }
                }
            }

            if (data.status) {
                where.status = data.status
            }

            const [orders, total] = await Promise.all([
                prismaClient.order.findMany({
                    where,
                    take: limit,
                    skip: offset,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        patient: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phone: true
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
                        },
                        _count: {
                            select: { orderItems: true }
                        }
                    }
                }),
                prismaClient.order.count({ where })
            ])

            return {
                orders,
                pagination: {
                    total,
                    limit,
                    offset,
                    hasMore: offset + limit < total
                }
            }
        } catch (error) {
            console.error(error)
            throw new Error('Failed to fetch orders')
        }
    })