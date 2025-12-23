from cachetools import TTLCache
from app.config import get_settings

settings = get_settings()

# Cache for full lists
weapons_cache = TTLCache(
    maxsize=settings.LIST_CACHE_MAXSIZE,
    ttl=settings.CACHE_TTL_SECONDS
)

armor_cache = TTLCache(
    maxsize=settings.LIST_CACHE_MAXSIZE,
    ttl=settings.CACHE_TTL_SECONDS
)

# Cache for individual items
weapon_item_cache = TTLCache(
    maxsize=settings.ITEM_CACHE_MAXSIZE,
    ttl=settings.CACHE_TTL_SECONDS
)

armor_item_cache = TTLCache(
    maxsize=settings.ITEM_CACHE_MAXSIZE,
    ttl=settings.CACHE_TTL_SECONDS
)
