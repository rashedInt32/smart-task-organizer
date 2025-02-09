'use client'
import { useTasks } from '../_hooks/useTasks'

export const TaskList = () => {
  const { tasks } = useTasks()

  return (
    <div className="grid gap-4 p-4">
      {tasks?.map((task, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h1 className="text-xl font-semibold mb-3 text-gray-800">
            {task.title}
          </h1>
          <div className="flex space-x-6 text-gray-600">
            <p>{task.date}</p>
            <p>{task.time}</p>
            <p>{task.priority}</p>
            <p>{task.status}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
