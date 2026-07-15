from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class RecognizeRequest(BaseModel):
    image_url: str


MOCK_RESPONSES = {
    "tshirt": {"type": "tshirt", "color": "white", "style": "casual", "season": "summer", "brand": "Unknown"},
    "shirt": {"type": "shirt", "color": "blue", "style": "formal", "season": "all", "brand": "Unknown"},
    "jeans": {"type": "jeans", "color": "blue", "style": "casual", "season": "all", "brand": "Levi's"},
    "jacket": {"type": "jacket", "color": "black", "style": "casual", "season": "winter", "brand": "Nike"},
    "sneakers": {"type": "sneakers", "color": "white", "style": "casual", "season": "all", "brand": "Adidas"},
    "dress": {"type": "dress", "color": "red", "style": "elegant", "season": "summer", "brand": "Zara"},
    "pants": {"type": "pants", "color": "black", "style": "formal", "season": "all", "brand": "H&M"},
    "shorts": {"type": "shorts", "color": "khaki", "style": "casual", "season": "summer", "brand": "Unknown"},
    "coat": {"type": "coat", "color": "gray", "style": "formal", "season": "winter", "brand": "Zara"},
    "boots": {"type": "boots", "color": "brown", "style": "casual", "season": "winter", "brand": "Timberland"},
}


@router.post("")
async def recognize_clothing(request: RecognizeRequest):
    import random
    keys = list(MOCK_RESPONSES.keys())
    mock_type = random.choice(keys)
    return MOCK_RESPONSES[mock_type]
