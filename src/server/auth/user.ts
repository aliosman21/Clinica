import { createServerFn } from "@tanstack/react-start"
import { useAppSession } from "../../utils/auth/session"

export const fetchUser = createServerFn({ method: 'GET' }).handler(async () => {

    // We need to auth on the server so we have access to secure cookies
    const session = await useAppSession()

    if (!session.data.userEmail) {
        return null
    }

    return {
        email: session.data.userEmail,
    }
})