from fastapi import APIRouter, Depends, HTTPException, status, Response, Header, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Armor
from app.schemas import ArmorOut, ArmorCreate, ArmorUpdate, PaginationParams, PaginatedResponse
import os
from app.cache import armor_cache, armor_item_cache
import logging
from app.depends import admin_required

router = APIRouter(prefix="/armor", tags=["Armor"])


def model_to_dict(obj):
    # Convert SQLAlchemy model instance to dict using table columns
    try:
        return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}
    except Exception:
        return obj

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

logger = logging.getLogger(__name__)

@router.get("", response_model=PaginatedResponse)
def get_armor(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    cache_key = f"armor_page_{page}_limit_{limit}"
    if cache_key in armor_cache:
        logger.info("Cache hit for armor list page %s limit %s", page, limit)
        return armor_cache[cache_key]
    
    total = db.query(Armor).count()
    offset = (page - 1) * limit
    armor = db.query(Armor).offset(offset).limit(limit).all()
    
    pages = (total + limit - 1) // limit  # Ceiling division
    
    result = PaginatedResponse(
        items=[model_to_dict(a) for a in armor],
        total=total,
        page=page,
        limit=limit,
        pages=pages
    )
    
    logger.info("Cache miss for armor list page %s limit %s", page, limit)
    armor_cache[cache_key] = result
    
    return result


@router.get("/{armor_id}", response_model=ArmorOut)
def get_armor_item(armor_id: int, db: Session = Depends(get_db)):
    if armor_id in armor_item_cache:
        logger.info("Cache hit for armor list by id: %s", armor_id)
        return armor_item_cache[armor_id]
    
    armor = db.query(Armor).filter(Armor.id == armor_id).first()
    if not armor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Armor not found")
    
    armor_dict = model_to_dict(armor)
    logger.info("Cache miss for armor list by id: %s", armor_id)
    armor_item_cache[armor_id] = armor_dict
    return armor_dict


@router.post("", response_model=ArmorOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(admin_required)])
def create_armor(payload: ArmorCreate, db: Session = Depends(get_db)):
    db_armor = Armor(**payload.dict())
    db.add(db_armor)
    db.commit()
    db.refresh(db_armor)

    armor_cache.clear()  # Invalidate full list cache
    armor_item_cache[db_armor.id] = model_to_dict(db_armor)

    return db_armor


@router.patch("/{armor_id}", response_model=ArmorOut, dependencies=[Depends(admin_required)])
def update_armor(armor_id: int, payload: ArmorUpdate, db: Session = Depends(get_db)):
    update_data = payload.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields provided for update"
        )

    updated = (
        db.query(Armor)
        .filter(Armor.id == armor_id)
        .update(update_data, synchronize_session="fetch")
    )

    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Armor not found"
        )

    db.commit()

    armor_cache.clear()  # Invalidate full list cache
    armor_item_cache.pop(armor_id, None)

    return db.query(Armor).get(armor_id)



@router.delete("/{armor_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(admin_required)])
def delete_armor(armor_id: int, db: Session = Depends(get_db)):
    armor = db.query(Armor).filter(Armor.id == armor_id).first()
    if not armor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Armor not found")
    db.delete(armor)
    db.commit()

    armor_cache.clear()  # Invalidate full list cache
    armor_item_cache.pop(armor_id, None)
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)
