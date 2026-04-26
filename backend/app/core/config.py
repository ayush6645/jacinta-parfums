from typing import List, Union
from pydantic import AnyHttpUrl, validator, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "JΛCINTΛ Luxury Perfume API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    
    # DATABASE
    SQLALCHEMY_DATABASE_URI: str = os.getenv("DATABASE_URL")

    # STORAGE (Adjusted for cloud-agnostic runtime)
    BASE_RUNTIME_DIR: str = os.getenv("RUNTIME_DIR", "E:\\Perfume_Project")
    UPLOAD_DIR: str = os.path.join(BASE_RUNTIME_DIR, "uploads")
    LOG_DIR: str = os.path.join(BASE_RUNTIME_DIR, "logs")

    # RAZORPAY
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID")
    RAZORPAY_KEY_SECRET: str = os.getenv("RAZORPAY_KEY_SECRET")
    RAZORPAY_WEBHOOK_SECRET: str = os.getenv("RAZORPAY_WEBHOOK_SECRET")

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://jacinta-luxury.vercel.app", # Placeholder for your Vercel URL
    ]

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and v == "*":
            return ["*"]
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="ignore")

settings = Settings()
