'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionState } from '@/lib/auth/middleware'
import Link from 'next/link'
import { CircleIcon, CloudCog, Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { signIn, signUp } from './action'

export function Login({ mode }: { mode: 'signIn' | 'signUp' }) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signIn' ? signIn : signUp,
    { error: '' }
  )
  return (
    <div className="flex items-center justify-center text-white h-screen">
      <Card className="md:min-w-[450px] min-w-full bg-primaryDark/10 border-primaryDark/50 backdrop-blur-sm">
        <CardHeader className="text-xl font-bold text-center text-white">
          {mode === 'signIn'
            ? 'Sign in to your account'
            : 'Create your account'}
        </CardHeader>

        <CardContent>
          <form className="space-y-6" action={formAction}>
            <div>
              <Label htmlFor="email" className="text-white font-semibold">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                required
                maxLength={50}
                placeholder="Enter your email"
                className="text-input bg-primaryDark/20 text-white placeholder:text-white/80 border-primaryDark/50 focus-visible:ring-0 focus-visible:ring-primaryDark mt-2 autofill:bg-primaryDark/20"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white font-semibold">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                required
                maxLength={50}
                placeholder="Enter password"
                className="bg-primaryDark/20 text-white placeholder:text-white/80 border-primaryDark/50 focus-visible:ring-0 focus-visible:ring-primaryDark mt-2"
              />
            </div>
            {state?.error && (
              <div className="text-red-500 text-sm px-4 py-3 rounded-md bg-white font-bold border border-red-500">
                {state.error}
              </div>
            )}
            <div>
              <Button
                type="submit"
                className="w-full font-bold text-md"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Loading...
                  </>
                ) : mode === 'signIn' ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-white">
                  {mode === 'signIn'
                    ? 'New to our platform?'
                    : 'Already have an account?'}
                </span>
                <Link
                  href={mode === 'signIn' ? '/sign-up' : '/sign-in'}
                  className="text-primaryDark underline"
                >
                  {mode === 'signIn'
                    ? 'Create an account'
                    : 'Sign in to existing account'}
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
