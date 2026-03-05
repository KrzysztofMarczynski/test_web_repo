# api/index.py
from fastapi import FastAPI, Request
from pydantic import BaseModel

app = FastAPI(title="Prosty Chat Backend")  # Tworzy aplikację FastAPI

# Model do odbierania danych (wiadomość od użytkownika)
class Message(BaseModel):
    text: str  # Pole 'text' typu string

# Endpoint /chat – odbiera POST z JSON { "text": "Twoja wiadomość" }
@app.post("/chat")
async def chat(message: Message):
    user_text = message.text  # Pobiera tekst od użytkownika
    response_text = f"Oto prosta odpowiedź: {user_text.upper()}! 😊"  # Symulacja AI – np. zamienia na duże litery
    return {"reply": response_text}  # Zwraca JSON z odpowiedzią

# Uruchomienie: uvicorn api.index:app --reload (w terminalu)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)