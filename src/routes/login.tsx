import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { loginFn } from '~/server/auth/login'
import { useForm } from '@tanstack/react-form'
import CustomTextInput from '~/components/Inputs/CustomTextInput'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      if (!data?.error) {
        // Navigate to the redirect URL or home
        navigate({ to: '/patients' })
        return
      }
    },
    onError: (error) => {
      console.error('Login error:', error)
    }
  })


  const { Field, handleSubmit, state, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutate({ data: value })
      console.log("submitted values:", value);
    },
  })







  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return <div className=" flex items-center justify-center">
    <div
      className="max-w-md w-full space-y-4 p-6 border border-border bg-card text-card-foreground rounded-lg"
      onKeyDown={handleKeyDown}
    >
      <h1 className="text-2xl font-bold text-center">Login</h1>

      <div>
        <Field name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Email is required'
              if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email'
              return undefined
            }
          }}
        >
          {(field) => (
            <CustomTextInput
              field={field}
              label="Email"
              placeholder="Enter your email"
            />
          )}
        </Field>
        <Field name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Password is required'
              return undefined
            }
          }}
        >
          {(field) => (
            <CustomTextInput
              field={field}
              label="Password"
              placeholder="Enter your password"
              password
            />
          )}
        </Field>
      </div>

      <Subscribe
        selector={(state) => [state.canSubmit, state.isTouched]}
        children={([isValid, isTouched]) => (
          <button
            type='submit'
            onClick={handleSubmit}
            disabled={loginMutation.isPending || !isValid || !isTouched}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        )} >
      </Subscribe>
      {loginMutation.data?.error && (
        <>
          <div className="text-red-500 mt-4">
            {loginMutation.data.message}
          </div>
          {loginMutation.data.userNotFound && <Link to='/signup' className="text-primary hover:text-primary/80">Sign Up instead</Link>}
        </>
      )}
    </div>
  </div >
}
