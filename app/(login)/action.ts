import bcrypt from 'bcryptjs'
import { validatedAction } from '@/lib/auth/middleware'
import { createUser, getUserByEmail } from '@/lib/db/queries'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { comparePasswords, setSession } from '@/lib/auth/session'
import { User } from '@/lib/db/types'

const SALT = 10

const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must contain minimum of 8 character.' }),
})

export const signIn = validatedAction(
  authSchema,
  async ({ email, password }) => {
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      return { error: 'No user found, please try again' }
    }

    const isPasswordValid = await comparePasswords(
      password,
      existingUser.password
    )
    if (!isPasswordValid) return { error: 'Password is incorrect' }

    await setSession(existingUser as unknown as User)

    redirect('/tasks')
  }
)

export const signUp = validatedAction(
  authSchema,
  async ({ email, password }) => {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return { error: 'This email address already used' }
    }
    const hashPassword = await bcrypt.hash(password, SALT)
    const useData = {
      email,
      password: hashPassword,
    }

    const user = await createUser(useData)
    if (user) {
      setSession(user)
      return redirect('/tasks')
    }
    return { error: 'Something went wrong' }
  }
)
