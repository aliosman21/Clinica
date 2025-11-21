import { createFileRoute, Link } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { signupFn } from '~/server/auth/signup'
import { useForm } from '@tanstack/react-form'
import CustomTextInput from '~/components/Inputs/CustomTextInput'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const signupMutation = useMutation({
    mutationFn: signupFn,
    onSuccess: (data) => {
      if (!data?.error) {
        console.log('Signup successful', data)
        // Navigate to login or home after successful signup
        navigate({ to: '/login' })
        return
      }
    },
    onError: (error) => {
      console.error('Signup error:', error)
    }
  })

  const { Field, handleSubmit, state, Subscribe } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      signupMutation.mutate({ data: value })
      console.log("submitted values:", value);
    },
  })

  return <div className=" flex items-center justify-center">
    <div
      className="max-w-md w-full space-y-4 p-6 border border-border bg-card text-card-foreground rounded-lg"
    >
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

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
            onClick={handleSubmit}
            disabled={signupMutation.isPending || !isValid || !isTouched}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
          </button>
        )} >
      </Subscribe>
      {signupMutation.data?.error && (
        <>
          <div className="text-red-500 mt-4">
            {signupMutation.data.message}
          </div>
          {signupMutation.data.userExists && <Link to='/login' className="text-primary hover:text-primary/80">Login instead</Link>}
        </>
      )}
    </div>
  </div>
}