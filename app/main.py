from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import weapons, armor
import os


app = FastAPI(title="Dragon's Dogma Equipment Manager")

# Configure CORS. Set the env var `CORS_ORIGINS` to a comma-separated list
# (for example: http://localhost:5173,http://localhost:3000) to override defaults.
_cors_env = os.getenv("CORS_ORIGINS")
if _cors_env:
	origins = [o.strip() for o in _cors_env.split(",") if o.strip()]
else:
	origins = [
		"http://localhost:5173",
		"http://127.0.0.1:5173",
		"http://localhost:8080",
		"http://127.0.0.1:8080",
		"http://localhost:3000",
		"http://127.0.0.1:3000",
	]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


app.include_router(weapons.router)
app.include_router(armor.router)
