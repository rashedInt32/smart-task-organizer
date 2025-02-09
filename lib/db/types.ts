import { Prisma } from '@prisma/client'

export type User = Prisma.UserGetPayload<{
  include: { tasks: true }
}>

export type Task = Prisma.TaskGetPayload<{}>

export type CreateTaskInput = {
  title: string
  date: string
  time: string
  priority: string
  status?: string
  userId: number | null
}
