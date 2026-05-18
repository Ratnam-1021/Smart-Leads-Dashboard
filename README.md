# GigFlow - Smart Leads Dashboard

A full-stack, highly scalable Lead Management Dashboard built using the MERN stack with TypeScript, designed with a premium, tech-forward aesthetic.

## 🚀 Features

- **Premium UI/UX**: Designed with a sophisticated "ServiceHive-inspired" dark aesthetic, featuring animated parallax starfields, glassmorphism, and a highly responsive animated Welcome page.
- **Authentication**: JWT-based secure login and registration with Role-Based Access Control (Admin / Sales User).
- **Leads Management**: Full CRUD operations for managing leads via an intuitive, modal-based interface.
- **Advanced Filtering & Search**: Filter leads by status (New, Contacted, Qualified, Lost), source, and perform lightning-fast debounced searches by name or email.
- **Pagination**: Server-side pagination for optimal performance with large datasets.
- **Data Export**: Seamlessly export leads to a CSV file for external reporting.

## 💻 Tech Stack

- **Frontend**: React.js, TypeScript, TailwindCSS v4, Vite, Zustand (State Management), Lucide React (Icons).
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, bcryptjs.
- **Deployment & Containerization**: Docker, Render (Backend), Vercel (Frontend).

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (optional, but recommended)
- MongoDB (if running locally without Docker)

### Running with Docker
1. Clone the repository.
2. Rename `.env.example` to `.env` in the root directory (optional for Docker, as it uses defaults from `docker-compose.yml`).
3. Run `docker-compose up --build`.
4. The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

### Running Locally (Without Docker)

#### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on `.env.example`.
4. `npm run dev`

#### Frontend Setup
1. `cd frontend`
2. `npm install`
3. Create a `.env` file with `VITE_API_URL=http://localhost:5000/api`.
4. `npm run dev`

## 🌟 Highlights
- **Performance**: Optimized rendering using React best practices, debounced API calls, and fully responsive CSS grid/flexbox layouts.
- **Design Consistency**: Implements a consistent design system (`#030712` base, bright blue accents, white typography) across all authentication and dashboard screens.
