# Run this script ONLY ONCE to create the database tables and import data
import json
from app.database import SessionLocal
from app.models import Weapon, Armor

db = SessionLocal()

# ---- WEAPONS ----
with open("data/all_weapons_data.json", "r", encoding="utf-8") as f:
    weapons = json.load(f)

for w in weapons:
    db.merge(Weapon(
        id=w.get("id"),
        name=w.get("name"),
        description=w.get("description"),
        wiki_link=w.get("wiki_link"),
        image_path=w.get("image_path"),
        stats=w.get("stats"),
        locations=w.get("locations"),
        vocations=w.get("vocations"),
    ))

# ---- ARMOR ----
with open("data/all_armor_data.json", "r", encoding="utf-8") as f:
    armor_items = json.load(f)

for a in armor_items:
    db.merge(Armor(
        id=a.get("id"),
        name=a.get("name"),
        description=a.get("description"),
        wiki_link=a.get("wiki_link"),
        image_path=a.get("image_path"),
        stats=a.get("stats"),
        elemental_res=a.get("elemental_res"),
        debilitation_res=a.get("debilitation_res"),
        locations=a.get("locations"),
        vocations=a.get("vocations"),
    ))

db.commit()
db.close()

print("✅ Import complete")
