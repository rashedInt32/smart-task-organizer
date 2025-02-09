import { create } from 'zustand'
import { Task } from '@/lib/db/types'

type State = {
  tasks: Task[]
}

type Actions = {
  setTasks: (tasks: Task[]) => void
}

export const useStore = create<State & Actions>()((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks }),
}))
