from pydantic import BaseModel
from typing import Any, Dict, List, Optional

class WeaponBase(BaseModel):
    name: str
    description: Optional[str] = None
    wiki_link: Optional[str] = None
    image_path: Optional[str] = None
    stats: Optional[Dict[str, Any]] = None
    locations: Optional[List[str]] = None
    vocations: Optional[List[str]] = None

class WeaponCreate(WeaponBase):
    pass

class WeaponUpdate(BaseModel):
    name: Optional[str] = None

class WeaponOut(WeaponBase):
    id: int

    class Config:
        orm_mode = True


class ArmorBase(BaseModel):
    name: str
    description: Optional[str] = None
    wiki_link: Optional[str] = None
    image_path: Optional[str] = None
    stats: Optional[Dict[str, Any]] = None
    elemental_res: Optional[Dict[str, Any]] = None
    debilitation_res: Optional[Dict[str, Any]] = None
    locations: Optional[List[str]] = None
    vocations: Optional[List[str]] = None


class ArmorCreate(ArmorBase):
    pass


class ArmorUpdate(BaseModel):
    name: Optional[str] = None

class ArmorOut(ArmorBase):
    id: int

    class Config:
        orm_mode = True
