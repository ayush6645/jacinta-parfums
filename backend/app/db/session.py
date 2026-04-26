from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import settings
import logging

# Configure DB Logging
logger = logging.getLogger("db_connection")
logger.setLevel(logging.INFO)

try:
    # Use SQLAlchemy 2.0 style engine
    engine = create_engine(
        settings.SQLALCHEMY_DATABASE_URI,
        pool_pre_ping=True,  # Health check for connection
        pool_size=10,
        max_overflow=20
    )
    logger.info("Database engine initialized successfully.")
except Exception as e:
    logger.error(f"Failed to initialize database engine: {e}")
    raise e

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    FastAPI dependency that provides a database session.
    Ensures the session is closed after the request is finished.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
