import { PrismaClient, OrderStatus } from '@prisma/client'
import { hashPassword } from '~/utils/auth/password'

const prisma = new PrismaClient()

// Generate a 10-character alphanumeric order number
function generateOrderNumber(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

async function main() {
    console.log('🌱 Starting seed process...')

    // Clear existing data (except Users)
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.labTest.deleteMany()
    await prisma.patient.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Cleared existing data')
    const password = await hashPassword('Aa1234!!')

    await prisma.user.create({
        data: {
            email: 'ali@test.com',
            password: password

        }
    })

    // Create Lab Tests
    const labTests = await Promise.all([
        prisma.labTest.create({
            data: {
                code: 'CBC',
                name: 'Complete Blood Count',
                description: 'Measures different components and features of blood',
                price: 45.00,
                turnaroundHours: 24,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'CMP',
                name: 'Comprehensive Metabolic Panel',
                description: 'Tests glucose, electrolytes, kidney and liver function',
                price: 65.00,
                turnaroundHours: 48,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'LIPID',
                name: 'Lipid Panel',
                description: 'Cholesterol and triglyceride levels',
                price: 55.00,
                turnaroundHours: 24,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'TSH',
                name: 'Thyroid Stimulating Hormone',
                description: 'Measures thyroid function',
                price: 35.00,
                turnaroundHours: 72,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'HBA1C',
                name: 'Hemoglobin A1C',
                description: 'Average blood sugar over 2-3 months',
                price: 40.00,
                turnaroundHours: 24,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'PSA',
                name: 'Prostate Specific Antigen',
                description: 'Prostate cancer screening',
                price: 50.00,
                turnaroundHours: 48,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'VITD',
                name: 'Vitamin D, 25-Hydroxy',
                description: 'Vitamin D deficiency screening',
                price: 60.00,
                turnaroundHours: 96,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'CRP',
                name: 'C-Reactive Protein',
                description: 'Inflammation marker',
                price: 30.00,
                turnaroundHours: 24,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'FERR',
                name: 'Ferritin',
                description: 'Iron storage levels',
                price: 38.00,
                turnaroundHours: 48,
                isActive: true
            }
        }),
        prisma.labTest.create({
            data: {
                code: 'COVID',
                name: 'COVID-19 PCR Test',
                description: 'SARS-CoV-2 detection',
                price: 85.00,
                turnaroundHours: 12,
                isActive: false // Discontinued
            }
        })
    ])

    console.log(`✅ Created ${labTests.length} lab tests`)

    // Create Patients
    const patients = await Promise.all([
        prisma.patient.create({
            data: {
                name: 'John Smith',
                dateOfBirth: new Date('1985-03-15'),
                email: 'john.smith@email.com',
                phone: '(555) 123-4567',
                address: '123 Main St, Anytown, ST 12345'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'Maria Garcia',
                dateOfBirth: new Date('1978-07-22'),
                email: 'maria.garcia@email.com',
                phone: '(555) 987-6543',
                address: '456 Oak Ave, Somewhere, ST 67890'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'Robert Johnson',
                dateOfBirth: new Date('1965-11-08'),
                email: 'r.johnson@email.com',
                phone: '(555) 456-7890',
                address: '789 Pine Rd, Elsewhere, ST 54321'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'Sarah Williams',
                dateOfBirth: new Date('1992-01-30'),
                email: 'sarah.w@email.com',
                phone: '(555) 321-9876',
                address: '321 Elm St, Nowhere, ST 98765'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'Michael Brown',
                dateOfBirth: new Date('1980-09-14'),
                email: 'mike.brown@email.com',
                phone: '(555) 654-3210',
                address: '654 Maple Dr, Anywhere, ST 13579'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'Emily Davis',
                dateOfBirth: new Date('1995-05-18'),
                email: null, // Some patients might not have email
                phone: '(555) 789-0123',
                address: '987 Cedar Ln, Someplace, ST 24680'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'David Wilson',
                dateOfBirth: new Date('1972-12-03'),
                email: 'david.wilson@email.com',
                phone: '(555) 111-2222',
                address: '111 Birch Ave, Cityville, ST 11111'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'Lisa Anderson',
                dateOfBirth: new Date('1988-08-25'),
                email: 'lisa.anderson@email.com',
                phone: '(555) 333-4444',
                address: '333 Spruce St, Townsburg, ST 33333'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'James Martinez',
                dateOfBirth: new Date('1990-04-12'),
                email: null,
                phone: '(555) 555-6666',
                address: '555 Willow Rd, Villageton, ST 55555'
            }
        }),
        prisma.patient.create({
            data: {
                name: 'Jennifer Taylor',
                dateOfBirth: new Date('1983-10-07'),
                email: 'j.taylor@email.com',
                phone: '(555) 777-8888',
                address: '777 Ash Ln, Hamlet, ST 77777'
            }
        })
    ])

    console.log(`✅ Created ${patients.length} patients`)

    // Create Orders with OrderItems
    const now = new Date()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)

    // Order 1: John Smith - Routine checkup
    const order1 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[0].id,
            status: OrderStatus.COMPLETED,
            notes: 'Annual physical exam - routine labs',
            createdAt: threeDaysAgo,
            actualReady: yesterday,
            estimatedReady: new Date(threeDaysAgo.getTime() + 48 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[0].id, // CBC
                        quantity: 1,
                        unitPrice: labTests[0].price
                    },
                    {
                        labTestId: labTests[1].id, // CMP
                        quantity: 1,
                        unitPrice: labTests[1].price
                    },
                    {
                        labTestId: labTests[2].id, // LIPID
                        quantity: 1,
                        unitPrice: labTests[2].price
                    }
                ]
            }
        }
    })

    // Order 2: Maria Garcia - Diabetes monitoring
    const order2 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[1].id,
            status: OrderStatus.PENDING,
            notes: 'Diabetes follow-up',
            createdAt: yesterday,
            estimatedReady: new Date(now.getTime() + 24 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[4].id, // HBA1C
                        quantity: 1,
                        unitPrice: labTests[4].price
                    },
                    {
                        labTestId: labTests[0].id, // CBC
                        quantity: 1,
                        unitPrice: labTests[0].price
                    }
                ]
            }
        }
    })

    // Order 3: Robert Johnson - Prostate screening
    const order3 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[2].id,
            status: OrderStatus.PENDING,
            notes: 'Prostate screening - age 58',
            createdAt: now,
            estimatedReady: new Date(now.getTime() + 48 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[5].id, // PSA
                        quantity: 1,
                        unitPrice: labTests[5].price
                    },
                    {
                        labTestId: labTests[0].id, // CBC
                        quantity: 1,
                        unitPrice: labTests[0].price
                    }
                ]
            }
        }
    })

    // Order 4: Sarah Williams - Thyroid check
    const order4 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[3].id,
            status: OrderStatus.COMPLETED,
            notes: 'Fatigue and weight gain symptoms',
            createdAt: new Date(twoDaysAgo.getTime() - 2 * 60 * 60 * 1000),
            actualReady: now,
            estimatedReady: new Date(twoDaysAgo.getTime() + 72 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[3].id, // TSH
                        quantity: 1,
                        unitPrice: labTests[3].price
                    }
                ]
            }
        }
    })

    // Order 5: Michael Brown - Comprehensive wellness
    const order5 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[4].id,
            status: OrderStatus.PENDING,
            notes: 'Executive health screening',
            createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
            estimatedReady: new Date(now.getTime() + 96 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[0].id, // CBC
                        quantity: 1,
                        unitPrice: labTests[0].price
                    },
                    {
                        labTestId: labTests[1].id, // CMP
                        quantity: 1,
                        unitPrice: labTests[1].price
                    },
                    {
                        labTestId: labTests[2].id, // LIPID
                        quantity: 1,
                        unitPrice: labTests[2].price
                    },
                    {
                        labTestId: labTests[6].id, // VITD
                        quantity: 1,
                        unitPrice: labTests[6].price
                    },
                    {
                        labTestId: labTests[8].id, // FERR
                        quantity: 1,
                        unitPrice: labTests[8].price
                    }
                ]
            }
        }
    })

    // Order 6: Emily Davis - Inflammation check
    const order6 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[5].id,
            status: OrderStatus.CANCELLED,
            notes: 'Patient cancelled - insurance issues',
            createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[7].id, // CRP
                        quantity: 1,
                        unitPrice: labTests[7].price
                    }
                ]
            }
        }
    })

    // Order 7: David Wilson - Vitamin screening
    const order7 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[6].id,
            status: OrderStatus.COMPLETED,
            notes: 'Vitamin D deficiency check',
            createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            actualReady: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
            estimatedReady: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[6].id, // VITD
                        quantity: 1,
                        unitPrice: labTests[6].price
                    }
                ]
            }
        }
    })

    // Order 8: Lisa Anderson - Multiple tests
    const order8 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[7].id,
            status: OrderStatus.PENDING,
            notes: 'Pre-employment health screening',
            createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
            estimatedReady: new Date(now.getTime() + 48 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[0].id, // CBC
                        quantity: 1,
                        unitPrice: labTests[0].price
                    },
                    {
                        labTestId: labTests[1].id, // CMP
                        quantity: 1,
                        unitPrice: labTests[1].price
                    },
                    {
                        labTestId: labTests[4].id, // HBA1C
                        quantity: 1,
                        unitPrice: labTests[4].price
                    }
                ]
            }
        }
    })

    // Order 9: James Martinez - Iron levels
    const order9 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[8].id,
            status: OrderStatus.COMPLETED,
            notes: 'Anemia investigation',
            createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
            actualReady: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            estimatedReady: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[8].id, // FERR
                        quantity: 1,
                        unitPrice: labTests[8].price
                    },
                    {
                        labTestId: labTests[0].id, // CBC
                        quantity: 1,
                        unitPrice: labTests[0].price
                    }
                ]
            }
        }
    })

    // Order 10: Jennifer Taylor - Routine follow-up
    const order10 = await prisma.order.create({
        data: {
            orderNumber: generateOrderNumber(),
            patientId: patients[9].id,
            status: OrderStatus.PENDING,
            notes: 'Six-month follow-up',
            createdAt: new Date(now.getTime() - 30 * 60 * 1000),
            estimatedReady: new Date(now.getTime() + 24 * 60 * 60 * 1000),
            orderItems: {
                create: [
                    {
                        labTestId: labTests[2].id, // LIPID
                        quantity: 1,
                        unitPrice: labTests[2].price
                    },
                    {
                        labTestId: labTests[3].id, // TSH
                        quantity: 1,
                        unitPrice: labTests[3].price
                    }
                ]
            }
        }
    })

    // Update total costs for all orders
    const orders = [order1, order2, order3, order4, order5, order6, order7, order8, order9, order10]
    for (const order of orders) {
        const orderItems = await prisma.orderItem.findMany({
            where: { orderId: order.id }
        })
        const totalCost = orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)

        await prisma.order.update({
            where: { id: order.id },
            data: { totalCost }
        })
    }

    console.log(`✅ Created ${orders.length} orders with order items`)

    const summary = await prisma.order.groupBy({
        by: ['status'],
        _count: true
    })

    console.log('📊 Orders by status:')
    summary.forEach(group => {
        console.log(`   ${group.status}: ${group._count} orders`)
    })

    console.log('🎉 Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })