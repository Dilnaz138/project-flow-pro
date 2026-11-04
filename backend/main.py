
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://projectflow-ai-dilnaz.netlify.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskRequest(BaseModel):
    task: str

@app.get("/")
def home():
    return {"message": "ProjectFlow AI backend is running!"}

@app.post("/suggest")
def suggest(request: TaskRequest):
    return {
        "suggestion": f"Start by breaking '{request.task}' into 3 smaller steps."
    }
