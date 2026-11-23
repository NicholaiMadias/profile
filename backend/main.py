from fastapi import FastAPI, Depends, HTTPException, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
import os
import models
from database import engine, get_db
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials, firestore

# Initialise Firebase Admin SDK – expects GOOGLE_APPLICATION_CREDENTIALS env var
if not firebase_admin._apps:
    firebase_admin.initialize_app()

# Firestore client for blog posts, etc.
firestore_db = firestore.client()

# -------------------------------------------------
# Initialise the SQLite database (creates tables)
# -------------------------------------------------
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Amazing Grace LMS API")

# -------------------------------------------------
# CORS – allow local front‑end requests during dev
# -------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    # Browser origins must be explicitly configured for production; no wildcard
    # access to an API that processes authorization tokens and user records.
    allow_origins=[origin.strip() for origin in os.environ.get(
        "LMS_ALLOWED_ORIGINS", "http://localhost:3000"
    ).split(",") if origin.strip()],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)

# -------------------------------------------------
# Helper – verify Firebase ID token from Authorization header
# -------------------------------------------------
async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    id_token = auth_header.split(" ")[1]
    try:
        decoded = firebase_auth.verify_id_token(id_token)
        return decoded  # contains uid, email, name, etc.
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase ID token")


def require_owner(current_user: dict, user_id: str):
    if current_user.get("uid") != user_id and current_user.get("admin") is not True:
        raise HTTPException(status_code=403, detail="Not authorized for this account")


def require_admin(current_user: dict = Depends(get_current_user)):
    if current_user.get("admin") is not True:
        raise HTTPException(status_code=403, detail="Administrator permission required")
    return current_user

# -------------------------------------------------
# Pydantic Schemas
# -------------------------------------------------
class SyncRequest(BaseModel):
    user_id: str = Field(min_length=1, max_length=128)
    added_xp: int = Field(ge=0, le=1000)
    # Credit issuance must come from a trusted server-side award, not a client.
    added_credits: int = Field(default=0, ge=0, le=0)
    game_state_passport: dict

class LessonCompletionRequest(BaseModel):
    user_id: str = Field(min_length=1, max_length=128)
    module_id: str = Field(min_length=1, max_length=128)
    score: int = Field(ge=0, le=100)
    passed: bool

class BlogPostRequest(BaseModel):
    title: str = Field(min_length=1, max_length=180)
    content: str = Field(min_length=1, max_length=20000)
    # client sends the Firebase ID token in the Authorization header

# -------------------------------------------------
# API Endpoints
# -------------------------------------------------
@app.get("/api/users/{user_id}/profile")
def get_profile(
    user_id: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Return only this account's LMS profile (or an administrator's)."""
    require_owner(current_user, user_id)
    progress = (
        db.query(models.UserProgress)
        .filter(models.UserProgress.user_id == user_id)
        .first()
    )
    if not progress:
        return {"xp": 0, "level": 1, "signal_credits": 0, "passport": {}}
    return {
        "xp": progress.total_xp,
        "level": progress.level,
        "signal_credits": progress.signal_bonus_credits,
        "passport": progress.game_state_passport,
    }

@app.post("/api/progress/sync")
def sync_progress(
    req: SyncRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Store this account's progress; do not allow client-issued credits."""
    require_owner(current_user, req.user_id)
    progress = (
        db.query(models.UserProgress)
        .filter(models.UserProgress.user_id == req.user_id)
        .first()
    )
    if not progress:
        progress = models.UserProgress(
            user_id=req.user_id,
            total_xp=req.added_xp,
            signal_bonus_credits=req.added_credits,
            game_state_passport=req.game_state_passport,
        )
        db.add(progress)
    else:
        progress.total_xp += req.added_xp
        progress.signal_bonus_credits += req.added_credits
        progress.game_state_passport = req.game_state_passport
        progress.level = (progress.total_xp // 500) + 1
    db.commit()
    return {"message": "Progress synced", "current_xp": progress.total_xp, "level": progress.level}

@app.post("/api/store/topup")
def topup_credits(
    user_id: str,
    amount: int = Query(ge=1, le=10000),
    current_user: dict = Depends(require_admin),
    db: Session = Depends(get_db),
):
    # Explicit server-verified custom claim; possession of a user ID is not permission.
    progress = (
        db.query(models.UserProgress)
        .filter(models.UserProgress.user_id == user_id)
        .first()
    )
    if not progress:
        raise HTTPException(status_code=404, detail="User not found. Complete a lesson first.")
    progress.signal_bonus_credits += amount
    db.commit()
    return {"new_balance": progress.signal_bonus_credits}

# -------------------------------------------------
# Leaderboard endpoint – top users by total XP
# -------------------------------------------------
@app.get("/api/leaderboard")
def get_leaderboard(limit: int = Query(default=10, ge=1, le=100), db: Session = Depends(get_db)):
    rows = (
        db.query(models.UserProgress)
        .order_by(models.UserProgress.total_xp.desc())
        .limit(limit)
        .all()
    )
    return [
        {"user_id": r.user_id, "xp": r.total_xp, "level": r.level, "credits": r.signal_bonus_credits}
        for r in rows
    ]

# -------------------------------------------------
# Lessons endpoints – list & record completion
# -------------------------------------------------
LESSON_CATALOG = [
    {"id": "matrix-1", "title": "Matrix Basics", "description": "Intro to signal‑keeper role"},
    {"id": "code-matrix-1", "title": "Code Matrix Level 1", "description": "Pattern matching puzzle"},
    {"id": "vim-defense-1", "title": "VIM Defense Intro", "description": "Bash navigation tutorial"},
]

@app.get("/api/lessons")
def list_lessons():
    return LESSON_CATALOG

@app.post("/api/lessons/completion")
def record_lesson_completion(
    req: LessonCompletionRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    require_owner(current_user, req.user_id)
    # Ensure user record exists (creates a dummy User if missing)
    user = db.query(models.User).filter(models.User.id == req.user_id).first()
    if not user:
        user = models.User(id=req.user_id, email="unknown")
        db.add(user)
        db.commit()
        db.refresh(user)
    # Record or update LessonCompletion
    lc = (
        db.query(models.LessonCompletion)
        .filter(models.LessonCompletion.user_id == req.user_id, models.LessonCompletion.module_id == req.module_id)
        .first()
    )
    if not lc:
        lc = models.LessonCompletion(
            user_id=req.user_id,
            module_id=req.module_id,
            score=req.score,
            passed=req.passed,
        )
        db.add(lc)
    else:
        lc.score = max(lc.score, req.score)
        lc.passed = lc.passed or req.passed
    db.commit()
    return {"message": "Lesson completion recorded"}

# -------------------------------------------------
# Blog post endpoint – store article with author metadata
# -------------------------------------------------
@app.post("/api/blog/post")
async def create_blog_post(req: BlogPostRequest, current_user: dict = Depends(get_current_user)):
    """Store a blog article only for a verified editor or administrator."""
    if current_user.get("admin") is not True and current_user.get("editor") is not True:
        raise HTTPException(status_code=403, detail="Editor permission required")
    doc = {
        "title": req.title,
        "content": req.content,
        "author_uid": current_user.get("uid"),
        "author_name": current_user.get("name", current_user.get("email", "")),
        "timestamp": firestore.SERVER_TIMESTAMP,
    }
    firestore_db.collection("blog_posts").add(doc)
    return {"message": "Blog post saved", "author": doc["author_name"]}
