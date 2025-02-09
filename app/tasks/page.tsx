import { getUser } from '@/lib/db/queries'
import { redirect } from 'next/navigation'
import { TasksInput } from './_components/tasks-input'
import { TaskList } from './_components/tasks-list'

export default async function TasksPage() {
  const user = await getUser()
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="max-w-[700px] mx-auto min-h-screen py-10">
      <TaskList />
      <TasksInput />
    </div>
  )
}
