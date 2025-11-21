import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import type { PatientUpdateInput } from '~/types'

export const updatePatient = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: PatientUpdateInput) => data)
    .handler(async ({ data }) => {
        try {
            const { id, ...updateData } = data

            const patient = await prismaClient.patient.update({
                where: { id },
                data: {
                    ...(updateData.name && { name: updateData.name }),
                    ...(updateData.dateOfBirth && { dateOfBirth: new Date(updateData.dateOfBirth) }),
                    ...(updateData.email !== undefined && { email: updateData.email || null }),
                    ...(updateData.phone !== undefined && { phone: updateData.phone || null }),
                    ...(updateData.address !== undefined && { address: updateData.address || null }),
                }
            })

            return patient
        } catch (error) {
            throw new Error('Failed to update patient')
        }
    })