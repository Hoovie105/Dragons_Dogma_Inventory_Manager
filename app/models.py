from sqlalchemy import (
    Column, Integer, String, Text, Numeric, JSON, ARRAY, ForeignKey
)
from app.database import Base

class Weapon(Base):
    __tablename__ = "weapons"

    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    description = Column(Text)
    wiki_link = Column(Text)
    image_path = Column(Text)
    stats = Column(JSON)             
    locations = Column(ARRAY(Text))
    vocations = Column(ARRAY(Text))


class Armor(Base):
    __tablename__ = "armor"

    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    description = Column(Text)
    wiki_link = Column(Text)
    image_path = Column(Text)
    stats = Column(JSON)              
    elemental_res = Column(JSON)
    debilitation_res = Column(JSON)
    locations = Column(ARRAY(Text))
    vocations = Column(ARRAY(Text))
