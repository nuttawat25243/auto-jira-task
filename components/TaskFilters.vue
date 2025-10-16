<script setup lang="ts">
import type { FilterState } from '~/composables/useTaskBoard'
import type { TaskPriority, TaskStatus } from '~/types/task'

const props = defineProps<{
  modelValue: FilterState
  statusOptions: TaskStatus[]
  priorityOptions: TaskPriority[]
  tagOptions: string[]
  assigneeOptions: string[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: FilterState): void
  (event: 'reset'): void
}>()

const localFilters = computed({
  get: () => props.modelValue,
  set: (value: FilterState) => emit('update:modelValue', value)
})

type MultiKey = 'statuses' | 'priorities' | 'tags' | 'assignees'

const updateMultiSelect = (key: MultiKey, value: string) => {
  const set = new Set(localFilters.value[key])
  if (set.has(value)) {
    set.delete(value)
  } else {
    set.add(value)
  }

  emit('update:modelValue', {
    ...localFilters.value,
    [key]: Array.from(set)
  } as FilterState)
}

const updateSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', {
    ...localFilters.value,
    search: target.value
  })
}

const toggleDelayed = () => {
  emit('update:modelValue', {
    ...localFilters.value,
    onlyDelayed: !localFilters.value.onlyDelayed
  })
}

const resetFilters = () => emit('reset')
</script>

<template>
  <section class="filters glass-panel shadow-card">
    <div class="filters__row">
      <label class="filters__label" for="task-search">ค้นหา</label>
      <input
        id="task-search"
        class="filters__search"
        type="search"
        placeholder="ค้นหาด้วยชื่อ, assignee หรือแท็ก"
        :value="localFilters.search"
        @input="updateSearch"
      >
      <button type="button" class="filters__reset" @click="resetFilters">ล้างตัวกรอง</button>
    </div>

    <div class="filters__grid">
      <div class="filters__group">
        <h3>สถานะ</h3>
        <div class="filters__options">
          <button
            v-for="status in statusOptions"
            :key="status"
            type="button"
            class="filters__chip"
            :class="{ 'filters__chip--active': localFilters.statuses.includes(status) }"
            @click="updateMultiSelect('statuses', status)"
          >
            {{ status }}
          </button>
        </div>
      </div>

      <div class="filters__group">
        <h3>ความสำคัญ</h3>
        <div class="filters__options">
          <button
            v-for="priority in priorityOptions"
            :key="priority"
            type="button"
            class="filters__chip"
            :class="{ 'filters__chip--active': localFilters.priorities.includes(priority) }"
            @click="updateMultiSelect('priorities', priority)"
          >
            {{ priority }}
          </button>
        </div>
      </div>

      <div class="filters__group">
        <h3>แท็ก</h3>
        <div class="filters__options filters__options--wrap">
          <button
            v-for="tag in tagOptions"
            :key="tag"
            type="button"
            class="filters__chip"
            :class="{ 'filters__chip--active': localFilters.tags.includes(tag) }"
            @click="updateMultiSelect('tags', tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div class="filters__group">
        <h3>ผู้รับผิดชอบ</h3>
        <div class="filters__options filters__options--wrap">
          <button
            v-for="assignee in assigneeOptions"
            :key="assignee"
            type="button"
            class="filters__chip"
            :class="{ 'filters__chip--active': localFilters.assignees.includes(assignee) }"
            @click="updateMultiSelect('assignees', assignee)"
          >
            {{ assignee }}
          </button>
        </div>
      </div>
    </div>

    <div class="filters__footer">
      <label class="filters__toggle">
        <input type="checkbox" :checked="localFilters.onlyDelayed" @change="toggleDelayed">
        แสดงเฉพาะงานที่เลยกำหนด
      </label>
    </div>
  </section>
</template>

<style scoped>
.filters {
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.filters__row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filters__label {
  font-weight: 600;
}

.filters__search {
  flex: 1;
  min-width: 16rem;
  border-radius: 12px;
  border: 1px solid #cbd5f5;
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.filters__search:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.filters__reset {
  border: none;
  background: #f1f5f9;
  color: #1d4ed8;
  border-radius: 999px;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  cursor: pointer;
}

.filters__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.filters__group h3 {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
}

.filters__options {
  display: flex;
  gap: 0.5rem;
}

.filters__options--wrap {
  flex-wrap: wrap;
}

.filters__chip {
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  background: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filters__chip--active {
  background: #1d4ed8;
  color: #fff;
  border-color: #1d4ed8;
  box-shadow: 0 6px 18px -10px rgba(29, 78, 216, 0.6);
}

.filters__footer {
  display: flex;
  justify-content: flex-end;
}

.filters__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #334155;
}

@media (max-width: 720px) {
  .filters__grid {
    grid-template-columns: 1fr;
  }
}
</style>
