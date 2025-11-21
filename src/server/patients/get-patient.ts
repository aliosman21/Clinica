import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const getPatient = createServerFn({ method: 'GET' })
    .middleware([authMiddleware])
    .inputValidator((params: { id: string }) => params)
    .handler(async ({ data }) => {
        try {
            const patient = await prismaClient.patient.findUnique({
                where: { id: data.id },
                include: {
                    orders: {
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                        include: {
                            orderItems: {
                                include: {
                                    labTest: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: { orders: true }
                    }
                }
            })

            if (!patient) {
                throw new Error('Patient not found')
            }

            return patient
        } catch (error) {
            throw new Error('Failed to fetch patient')
        }
    })