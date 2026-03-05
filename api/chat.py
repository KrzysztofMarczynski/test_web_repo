# api/index.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Kolorowy Chat Backend")

# Dodajemy CORS – na wszelki wypadek (choć na Vercel często nie jest potrzebne)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # później zmień na konkretną domenę
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.get("/test")
async def test():
    return {"status": "Backend żyje! 😎"}

@app.post("/chat")
async def chat(message: Message):
    user_text = message.text
    response_text = f"Oto prosta odpowiedź: {user_text.upper()}! 😊"
    return {"reply": response_text}