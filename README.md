# Auto Jira Task Frontend

Nuxt 3 single page application that visualises Auto Jira tasks in a Kanban-style dashboard optimised for Thai product teams.

## Getting started

```bash
npm install
npm run dev
```

The development server will be available at `http://localhost:3000`.

## Features

- 📊 At-a-glance summary with total items, completion ratio, overdue count, and upcoming deadline preview.
- 🔍 Rich filters (search, status, priority, tag, assignee, overdue toggle) with Thai copy.
- 🗂️ Responsive kanban columns with detailed cards showing story points, due status, assignee avatar, and dependencies.
- 🎨 Polished glassmorphism-inspired styling built with vanilla CSS.

## Tech stack

- [Nuxt 3](https://nuxt.com/) with TypeScript strict mode
- Static data powered by composables and computed properties
- [date-fns](https://date-fns.org/) for deadline calculations
