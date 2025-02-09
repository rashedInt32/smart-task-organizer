export type Task = {
  title: string
  date: string
  time: string
  priority: string
  status?: string
  helper?: string
}

export function parseTask(task: string): Task | null {
  const taskJson = task.split('```json')[1].split('```')[0]
  if (!taskJson) return null
  return JSON.parse(taskJson)
}

export const getDataFromOpenAI = async (input: string) => {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: input }),
  })

  const data = await res.json()
  const response = parseTask(data.response)
  return response
}
