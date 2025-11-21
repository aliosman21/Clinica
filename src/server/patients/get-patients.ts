import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const getPatients = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .inputValidator((params: {
        limit?: number
        offset?: number
        name?: string
    }) => params)
    .handler(async ({ data }) => {
        try {
            const limit = Math.min(data.limit || 50, 100) // Max 100 records
            const offset = data.offset || 0

            const where = data.name ? {
                name: {
                    contains: data.name,
                    mode: 'insensitive' as const
                }
            } : {}

            const [patients, total] = await Promise.all([
                prismaClient.patient.findMany({
                    where,
                    take: limit,
                    skip: offset,
                    orderBy: { name: 'asc' },
                    include: {
                        _count: {
                            select: { orders: true }
                        }
                    }
                }),
                prismaClient.patient.count({ where })
            ])

            return {
                patients,
                pagination: {
                    total,
                    limit,
                    offset,
                    hasMore: offset + limit < total
                }
            }
        } catch (error) {
            throw new Error('Failed to fetch patients')
        }
    })