export type TaskStatus = 'Backlog' | 'In Progress' | 'Review' | 'Blocked' | 'Done'
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical'

export interface Task {
  id: string
  title: string
  summary: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string
  dueDate: string
  tags: string[]
  storyPoints: number
  createdAt: string
  updatedAt: string
  dependencies?: string[]
}
