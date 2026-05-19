# 🐉 Dragon’s Dogma Inventory Manager

A full-stack web application for browsing and managing **Dragon’s Dogma** equipment data, including armor and weapons.  
The project is fully **Dockerized** and designed for easy local development and deployment. Here is also the public
render website: https://dragons-dogma-inventory-manager-1.onrender.com/

---

## ✨ Features

- 📦 Browse armor and weapon data from Dragon’s Dogma
- 🧙 Equipment categorized by armor and weapon type
- ⚡ Fast API responses with in-memory caching
- 🖼️ Images served statically via stored image paths
- 🐳 Dockerized frontend, backend, and database
- 📖 Interactive API documentation via Swagger

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS / shadcn-ui
- Docker

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- In-memory caching
- Docker

### Database
- PostgreSQL
- Stores equipment metadata (armor & weapons)
- Image paths stored as references (images served statically)

---

## 📁 Project Structure
```bash

Dragons_Dogma_Inventory_Manager/
│
├── backend/
│ ├── app/
│ ├── Dockerfile.backend
│ ├── requirements.txt
│ └── ...
│
├── frontend/
│ ├── src/
│ ├── Dockerfile.frontend
│ ├── package.json
│ └── ...
│
├── docker-compose.yml
└── README.md
```
---

## 🚀 Getting Started

### Prerequisites

- Docker
- Docker Compose

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Hoovie105/Dragons_Dogma_Inventory_Manager.git
cd Dragons_Dogma_Inventory_Manager
2️⃣ Build and Run the Application
bash
Copy code
docker compose up --build
This will start:

Frontend

Backend API

PostgreSQL database

3️⃣ Access the Application
Service	URL
Frontend	http://localhost:3000
Backend API	http://localhost:8000
API Docs (Swagger)	http://localhost:8000/docs
```
---

🧠 Caching Strategy

Uses in-memory caching for armor and weapon data

Optimized for a single-instance deployment

Cache is populated on first request and reused

Cache is cleared automatically on application restart or data updates

This approach keeps responses fast while avoiding unnecessary infrastructure.

---

🖼 Image Handling

Images are not stored in the database

PostgreSQL stores only image paths

Images are served statically from the filesystem or public directory

Improves performance and keeps the database lightweight

---

🐳 Docker Overview

Backend
Python 3.11

FastAPI served via Uvicorn

SQLAlchemy for database access

Frontend
Vite + React build

Optimized production bundle

Docker Compose
Orchestrates frontend, backend, and database

Handles networking between services

Suitable for local development and deployment

---

🌍 Deployment

The project is designed to run as a single instance and can be deployed on:

Render

Linode

Any Docker-compatible VPS

Recommended deployment setup:

One backend instance

Managed PostgreSQL

Static image serving via web server or CDN

---

🔮 Future Improvements

User authentication

Saved equipment loadouts

Advanced filtering and search

Redis caching (for multi-instance scaling)

CDN integration for images

---

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a new branch

Commit your changes

Open a Pull Request

---

📜 License
This project is currently unlicensed.

All Dragon’s Dogma content and assets belong to Capcom.
