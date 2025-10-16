<script setup lang="ts">
import type { TaskCardModel } from '~/composables/useTaskBoard'
import type { TaskStatus } from '~/types/task'

const props = defineProps<{
  status: TaskStatus
  description: string
  tasks: TaskCardModel[]
}>()

const statusAccent: Record<TaskStatus, string> = {
  Backlog: '#f97316',
  'In Progress': '#2563eb',
  Review: '#7c3aed',
  Blocked: '#dc2626',
  Done: '#16a34a'
}
</script>

<template>
  <section class="column glass-panel">
    <header class="column__header" :style="{ borderColor: statusAccent[status] }">
      <div>
        <h2>{{ status }}</h2>
        <p>{{ description }}</p>
      </div>
      <span class="column__count">{{ tasks.length }}</span>
    </header>

    <div v-if="tasks.length" class="column__tasks">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
    <div v-else class="column__empty">
      <p>ยังไม่มีงานในสถานะนี้</p>
    </div>
  </section>
</template>

<style scoped>
.column {
  border-radius: 20px;
  padding: 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(248, 250, 252, 0.7);
}

.column__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid transparent;
}

.column__header h2 {
  margin: 0 0 0.35rem;
}

.column__header p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.column__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  background: rgba(30, 64, 175, 0.12);
  color: #1e3a8a;
  font-weight: 700;
}

.column__tasks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.column__empty {
  padding: 1.25rem;
  border-radius: 16px;
  background: rgba(241, 245, 249, 0.75);
  color: #475569;
  text-align: center;
  font-weight: 500;
}
</style>
