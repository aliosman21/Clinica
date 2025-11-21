import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'

export const createPatient = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: {
        name: string
        dateOfBirth: string
        email?: string
        phone?: string
        address?: string
    }) => data)
    .handler(async ({ data }) => {
        try {
            const patient = await prismaClient.patient.create({
                data: {
                    name: data.name,
                    dateOfBirth: new Date(data.dateOfBirth),
                    email: data.email || null,
                    phone: data.phone || null,
                    address: data.address || null
                }
            })

            return patient
        } catch (error) {
            throw new Error('Failed to create patient')
        }
    })
