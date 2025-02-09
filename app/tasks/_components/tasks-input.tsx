'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Plus } from 'lucide-react'
import { useTasks } from '../_hooks/useTasks'
import { cn } from '@/lib/utils'

export const TasksInput = () => {
  const { onSubmit, setTask, isLoading } = useTasks()
  return (
    <div className="flex justify-center items-center fixed bottom-0 left-0 right-0">
      <div className="max-w-[700px] w-full mx-auto">
        <form onSubmit={onSubmit} className="flex gap-2 relative w-full">
          <Input
            type="text"
            name="task"
            className={cn('bg-white pr-10 h-12')}
            placeholder="Type task here"
            onChange={(e) => setTask(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="absolute right-0 top-0 h-12"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
