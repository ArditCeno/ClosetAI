from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AnalyzeRequest(BaseModel):
    user_id: str


@router.post("/analyze-usage")
async def analyze_usage(request: AnalyzeRequest):
    return {
        "most_used": [
            {"type": "tshirt", "color": "white", "wear_count": 32},
            {"type": "jeans", "color": "blue", "wear_count": 28},
            {"type": "sneakers", "color": "white", "wear_count": 25},
        ],
        "forgotten": [
            {"type": "coat", "color": "gray", "days_unused": 240},
            {"type": "boots", "color": "brown", "days_unused": 180},
        ],
        "suggestions": [
            "Try pairing your gray coat with blue jeans for a fresh look",
            "Those brown boots would look great with dark chinos",
        ]
    }


@router.post("/pack")
async def pack_for_trip(request: dict):
    destination = request.get("destination", "Unknown")
    days = request.get("days", 3)
    weather = request.get("weather", "")

    outfits = []
    for day in range(1, days + 1):
        outfits.append({
            "day": day,
            "outfit": [
                {"type": "tshirt", "color": "white", "style": "casual"},
                {"type": "jeans", "color": "blue", "style": "casual"},
                {"type": "sneakers", "color": "white", "style": "casual"},
            ],
            "weather_tip": "Mild weather expected" if not weather else f"{weather} expected"
        })

    return {
        "destination": destination,
        "days": days,
        "outfits": outfits,
        "total_items": days * 3,
        "packing_tips": [
            "Roll clothes to save space",
            "Pack versatile items that mix and match",
            "Don't forget accessories",
        ]
    }
