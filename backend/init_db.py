from app.db.session import engine
from app.db.base import Base

def init_db():
    print("Connecting to Database...")
    try:
        # Import models inside to avoid circular imports if any
        from app.db.base import Base
        print(f"Tables to create: {Base.metadata.tables.keys()}")
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully.")
    except Exception as e:
        print(f"Error creating tables: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    init_db()
