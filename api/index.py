# api/index.py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Kolorowy Chat Backend")

class Message(BaseModel):
    text: str

@app.post("/chat")
async def chat(message: Message):
    user_text = message.text
    response_text = f"Oto prosta odpowiedź: {user_text.upper()}! 😊"   # ← tu później wrzucisz prawdziwe AI (z api key)
    return {"reply": response_text}