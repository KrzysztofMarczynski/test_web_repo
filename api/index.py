from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Kolory Chat Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # potem zmień na https://twoja-domena.vercel.app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.get("/test")
async def test():
    return {"status": "Backend żyje! 😎"}

@app.post("/")  # ← ZMIANA: root zamiast "/api/index"
async def chat(message: Message):
    user_text = message.text
    response_text = f"Oto prosta odpowiedź: {user_text.upper()}! 😊"
    print(f"Otrzymano: {user_text}")  # ← pojawi się w logach Vercel!
    return {"reply": response_text}