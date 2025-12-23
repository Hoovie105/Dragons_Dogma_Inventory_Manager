from fastapi import APIRouter, Depends, HTTPException, status, Response, Header, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Weapon
from app.schemas import WeaponOut, WeaponCreate, WeaponUpdate, PaginatedResponse
import os
from app.cache import weapons_cache, weapon_item_cache
import logging
from app.depends import admin_required
import math

router = APIRouter(prefix="/weapons", tags=["Weapons"])

router = APIRouter(prefix="/weapons", tags=["Weapons"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

logger = logging.getLogger(__name__)

@router.get("/", response_model=PaginatedResponse)
def get_weapons(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    cache_key = f"page_{page}_limit_{limit}"
    if cache_key in weapons_cache:
        logger.info("Cache hit for weapons list: %s", cache_key)
        return weapons_cache[cache_key]

    # Get total count
    total = db.query(Weapon).count()
    total_pages = math.ceil(total / limit)

    # Validate page number
    if page > total_pages and total > 0:
        raise HTTPException(status_code=404, detail="Page not found")

    # Calculate offset
    offset = (page - 1) * limit

    # Get paginated weapons
    weapons = db.query(Weapon).offset(offset).limit(limit).all()

    result = PaginatedResponse(
        items=weapons,
        total=total,
        page=page,
        limit=limit,
        pages=total_pages
    )

    logger.info("Cache miss for weapons list: %s", cache_key)
    weapons_cache[cache_key] = result

    return result

@router.get("/{weapon_id}", response_model=WeaponOut)
def get_weapon(weapon_id: int, db: Session = Depends(get_db)):
    if weapon_id in weapon_item_cache:
        logger.info("Cache hit for weapons list by id: %s", weapon_id)
        return weapon_item_cache[weapon_id]

    weapon = db.query(Weapon).filter(Weapon.id == weapon_id).first()
    if not weapon:
        raise HTTPException(status_code=404, detail="Weapon not found")
    
    logger.info("Cache miss for weapons list by id: %s", weapon_id)
    weapon_item_cache[weapon_id] = weapon
    return weapon


@router.post("/", response_model=WeaponOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(admin_required)])
def create_weapon(payload: WeaponCreate, db: Session = Depends(get_db)):
    db_weapon = Weapon(**payload.dict())
    db.add(db_weapon)
    db.commit()
    db.refresh(db_weapon)

    weapons_cache.clear()              # invalidate list
    weapon_item_cache[db_weapon.id] = db_weapon

    return db_weapon


@router.patch("/{weapon_id}", response_model=WeaponOut, dependencies=[Depends(admin_required)])
def update_weapon(weapon_id: int, payload: WeaponUpdate, db: Session = Depends(get_db)):
    update_data = payload.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    weapon = (
        db.query(Weapon)
        .filter(Weapon.id == weapon_id)
        .update(update_data, synchronize_session="fetch")
    )

    if not weapon:
        raise HTTPException(status_code=404, detail="Weapon not found")

    db.commit()

    weapons_cache.clear()

    return db.query(Weapon).get(weapon_id)



@router.delete("/{weapon_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(admin_required)])
def delete_weapon(weapon_id: int, db: Session = Depends(get_db)):
    weapon = db.query(Weapon).filter(Weapon.id == weapon_id).first()
    if not weapon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Weapon not found")
    db.delete(weapon)
    db.commit()

    weapons_cache.clear()
    weapon_item_cache.pop(weapon_id, None)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
