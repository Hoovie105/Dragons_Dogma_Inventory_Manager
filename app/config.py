import os
from functools import lru_cache
from dotenv import load_dotenv

load_dotenv()


class Settings:
    # Security
    ADMIN_TOKEN: str | None = os.getenv("ADMIN_TOKEN")

    # Database
    DATABASE_URL: str | None = os.getenv("DATABASE_URL")

    # Cache
    CACHE_TTL_SECONDS: int = int(os.getenv("CACHE_TTL_SECONDS", 300))
    LIST_CACHE_MAXSIZE: int = int(os.getenv("LIST_CACHE_MAXSIZE", 50))
    ITEM_CACHE_MAXSIZE: int = int(os.getenv("ITEM_CACHE_MAXSIZE", 500))

    # CORS
    CORS_ORIGINS: list[str] = [
        o.strip() for o in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173,"
            "http://localhost:8080,http://127.0.0.1:8080,"
            "http://localhost:3000,http://127.0.0.1:3000,"
            "https://dragons-dogma-inventory-manager-1.onrender.com"
        ).split(",") if o.strip()
    ]

    # Environment
    ENV: str = os.getenv("ENV", "development")


@lru_cache
def get_settings() -> Settings:
    return Settings()
