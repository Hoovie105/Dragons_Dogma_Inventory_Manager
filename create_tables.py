# Run this script ONLY ONCE to create the database tables
from app.database import engine
from app.models import Base

Base.metadata.create_all(bind=engine)

print("✅ Tables created")
