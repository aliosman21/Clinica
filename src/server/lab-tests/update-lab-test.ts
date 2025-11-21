import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import type { LabTestUpdateInput } from '~/types'

export const updateLabTest = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: LabTestUpdateInput) => data)
    .handler(async ({ data }) => {
        try {
            const { id, ...updateData } = data

            const labTest = await prismaClient.labTest.update({
                where: { id },
                data: {
                    ...(updateData.code && { code: updateData.code.toUpperCase() }),
                    ...(updateData.name && { name: updateData.name }),
                    ...(updateData.description !== undefined && { description: updateData.description || null }),
                    ...(updateData.price !== undefined && { price: updateData.price }),
                    ...(updateData.turnaroundHours !== undefined && { turnaroundHours: updateData.turnaroundHours }),
                    ...(updateData.isActive !== undefined && { isActive: updateData.isActive }),
                }
            })

            return labTest
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('Lab test code already exists')
            }
            throw new Error('Failed to update lab test')
        }
    })