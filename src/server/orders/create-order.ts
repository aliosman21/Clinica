import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import { OrderStatus } from '@prisma/client'

export const createOrder = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: {
        patientId: string
        notes?: string
        orderItems: Array<{
            labTestId: string
            quantity: number
        }>
    }) => data)
    .handler(async ({ data }) => {
        try {
            // Validate patient exists
            const patient = await prismaClient.patient.findUnique({
                where: { id: data.patientId }
            })

            if (!patient) {
                throw new Error('Patient not found')
            }

            // Get lab test details for pricing and turnaround calculation
            const labTestIds = data.orderItems.map(item => item.labTestId)
            const labTests = await prismaClient.labTest.findMany({
                where: {
                    id: { in: labTestIds },
                    isActive: true
                }
            })

            if (labTests.length !== labTestIds.length) {
                throw new Error('One or more lab tests not found or inactive')
            }

            // Calculate total cost and estimated ready date
            let totalCost = 0
            let maxTurnaroundHours = 0

            const orderItemsData = data.orderItems.map(item => {
                const labTest = labTests.find(lt => lt.id === item.labTestId)!
                const itemCost = labTest.price * item.quantity
                totalCost += itemCost
                maxTurnaroundHours = Math.max(maxTurnaroundHours, labTest.turnaroundHours)

                return {
                    labTestId: item.labTestId,
                    quantity: item.quantity,
                    unitPrice: labTest.price
                }
            })

            const estimatedReady = new Date()
            estimatedReady.setHours(estimatedReady.getHours() + maxTurnaroundHours)

            const order = await prismaClient.order.create({
                data: {
                    patientId: data.patientId,
                    notes: data.notes || null,
                    totalCost,
                    estimatedReady,
                    orderItems: {
                        create: orderItemsData
                    }
                },
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    orderItems: {
                        include: {
                            labTest: true
                        }
                    }
                }
            })

            return order
        } catch (error) {
            throw new Error('Failed to create order')
        }
    })