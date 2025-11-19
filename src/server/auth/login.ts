
import { createServerFn } from '@tanstack/react-start'
import { hashPassword } from '~/utils/auth/password';
import { prismaClient } from '~/utils/database/prisma'
import { useAppSession } from '~/utils/auth/session'

export const loginFn = createServerFn({ method: 'POST' })
    .inputValidator((d: { email: string; password: string }) => d)
    .handler(async ({ data }) => {
        // Find the user
        const user = await prismaClient.user.findUnique({
            where: {
                email: data.email,
            },
        })

        // Check if the user exists
        if (!user) {
            return {
                error: true,
                userNotFound: true,
                message: 'User not found',
            }
        }

        // Check if the password is correct
        const hashedPassword = await hashPassword(data.password)

        if (user.password !== hashedPassword) {
            return {
                error: true,
                message: 'Incorrect password',
            }
        }

        // Create a session
        const session = await useAppSession()

        // Store the user's email in the session
        await session.update({
            userEmail: user.email,
        })
    })
