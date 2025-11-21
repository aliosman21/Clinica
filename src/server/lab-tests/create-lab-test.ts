import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import type { LabTestCreateInput } from '~/types'

export const createLabTest = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: LabTestCreateInput) => data)
    .handler(async ({ data }) => {
        try {
            const labTest = await prismaClient.labTest.create({
                data: {
                    code: data.code.toUpperCase(),
                    name: data.name,
                    description: data.description || null,
                    price: data.price,
                    turnaroundHours: data.turnaroundHours,
                    isActive: data.isActive ?? true
                }
            })

            return labTest
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Lab test code already exists')
            }
            throw new Error('Failed to create lab test')
        }
    })