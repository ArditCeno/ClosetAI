from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recognition, generator, chat

app = FastAPI(
    title="ClosetAI AI Service",
    description="AI service for clothing recognition, outfit generation, and fashion chat",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recognition.router, prefix="/recognize", tags=["Recognition"])
app.include_router(generator.router, prefix="/generate", tags=["Generator"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

@app.get("/health")
async def health():
    return {"status": "UP", "service": "ClosetAI AI Service", "version": "1.0.0"}
