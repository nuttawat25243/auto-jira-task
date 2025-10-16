<script setup lang="ts">
const {
  filters,
  statusColumns,
  summary,
  statusOptions,
  priorityOptions,
  tagOptions,
  assigneeOptions,
  updateFilters,
  resetFilters
} = useTaskBoard()

const filterProxy = computed({
  get: () => filters.value,
  set: (value) => updateFilters(value)
})
</script>

<template>
  <main class="page">
    <BoardSummary :summary="summary" :active-filters="filters" />

    <TaskFilters
      v-model="filterProxy"
      :status-options="statusOptions"
      :priority-options="priorityOptions"
      :tag-options="tagOptions"
      :assignee-options="assigneeOptions"
      @reset="resetFilters"
    />

    <section class="board">
      <StatusColumn
        v-for="column in statusColumns"
        :key="column.status"
        :status="column.status"
        :description="column.description"
        :tasks="column.tasks"
      />
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 2.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.75rem;
}

@media (max-width: 960px) {
  .page {
    padding: 2.5rem 1.5rem 3rem;
  }

  .board {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}
</style>
