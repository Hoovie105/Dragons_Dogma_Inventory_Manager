# DDAA Frontend (Vite + React)

This frontend is a small React app to recreate the equipment manager UI and consume the existing FastAPI backend at `http://localhost:8000`.

Quick start:

1. cd frontend
2. npm install
3. npm run dev

Notes:
- The backend must allow CORS from the frontend dev origin (vite usually runs on `http://localhost:5173`).
- The frontend expects the following endpoints:
  - `GET /weapons` (list)
  - `GET /weapons/{id}` (detail)
  - `GET /armor` (list)
  - `GET /armor/{id}` (detail)

You can set the backend base URL via the `VITE_API_BASE` env var when running the dev server, e.g. `VITE_API_BASE=http://localhost:8000 npm run dev`.
