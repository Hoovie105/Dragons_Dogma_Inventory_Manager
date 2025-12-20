from cachetools import TTLCache

# Cache for full lists
weapons_cache = TTLCache(maxsize=1, ttl=300)  # 5 minutes
armor_cache = TTLCache(maxsize=1, ttl=300)

# Cache for individual items
weapon_item_cache = TTLCache(maxsize=500, ttl=300)
armor_item_cache = TTLCache(maxsize=500, ttl=300)
