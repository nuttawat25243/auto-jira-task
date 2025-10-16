<script setup lang="ts">
import type { FilterState } from '~/composables/useTaskBoard'

const props = defineProps<{
  summary: {
    total: number
    completed: number
    completionRate: number
    overdue: number
    nextDue?: { id: string; title: string; dueDate: string; assignee: string }
    workload: Array<{ assignee: string; total: number }>
  }
  activeFilters: FilterState
}>()

const activeFilterCount = computed(() => {
  const { search, statuses, priorities, tags, assignees, onlyDelayed } = props.activeFilters
  let count = 0
  if (search.trim().length > 0) count += 1
  count += statuses.length + priorities.length + tags.length + assignees.length
  if (onlyDelayed) count += 1
  return count
})

const columns: Array<{ label: string; value: string; highlight?: boolean }> = computed(() => [
  { label: 'Total tasks', value: String(props.summary.total) },
  { label: 'Completed', value: `${props.summary.completed} (${props.summary.completionRate}%)`, highlight: true },
  { label: 'Overdue', value: String(props.summary.overdue) }
])

const workloadTooltip = computed(() =>
  props.summary.workload.length === 0
    ? 'No work in progress'
    : props.summary.workload.map((item) => `${item.assignee}: ${item.total}`).join(', ')
)
</script>

<template>
  <section class="summary glass-panel shadow-card">
    <header class="summary__header">
      <div>
        <h1>Auto Jira Task Board</h1>
        <p>Stay on top of product delivery with a Nuxt 3 dashboard optimised for Thai agile teams.</p>
      </div>
      <div class="summary__filters">
        <span class="filters-pill">{{ activeFilterCount }} active filter{{ activeFilterCount === 1 ? '' : 's' }}</span>
      </div>
    </header>

    <div class="summary__grid">
      <div v-for="item in columns" :key="item.label" class="summary__card" :class="{ 'summary__card--highlight': item.highlight }">
        <span class="summary__label">{{ item.label }}</span>
        <strong class="summary__value">{{ item.value }}</strong>
      </div>

      <div class="summary__card summary__card--wide">
        <span class="summary__label">Next due</span>
        <div v-if="summary.nextDue" class="summary__next">
          <strong>{{ summary.nextDue.title }}</strong>
          <span>Due {{ summary.nextDue.dueDate }} · {{ summary.nextDue.assignee }}</span>
        </div>
        <div v-else class="summary__empty">No upcoming deadlines in the next 7 days</div>
      </div>

      <div class="summary__card">
        <span class="summary__label">Workload</span>
        <strong class="summary__value" :title="workloadTooltip">
          {{ summary.workload.length ? summary.workload.map((item) => item.assignee.split(' ')[0]).join(', ') : 'All clear' }}
        </strong>
      </div>
    </div>
  </section>
</template>

<style scoped>
.summary {
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.summary__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
}

.summary__header h1 {
  font-size: 2rem;
  margin: 0 0 0.35rem;
}

.summary__header p {
  margin: 0;
  color: #4b5563;
  max-width: 48rem;
}

.summary__filters {
  display: flex;
  gap: 0.5rem;
}

.filters-pill {
  background: #dbeafe;
  color: #1e3a8a;
  border-radius: 999px;
  padding: 0.375rem 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.summary__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.summary__card {
  background: linear-gradient(145deg, rgba(248, 250, 252, 0.9), rgba(226, 232, 240, 0.75));
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid rgba(148, 163, 184, 0.25);
  position: relative;
  overflow: hidden;
}

.summary__card--highlight {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #f8fafc;
}

.summary__card--highlight .summary__label {
  color: rgba(226, 232, 240, 0.85);
}

.summary__card--wide {
  grid-column: span 2;
}

.summary__label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
}

.summary__value {
  font-size: 1.65rem;
}

.summary__next {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary__next strong {
  font-size: 1.05rem;
}

.summary__empty {
  color: #64748b;
  font-style: italic;
}

@media (max-width: 960px) {
  .summary__header {
    flex-direction: column;
    align-items: stretch;
  }

  .summary__card--wide {
    grid-column: span 1;
  }
}
</style>
