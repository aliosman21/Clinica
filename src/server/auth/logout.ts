import { redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useAppSession } from '~/utils/auth/session'

export const logoutFn = createServerFn().handler(async () => {
    const session = await useAppSession()

    session.clear()

    throw redirect({
        href: '/',
    })
})