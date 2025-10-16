import type { Task } from '~/types/task'

export const tasks: Task[] = [
  {
    id: 'AT-101',
    title: 'Implement OAuth login flow',
    summary: 'Add Google Workspace OAuth to allow single sign-on for customers.',
    status: 'In Progress',
    priority: 'Critical',
    assignee: 'Somchai B.',
    dueDate: '2024-05-18',
    tags: ['authentication', 'security'],
    storyPoints: 8,
    createdAt: '2024-04-01',
    updatedAt: '2024-05-10',
    dependencies: ['AT-096']
  },
  {
    id: 'AT-095',
    title: 'Create reporting dashboard widgets',
    summary: 'Design reusable widgets for burn-down, velocity, and capacity metrics.',
    status: 'Backlog',
    priority: 'Medium',
    assignee: 'Suchada P.',
    dueDate: '2024-06-02',
    tags: ['analytics', 'ui'],
    storyPoints: 5,
    createdAt: '2024-04-22',
    updatedAt: '2024-04-25'
  },
  {
    id: 'AT-087',
    title: 'Sprint planning assistant prompts',
    summary: 'Experiment with AI prompts that summarize backlog context for PMs.',
    status: 'Review',
    priority: 'High',
    assignee: 'Krit S.',
    dueDate: '2024-05-14',
    tags: ['research', 'ml'],
    storyPoints: 3,
    createdAt: '2024-03-30',
    updatedAt: '2024-05-11'
  },
  {
    id: 'AT-082',
    title: 'Notification preference matrix',
    summary: 'Allow fine-grained control of Jira sync notifications per project.',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Yada T.',
    dueDate: '2024-05-20',
    tags: ['settings', 'ux'],
    storyPoints: 5,
    createdAt: '2024-04-12',
    updatedAt: '2024-05-08'
  },
  {
    id: 'AT-079',
    title: 'Offline caching strategy',
    summary: 'Investigate strategies for offline editing with eventual consistency.',
    status: 'Backlog',
    priority: 'Low',
    assignee: 'Apinya N.',
    dueDate: '2024-06-14',
    tags: ['architecture'],
    storyPoints: 2,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-21'
  },
  {
    id: 'AT-071',
    title: 'Integrate feedback form',
    summary: 'Embed contextual feedback in the Auto Jira sidebar with analytics.',
    status: 'Review',
    priority: 'Medium',
    assignee: 'Suchada P.',
    dueDate: '2024-05-12',
    tags: ['feedback', 'ui'],
    storyPoints: 3,
    createdAt: '2024-04-02',
    updatedAt: '2024-05-10'
  },
  {
    id: 'AT-063',
    title: 'Kanban board export',
    summary: 'Allow exporting board snapshots as CSV and PNG for reporting.',
    status: 'Blocked',
    priority: 'High',
    assignee: 'Somchai B.',
    dueDate: '2024-05-09',
    tags: ['export', 'ui'],
    storyPoints: 8,
    createdAt: '2024-02-17',
    updatedAt: '2024-05-07',
    dependencies: ['AT-071']
  },
  {
    id: 'AT-054',
    title: 'Calendar integration MVP',
    summary: 'Sync due dates to Google Calendar and Microsoft Outlook accounts.',
    status: 'Done',
    priority: 'Medium',
    assignee: 'Pimchanok C.',
    dueDate: '2024-04-28',
    tags: ['integration'],
    storyPoints: 13,
    createdAt: '2024-02-01',
    updatedAt: '2024-04-28'
  }
]

export const statusOrder: Task['status'][] = ['Backlog', 'In Progress', 'Review', 'Blocked', 'Done']
export const priorityOrder: Task['priority'][] = ['Low', 'Medium', 'High', 'Critical']
