import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const getLabTests = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .inputValidator((params: {
        limit?: number
        offset?: number
        isActive?: boolean
    }) => params)
    .handler(async ({ data }) => {
        try {
            const limit = Math.min(data.limit || 50, 100) // Max 100 records
            const offset = data.offset || 0

            const where = data.isActive !== undefined ? {
                isActive: data.isActive
            } : {}

            const [labTests, total] = await Promise.all([
                prismaClient.labTest.findMany({
                    where,
                    take: limit,
                    skip: offset,
                    orderBy: { name: 'asc' },
                    include: {
                        _count: {
                            select: { orderItems: true }
                        }
                    }
                }),
                prismaClient.labTest.count({ where })
            ])

            return {
                labTests,
                pagination: {
                    total,
                    limit,
                    offset,
                    hasMore: offset + limit < total
                }
            }
        } catch (error) {
            throw new Error('Failed to fetch lab tests')
        }
    })