# ClosetAI — Your AI Fashion Wardrobe

> **An immersive 3D wardrobe experience powered by artificial intelligence.**

ClosetAI transforms your digital wardrobe into a photorealistic 3D dressing room. Browse, scan, and organize your clothing collection through an interactive environment where the wardrobe itself is the interface.

---

## ✨ Features

### 🏛️ Immersive 3D Wardrobe
- **7 interactive sections**: Overview, Jackets, Shoes, Accessories, Profile, AI Stylist, Fitting Room
- **Cinematic camera** with smooth cubic-easing transitions
- **Dynamic lighting** that responds to your current section
- **Interactive objects**: hangers that swing, shoes that rotate, mirrors that shimmer
- **Post-processing effects**: Bloom, Vignette for a cinematic feel
- **Fog, shadows, and procedural floor textures** for realism

### 🔍 AI Clothing Recognition
- **TensorFlow.js MobileNet v2** — 88-93% accuracy directly in the browser
- **Clarifai Fashion Model** — 95-98% accuracy (optional API key)
- **Google Vision API** — fallback recognition service
- **Smart color extraction** — k-means clustering to detect dominant colors
- **Weighted voting** across top-5 predictions for reliable classification
- **40+ clothing categories** and 20 color standards

### 📸 Scan & Organize
- **Real camera integration** on web (getUserMedia) and mobile (expo-camera)
- **AI-powered scanning** with HUD overlay
- **Automatic categorization** of scanned items
- **Save to digital wardrobe** with one tap

### 👔 Wardrobe Management
- **Category-based shelves** (Shirts, Pants, Jackets, Shoes, Accessories)
- **Visual clothing racks** with hanging items
- **Interactive drawers** with hidden accessories
- **Recent activity tracking**

### 🤖 AI Stylist
- **Smart mirror interface** in the 3D wardrobe
- **Occasion-based outfit generation**
- **Fashion chat** with AI suggestions
- **Style tips and recommendations**

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React Native + Expo SDK 57 |
| **3D Engine** | Three.js + @react-three/fiber + @react-three/drei |
| **Post-processing** | @react-three/postprocessing (Bloom + Vignette) |
| **AI/ML** | TensorFlow.js + MobileNet v2 |
| **Styling** | NativeWind v4 (Tailwind CSS) |
| **Animations** | React Native Reanimated v4 |
| **Navigation** | Expo Router (file-based routing) |
| **Backend** | Spring Boot 4.0 (Java 21) |
| **AI Service** | FastAPI (Python) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 20
npm >= 10
Java 21 (for backend)
Python 3.11+ (for ai-service)
```

### Mobile App

```bash
cd mobile
npm install
npx expo start --web     # Web browser
npx expo start --android  # Android
npx expo start --ios      # iOS
```

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### AI Service

```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## 🗺️ Project Structure

```
ClosetAI/
├── mobile/                          # React Native + Expo app
│   ├── app/                         # Expo Router screens
│   │   ├── (auth)/                  # Login & Register
│   │   ├── (tabs)/                  # Main tab screens
│   │   ├── wardrobe3d.tsx           # 3D Experience entry
│   │   └── _layout.tsx              # Root layout
│   ├── components/
│   │   ├── wardrobe/                # 3D wardrobe scene
│   │   │   ├── WardrobeExperience.tsx
│   │   │   ├── CameraRig.tsx        # Cinematic camera
│   │   │   ├── Room.tsx             # 3D room environment
│   │   │   ├── Hotspot.tsx          # Interactive markers
│   │   │   ├── HUD.tsx              # Heads-up display
│   │   │   ├── sections.ts          # 7 section definitions
│   │   │   └── objects/             # 3D objects
│   │   │       ├── JacketRack.tsx
│   │   │       ├── ShoeWall.tsx
│   │   │       ├── AccessoryTable.tsx
│   │   │       ├── Mirrors.tsx
│   │   │       ├── FittingArea.tsx
│   │   │       └── Decor.tsx
│   │   ├── PalaceDoors.tsx          # Login door animation
│   │   ├── Login3DBackground.tsx    # 3D login scene
│   │   └── ...                      # UI components
│   ├── hooks/
│   │   └── useAIVision.ts           # TensorFlow.js + API recognition
│   ├── services/
│   │   ├── supabase.ts              # Database client
│   │   └── recognition.ts           # External API recognition
│   ├── store/
│   │   └── index.ts                 # Zustand auth store
│   └── utils/
│       └── theme.ts                 # Premium color palette
├── backend/                         # Spring Boot API
│   └── src/main/java/...            # Java backend
├── ai-service/                      # FastAPI AI service
│   ├── main.py
│   ├── routers/
│   └── requirements.txt
└── README.md
```

---

## 🎯 Future Roadmap

### Phase 1: AI Agent — 95%+ Recognition Accuracy 🧠

**Goal:** Achieve industry-leading clothing recognition accuracy.

- **Clarifai Fashion Model integration** — dedicated fashion recognition with 98% accuracy
- **Custom fine-tuned model** — train a YOLOv8/ResNet model on a curated fashion dataset
- **Multi-model ensemble** — combine MobileNet + Clarifai + custom model with weighted voting
- **Real-time confidence scoring** — display confidence per attribute (type, color, fabric, fit)
- **Image preprocessing pipeline** — auto-crop, lighting correction, background removal
- **Barcode/QR tag scanning** — instant exact match for tagged items

```
📸 Capture → Preprocess → Ensemble Models → Weighted Vote → 95%+ Result
```

### Phase 2: Weather Integration 🌤️

**Goal:** Smart outfit suggestions based on real-time weather.

- **OpenWeatherMap / WeatherAPI integration** — fetch current & forecast data
- **Temperature-based recommendations** — suggest warm/cool outfits
- **Rain/snow detection** — recommend appropriate outerwear
- **UV index alerts** — suggest sun protection
- **Seasonal wardrobe rotation** — auto-hide out-of-season clothes
- **"Is this appropriate today?"** — AI evaluates your selected outfit against weather

```
📍 Location → 🌡️ Weather API → 🧠 AI Analysis → 👔 Outfit Suggestion
```

### Phase 3: Wear History & Analytics 📊

**Goal:** Track when and how often you wear each item.

- **Last worn tracking** — automatic + manual logging per item
- **Frequency analytics** — most/least worn items, cost-per-wear
- **Outfit repetition detection** — avoid wearing the same combination too often
- **Style evolution timeline** — see how your style changes over seasons
- **AI "You haven't worn this in 3 months"** — rediscovery notifications
- **Photo history** — see how an item looks in different outfits over time

### Phase 4: Smart Shopping Assistant 🛍️

**Goal:** Complete your wardrobe intelligently.

- **Gap analysis** — AI identifies missing essentials in your wardrobe
- **Outfit completion suggestions** — "You have the shirt, but these pants would complete the look"
- **Color palette matching** — recommend items that match your existing colors
- **Style consistency** — AI learns your style and suggests compatible items
- **Budget-aware recommendations** — set price ranges for suggestions
- **Affiliate product links** — direct links to purchase recommended items

### Phase 5: Social & Sharing 👥

- **Outfit of the day (OOTD) sharing** — share looks with friends
- **Community style challenges**
- **Celebrity look matching** — "Find items in my closet similar to this celebrity outfit"
- **Collaborative wardrobes** — family/shared wardrobe management

---

## 📄 License

MIT © 2025 Ardit Ceno

