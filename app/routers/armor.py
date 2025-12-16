from fastapi import APIRouter, Depends, HTTPException, status, Response, Header
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Armor
from app.schemas import ArmorOut, ArmorCreate, ArmorUpdate
import os

router = APIRouter(prefix="/armor", tags=["Armor"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


ADMIN_TOKEN = os.getenv("ADMIN_TOKEN")


def admin_required(x_admin_token: str | None = Header(None, alias="X-Admin-Token")) -> bool:
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin token required")
    return True


@router.get("/", response_model=list[ArmorOut])
def get_armor(db: Session = Depends(get_db)):
    return db.query(Armor).all()


@router.get("/{armor_id}", response_model=ArmorOut)
def get_armor_item(armor_id: int, db: Session = Depends(get_db)):
    armor = db.query(Armor).filter(Armor.id == armor_id).first()
    if not armor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Armor not found")
    return armor


@router.post("/", response_model=ArmorOut, status_code=status.HTTP_201_CREATED)
def create_armor(payload: ArmorCreate, db: Session = Depends(get_db), _admin: bool = Depends(admin_required)):
    db_armor = Armor(**payload.dict())
    db.add(db_armor)
    db.commit()
    db.refresh(db_armor)
    return db_armor


@router.put("/{armor_id}", response_model=ArmorOut)
def update_armor(armor_id: int, payload: ArmorUpdate, db: Session = Depends(get_db), _admin: bool = Depends(admin_required)):
    armor = db.query(Armor).filter(Armor.id == armor_id).first()
    if not armor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Armor not found")
    update_data = payload.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(armor, key, value)
    db.add(armor)
    db.commit()
    db.refresh(armor)
    return armor


@router.delete("/{armor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_armor(armor_id: int, db: Session = Depends(get_db), _admin: bool = Depends(admin_required)):
    armor = db.query(Armor).filter(Armor.id == armor_id).first()
    if not armor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Armor not found")
    db.delete(armor)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
