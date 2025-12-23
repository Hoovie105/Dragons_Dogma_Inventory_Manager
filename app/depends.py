from app.config import get_settings
from fastapi import Header, HTTPException, status

settings = get_settings()
ADMIN_TOKEN = settings.ADMIN_TOKEN

def admin_required(
    x_admin_token: str | None = Header(None, alias="X-Admin-Token")
) -> bool:
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin token required"
        )
    return True
