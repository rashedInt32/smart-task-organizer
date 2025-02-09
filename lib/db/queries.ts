'use server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth/session'
import { User, Task, CreateTaskInput } from '@/lib/db/types'
import { db } from '@/lib/db'

export async function getUser() {
  const sessionCookie = (await cookies()).get('session')
  if (!sessionCookie || !sessionCookie.value) {
    return null
  }

  const sessionData = await verifyToken(sessionCookie.value)

  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null
  }

  const user = await getUserById(sessionData.user.id)
  if (!user) return null

  return user as User
}

export async function createUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  return db.user.create({
    data: {
      email,
      password,
    },
  })
}

export async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } })
  if (user) return user
  return null
}

export async function getUserById(id: number) {
  const user = await db.user.findUnique({ where: { id } })
  if (user) return user
  return null
}

export async function createTask(task: CreateTaskInput) {
  return db.task.create({
    data: {
      ...task,
      status: task.status ?? 'pending',
    },
    include: {
      user: true,
    },
  })
}

export async function getTasks(userId: number) {
  return db.task.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
    },
  })
}

export async function updateTask(task: Task) {
  const { user, createdAt, updatedAt, ...updateData } = task
  return db.task.update({
    where: { id: task.id },
    data: {
      ...updateData,
      status: updateData.status ?? 'pending',
    },
  })
}

export async function deleteTask(id: number) {
  return db.task.delete({
    where: { id },
  })
}
