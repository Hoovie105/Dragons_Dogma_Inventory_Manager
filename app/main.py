from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import weapons, armor
from app.config import get_settings
import logging


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

settings = get_settings()

app = FastAPI(title="Dragon's Dogma Equipment Manager")

# Configure CORS. Set the env var `CORS_ORIGINS` to a comma-separated list
# (for example: http://localhost:5173,http://localhost:3000) to override defaults.
app.add_middleware(
	CORSMiddleware,
	allow_origins=settings.CORS_ORIGINS,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


app.include_router(weapons.router)
app.include_router(armor.router)
