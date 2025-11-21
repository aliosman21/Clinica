import { createMiddleware } from '@tanstack/react-start'
import { useAppSession } from '../../utils/auth/session'

export const authMiddleware = createMiddleware().server(
    async ({ next }) => {
        const session = await useAppSession()

        if (!session.data.userEmail) {
            throw new Error('Unauthorized: Please log in to access this resource')
        }

        return next({
            context: {
                userEmail: session.data.userEmail,
                session
            }
        })
    }
)