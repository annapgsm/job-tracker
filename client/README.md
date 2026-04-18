# Job Tracker App

A full-stack job application tracker built from scratch to manage and visualize the entire job search process.

Designed and developed independently after completing a software engineering program, covering data modeling, API design, and frontend architecture.

## Overview

This application helps users manage their job search by organizing applications across different stages, tracking activity, and keeping all relevant information in one place.

The app includes both a **Kanban board** and a **list view**, along with an **archive system** for managing old applications without losing data.


## Live Demo

## Preview

### Kanban Board
![Kanban Board](./screenshots/kanban.png)

### Drag & Drop
![Drag and Drop](./screenshots/dragdrop.gif)

### Job Details
![Job Details](./screenshots/details.png)

### Table View
![Table View](./screenshots/table.png)

### Archive
![Archive](./screenshots/archive.png)

## Features

Full CRUD functionality for managing job applications via REST API
- Kanban board with drag and drop (HTML5 Drag & Drop API)
- Optimistic UI updates with backend synchronization
- Table view for structured comparison and quick scanning
- Detailed job view with structured sections (overview, notes, activity)
- Search and filtering using derived state (no duplicated data)
- Archive system (soft delete with restore + permanent delete)
- Activity tracking via `dateSaved` and `dateUpdated`

## Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- Custom CSS (no UI library)
- Axios

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
### Frontend
- React (Vite) with functional components and hooks
- Centralized state management in `App.jsx` (single source of truth)
- Derived state for filtering and sorting (no redundant state)
- Component-driven architecture:
  - KanbanBoard (drag & drop UI)
  - JobTable (list view)
  - JobForm (controlled inputs)
  - JobDetails (modal-based detail view)
  - Dialog (reusable modal wrapper)
  - Archive (soft-deleted jobs)
- Controlled forms with validation and loading states
- Event handling with propagation control (e.g. row click vs action buttons)

### Backend
- Node.js + Express REST API
- MongoDB Atlas with Mongoose
- Schema-based validation and defaults
- Route-based structure (controllers logic inline)

## Drag & Drop Logic

The Kanban board allows users to move job cards between stages and uses the HTML5 Drag & Drop API.

1. `dragstart`
   - Job ID is stored via `dataTransfer`
   - Local dragging state is set

2. `dragover`
   - Column allows drop via `preventDefault`
   - Active column state is updated for visual feedback

3. `drop`
   - Job ID is retrieved
   - `onMoveJob(jobId, newStatus)` is triggered

4. Optimistic update
   - UI updates immediately
   - `dateUpdated` is set locally

5. Backend sync
   - PUT request persists new status
   - Response replaces local job data

6. Error handling
   - On failure, previous state is restored
## Setup

#### Clone the repository

```bash
  git clone <your-repo-url>
  cd job-tracker
```
#### Install Dependencies

```bash
cd server
npm install

cd ../client
npm install
```

#### Environment variables: 

Create a .env file in the server folder:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
#### Run the App: 

Backend: 
```bash
cd server
npm run dev
```
Frontend: 
```bash
cd client
npm run dev
```
## Learnings

- Managing complex UI state in React while keeping a single source of truth
- Using derived state for filtering and sorting instead of duplicating data
- Implementing optimistic UI updates with proper rollback on failure
- Handling drag & drop interactions without breaking click behavior (event propagation)
- Designing product-like UX patterns such as soft delete (archive) instead of hard delete
- Structuring a full-stack app with clear separation between UI, logic, and data
- Thinking beyond CRUD by focusing on real-world user workflows and interactions