# api/index.py (cały plik – zastąp stary)
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Kolorowy Chat Backend")

class Message(BaseModel):
    text: str

@app.get("/test")  # ← NOWY: prosty test – otwórz w przeglądarce twojadomena.vercel.app/api/test
async def test():
    return {"status": "Backend żyje! 😎"}

@app.post("/chat")
async def chat(message: Message):
    user_text = message.text
    response_text = f"Oto prosta odpowiedź: {user_text.upper()}! 😊"
    return {"reply": response_text}