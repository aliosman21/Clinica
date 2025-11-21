import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/')({
  beforeLoad: async () => {
    // This runs before the component loads
    throw redirect({
      to: '/patients',
      replace: true // This replaces the history entry instead of adding a new one
    })
  }
})

