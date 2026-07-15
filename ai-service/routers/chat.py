from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    user_id: str


RESPONSES = {
    "interview": "For a job interview, I recommend:\n\n👔 A crisp blue or white shirt\n👖 Dark navy or black pants\n👞 Classic leather shoes\n🧥 A blazer for a polished look\n\nKeep it professional and minimal.",
    "date": "For a date, try:\n\n👕 A fitted dark shirt or blouse\n👖 Well-fitting jeans or a skirt\n👟 Clean sneakers or loafers\n\nAdd a jacket for extra style points!",
    "weather": "Dress for the weather:\n\n❄️ Cold (below 10°C): Coat, scarf, boots\n🌤️ Mild (10-20°C): Light jacket, layers\n☀️ Warm (20°C+): Light fabrics, breathable materials",
    "default": "I can help you with:\n\n👔 Outfit suggestions for any occasion\n🌤️ Weather-appropriate dressing\n🧳 Packing for trips\n💡 Style tips and advice\n\nWhat would you like help with?"
}


@router.post("")
async def chat(request: ChatRequest):
    msg = request.message.lower()

    if "interview" in msg:
        reply = RESPONSES["interview"]
    elif "date" in msg:
        reply = RESPONSES["date"]
    elif "weather" in msg or "cold" in msg or "hot" in msg or "rain" in msg:
        reply = RESPONSES["weather"]
    elif "style" in msg or "fashion" in msg or "wear" in msg or "outfit" in msg:
        reply = "Based on current trends, I'd suggest:\n\n🎨 Neutral colors with one statement piece\n👟 Comfortable but stylish footwear\n💍 Minimal accessories for a clean look\n\nWant me to generate a specific outfit?"
    else:
        reply = RESPONSES["default"]

    return {
        "reply": reply,
        "suggestions": ["Try an outfit", "Check weather", "Style tips"]
    }
