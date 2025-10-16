import { computed, ref } from 'vue'
import { differenceInCalendarDays, format, isBefore, isWithinInterval, parseISO } from 'date-fns'
import { tasks, statusOrder, priorityOrder } from '~/data/tasks'
import type { Task, TaskPriority, TaskStatus } from '~/types/task'

export interface FilterState {
  search: string
  statuses: TaskStatus[]
  priorities: TaskPriority[]
  tags: string[]
  assignees: string[]
  onlyDelayed: boolean
}

interface StatusColumn {
  status: TaskStatus
  label: string
  description: string
  tasks: TaskCardModel[]
}

export interface TaskCardModel extends Task {
  isDelayed: boolean
  dueInLabel: string
}

interface BoardSummary {
  total: number
  completed: number
  completionRate: number
  overdue: number
  nextDue?: { id: string; title: string; dueDate: string; assignee: string }
  workload: Array<{ assignee: string; total: number }>
}

const statusDescriptions: Record<TaskStatus, string> = {
  Backlog: 'Ideas and user stories waiting to be prioritised.',
  'In Progress': 'Currently owned by the team and being worked on.',
  Review: 'Awaiting peer review, QA, or approval.',
  Blocked: 'Requires attention before it can continue.',
  Done: 'Shipped to production and verified.'
}

const initialFilterState: FilterState = {
  search: '',
  statuses: [],
  priorities: [],
  tags: [],
  assignees: [],
  onlyDelayed: false
}

const toDueLabel = (task: Task) => {
  const today = new Date()
  const dueDate = parseISO(task.dueDate)
  const diff = differenceInCalendarDays(dueDate, today)

  if (diff === 0) {
    return 'Due today'
  }

  if (diff > 0) {
    return `Due in ${diff} day${diff === 1 ? '' : 's'}`
  }

  return `${Math.abs(diff)} day${diff === -1 ? '' : 's'} overdue`
}

const isTaskDelayed = (task: Task) => {
  const today = new Date()
  return task.status !== 'Done' && isBefore(parseISO(task.dueDate), today)
}

const decorateTask = (task: Task): TaskCardModel => ({
  ...task,
  isDelayed: isTaskDelayed(task),
  dueInLabel: toDueLabel(task)
})

const filterTasks = (source: Task[], filters: FilterState) => {
  const search = filters.search.trim().toLowerCase()

  return source.filter((task) => {
    if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) {
      return false
    }

    if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) {
      return false
    }

    if (filters.tags.length > 0 && !filters.tags.every((tag) => task.tags.includes(tag))) {
      return false
    }

    if (filters.assignees.length > 0 && !filters.assignees.includes(task.assignee)) {
      return false
    }

    if (filters.onlyDelayed && !isTaskDelayed(task)) {
      return false
    }

    if (search.length > 0) {
      const haystack = `${task.id} ${task.title} ${task.summary} ${task.assignee} ${task.tags.join(' ')}`.toLowerCase()
      if (!haystack.includes(search)) {
        return false
      }
    }

    return true
  })
}

const createSummary = (items: TaskCardModel[]): BoardSummary => {
  const total = items.length
  const completed = items.filter((task) => task.status === 'Done').length
  const overdue = items.filter((task) => task.isDelayed).length
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)

  const upcoming = items
    .filter((task) => task.status !== 'Done' && !task.isDelayed)
    .filter((task) => {
      const now = new Date()
      const dueDate = parseISO(task.dueDate)
      return isWithinInterval(dueDate, { start: now, end: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7) })
    })
    .sort((a, b) => (isBefore(parseISO(a.dueDate), parseISO(b.dueDate)) ? -1 : 1))

  const workloadMap = new Map<string, number>()
  for (const task of items.filter((task) => task.status !== 'Done')) {
    workloadMap.set(task.assignee, (workloadMap.get(task.assignee) ?? 0) + 1)
  }

  const nextDue = upcoming[0]
    ? {
        id: nextDueTaskId(upcoming[0]),
        title: upcoming[0].title,
        dueDate: format(parseISO(upcoming[0].dueDate), 'd MMM'),
        assignee: upcoming[0].assignee
      }
    : undefined

  return {
    total,
    completed,
    completionRate,
    overdue,
    nextDue,
    workload: Array.from(workloadMap.entries()).map(([assignee, total]) => ({ assignee, total }))
  }
}

const nextDueTaskId = (task: TaskCardModel) => `${task.id}`

export const useTaskBoard = () => {
  const filters = ref<FilterState>({ ...initialFilterState })

  const allTasks = computed(() => tasks.map(decorateTask))

  const filtered = computed(() => filterTasks(allTasks.value, filters.value))

  const statusColumns = computed<StatusColumn[]>(() =>
    statusOrder.map((status) => ({
      status,
      label: status,
      description: statusDescriptions[status],
      tasks: filtered.value.filter((task) => task.status === status)
    }))
  )

  const summary = computed(() => createSummary(filtered.value))

  const statusOptions = computed(() => statusOrder)
  const priorityOptions = computed(() => priorityOrder)
  const tagOptions = computed(() =>
    Array.from(new Set(tasks.flatMap((task) => task.tags))).sort((a, b) => a.localeCompare(b))
  )
  const assigneeOptions = computed(() =>
    Array.from(new Set(tasks.map((task) => task.assignee))).sort((a, b) => a.localeCompare(b))
  )

  const updateFilters = (payload: FilterState) => {
    filters.value = { ...payload }
  }

  const resetFilters = () => {
    filters.value = { ...initialFilterState }
  }

  return {
    filters,
    statusColumns,
    summary,
    statusOptions,
    priorityOptions,
    tagOptions,
    assigneeOptions,
    updateFilters,
    resetFilters
  }
}
