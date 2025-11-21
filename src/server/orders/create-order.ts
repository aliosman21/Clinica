import { createServerFn } from '@tanstack/react-start'
import { prismaClient } from '~/utils/database/prisma'
import { authMiddleware } from '~/server/middlewares/middleware'
import { OrderStatus } from '@prisma/client'
import type { OrderCreateInput } from '~/types'

// Generate a 10-character alphanumeric order number
function generateOrderNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

export const createOrder = createServerFn({ method: 'POST' })
    .middleware([authMiddleware])
    .inputValidator((data: OrderCreateInput) => data)
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

            // Generate unique order number
            let orderNumber = generateOrderNumber()
            let existingOrder = await prismaClient.order.findUnique({
                where: { orderNumber }
            })

            while (existingOrder) {
                orderNumber = generateOrderNumber()
                existingOrder = await prismaClient.order.findUnique({
                    where: { orderNumber }
                })
            }

            const estimatedReady = new Date()
            estimatedReady.setHours(estimatedReady.getHours() + maxTurnaroundHours)

            const order = await prismaClient.order.create({
                data: {
                    orderNumber,
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
            console.error('Error creating order:', error)
            throw new Error('Failed to create order')
        }
    })