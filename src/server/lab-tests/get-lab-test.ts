import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const getLabTest = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .inputValidator((params: { id: string }) => params)
    .handler(async ({ data }) => {
        try {
            const labTest = await prismaClient.labTest.findUnique({
                where: { id: data.id },
                include: {
                    orderItems: {
                        orderBy: { order: { createdAt: 'desc' } },
                        take: 10,
                        include: {
                            order: {
                                include: {
                                    patient: {
                                        select: {
                                            id: true,
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    _count: {
                        select: { orderItems: true }
                    }
                }
            })

            if (!labTest) {
                throw new Error('Lab test not found')
            }

            return labTest
        } catch (error) {
            throw new Error('Failed to fetch lab test')
        }
    })