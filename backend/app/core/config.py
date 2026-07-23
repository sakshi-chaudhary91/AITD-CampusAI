import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Backend root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

# Gemini Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-3.6-flash"

# Project Paths
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
VECTOR_STORE_PATH = os.path.join(BASE_DIR, "vector_store")

# Create folders if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(VECTOR_STORE_PATH, exist_ok=True)