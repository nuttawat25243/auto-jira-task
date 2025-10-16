<script setup lang="ts">
import type { TaskCardModel } from '~/composables/useTaskBoard'

const props = defineProps<{
  task: TaskCardModel
}>()

const priorityBadgeClass = computed(() =>
  ({
    Low: 'badge badge-low',
    Medium: 'badge badge-medium',
    High: 'badge badge-high',
    Critical: 'badge badge-critical'
  })[props.task.priority]
)
</script>

<template>
  <article class="task shadow-card">
    <header class="task__header">
      <div class="task__meta">
        <span class="task__id">{{ task.id }}</span>
        <span :class="priorityBadgeClass">{{ task.priority }}</span>
      </div>
      <h3>{{ task.title }}</h3>
      <p>{{ task.summary }}</p>
    </header>

    <div class="task__details">
      <div class="task__row">
        <div class="task__due" :class="{ 'task__due--danger': task.isDelayed }">
          <strong>{{ task.dueInLabel }}</strong>
          <span>ครบกำหนด {{ new Date(task.dueDate).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' }) }}</span>
        </div>
        <div class="task__points">
          <span class="badge badge-done">{{ task.storyPoints }} SP</span>
        </div>
      </div>

      <div class="task__row">
        <div class="task__assignee">
          <span class="task__avatar">{{ task.assignee.split(' ')[0][0] }}</span>
          <span class="task__name">{{ task.assignee }}</span>
        </div>
        <div v-if="task.dependencies?.length" class="task__deps">
          <span>พึ่งพา: {{ task.dependencies.join(', ') }}</span>
        </div>
      </div>

      <div class="task__tags">
        <span v-for="tag in task.tags" :key="tag" class="task__tag">#{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.task {
  border-radius: 18px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.6));
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.task__header h3 {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
}

.task__header p {
  margin: 0;
  color: #475569;
}

.task__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: #334155;
}

.task__id {
  letter-spacing: 0.08em;
  font-size: 0.85rem;
}

.task__details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.task__due {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  color: #1f2937;
}

.task__due--danger {
  color: #b91c1c;
}

.task__points {
  display: flex;
  align-items: center;
}

.task__assignee {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  color: #1e293b;
}

.task__avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: #1d4ed8;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.task__deps {
  font-size: 0.85rem;
  color: #475569;
}

.task__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.task__tag {
  background: rgba(30, 64, 175, 0.1);
  color: #1d4ed8;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
