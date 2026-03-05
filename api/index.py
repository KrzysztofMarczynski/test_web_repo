from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Kolory Chat Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # później możesz ograniczyć do domeny
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str


@app.get("/api/test")
async def test():
    return {"status": "Backend żyje! 😎"}


@app.post("/api/chat")
async def chat(message: Message):
    user_text = message.text
    response_text = f"Oto prosta odpowiedź: {user_text.upper()}! 😊"

    print(f"Otrzymano wiadomość: {user_text}")

    return {
        "reply": response_text
    }