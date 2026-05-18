# GigFlow - Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with TypeScript.

## Features
- **Authentication**: JWT-based secure login and registration with Role-Based Access Control (Admin / Sales User).
- **Leads Management**: Full CRUD operations for managing leads.
- **Advanced Filtering & Search**: Filter by status, source, and search by name/email (debounced).
- **Pagination**: Server-side pagination.
- **Export**: Export leads to CSV.

## Tech Stack
- **Frontend**: React.js, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (optional, but recommended)
- MongoDB (if running locally without Docker)

### Running with Docker
1. Clone the repository.
2. Rename \`.env.example\` to \`.env\` in the root directory (optional for Docker, as it uses defaults from \`docker-compose.yml\`).
3. Run \`docker-compose up --build\`.
4. The frontend will be available at \`http://localhost:5173\` and the backend at \`http://localhost:5000\`.

### Running Locally (Without Docker)
#### Backend Setup
1. \`cd backend\`
2. \`npm install\`
3. Create a \`.env\` file based on \`.env.example\`.
4. \`npm run dev\`

#### Frontend Setup
1. \`cd frontend\`
2. \`npm install\`
3. Create a \`.env\` file with \`VITE_API_URL=http://localhost:5000/api\`.
4. \`npm run dev\`
