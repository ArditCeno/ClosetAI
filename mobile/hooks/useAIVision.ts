import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';

export interface RecognitionResult {
  type: string;
  category: string;
  color: string;
  colorHex: string;
  fabric: string;
  fit: string;
  confidence: number;
  attributes: string[];
  allPredictions: { label: string; prob: number }[];
}

const COLORS = [
  { name: 'Black', r: 0, g: 0, b: 0 },
  { name: 'White', r: 245, g: 245, b: 245 },
  { name: 'Navy', r: 20, g: 30, b: 80 },
  { name: 'Gray', r: 128, g: 128, b: 128 },
  { name: 'Blue', r: 40, g: 80, b: 200 },
  { name: 'Red', r: 200, g: 30, b: 30 },
  { name: 'Green', r: 40, g: 140, b: 40 },
  { name: 'Brown', r: 120, g: 60, b: 20 },
  { name: 'Beige', r: 210, g: 190, b: 160 },
  { name: 'Pink', r: 230, g: 150, b: 160 },
  { name: 'Purple', r: 120, g: 40, b: 140 },
  { name: 'Yellow', r: 220, g: 200, b: 30 },
  { name: 'Orange', r: 220, g: 120, b: 30 },
  { name: 'Burgundy', r: 100, g: 20, b: 30 },
  { name: 'Olive', r: 100, g: 110, b: 30 },
  { name: 'Cream', r: 240, g: 230, b: 200 },
  { name: 'Coral', r: 230, g: 120, b: 100 },
  { name: 'Lavender', r: 180, g: 150, b: 200 },
  { name: 'Teal', r: 20, g: 130, b: 120 },
  { name: 'Maroon', r: 100, g: 20, b: 30 },
];

const CLOTHING_DB: Record<string, { category: string; fabric: string; fit: string; weight: number }> = {
  // Tops
  'tee': { category: 'T-Shirt', fabric: 'Cotton', fit: 'Regular', weight: 1 },
  't-shirt': { category: 'T-Shirt', fabric: 'Cotton', fit: 'Regular', weight: 1 },
  'jersey': { category: 'T-Shirt', fabric: 'Cotton', fit: 'Regular', weight: 0.8 },
  'shirt': { category: 'Shirt', fabric: 'Cotton', fit: 'Slim Fit', weight: 1 },
  'oxford': { category: 'Shirt', fabric: 'Cotton', fit: 'Slim Fit', weight: 0.9 },
  'blouse': { category: 'Shirt', fabric: 'Silk', fit: 'Fitted', weight: 0.8 },
  'polo': { category: 'Polo', fabric: 'Cotton', fit: 'Regular', weight: 0.9 },
  'vest': { category: 'Vest', fabric: 'Cotton', fit: 'Slim Fit', weight: 0.7 },
  'tank': { category: 'Tank Top', fabric: 'Cotton', fit: 'Regular', weight: 0.8 },
  'camisole': { category: 'Tank Top', fabric: 'Silk', fit: 'Regular', weight: 0.7 },
  'crop': { category: 'Top', fabric: 'Cotton', fit: 'Fitted', weight: 0.6 },
  'top': { category: 'Top', fabric: 'Cotton', fit: 'Regular', weight: 0.3 },

  // Jackets & Coats
  'jacket': { category: 'Jacket', fabric: 'Polyester', fit: 'Regular', weight: 1 },
  'blazer': { category: 'Blazer', fabric: 'Wool', fit: 'Tailored', weight: 0.9 },
  'suit': { category: 'Suit', fabric: 'Wool', fit: 'Tailored', weight: 0.8 },
  'coat': { category: 'Coat', fabric: 'Wool', fit: 'Regular', weight: 1 },
  'bomber': { category: 'Jacket', fabric: 'Nylon', fit: 'Regular', weight: 0.8 },
  'denim jacket': { category: 'Jacket', fabric: 'Denim', fit: 'Regular', weight: 0.8 },
  'leather jacket': { category: 'Jacket', fabric: 'Leather', fit: 'Regular', weight: 0.8 },
  'parka': { category: 'Coat', fabric: 'Nylon', fit: 'Regular', weight: 0.7 },
  'trench': { category: 'Coat', fabric: 'Cotton', fit: 'Regular', weight: 0.7 },
  'windbreaker': { category: 'Jacket', fabric: 'Nylon', fit: 'Regular', weight: 0.7 },
  'raincoat': { category: 'Coat', fabric: 'Nylon', fit: 'Regular', weight: 0.6 },

  // Sweaters & Hoodies
  'hoodie': { category: 'Hoodie', fabric: 'Fleece', fit: 'Regular', weight: 1 },
  'hoody': { category: 'Hoodie', fabric: 'Fleece', fit: 'Regular', weight: 0.9 },
  'sweatshirt': { category: 'Sweatshirt', fabric: 'Fleece', fit: 'Regular', weight: 0.9 },
  'sweater': { category: 'Sweater', fabric: 'Wool', fit: 'Regular', weight: 1 },
  'jumper': { category: 'Sweater', fabric: 'Wool', fit: 'Regular', weight: 0.9 },
  'cardigan': { category: 'Cardigan', fabric: 'Wool', fit: 'Regular', weight: 0.8 },
  'knit': { category: 'Sweater', fabric: 'Wool', fit: 'Regular', weight: 0.7 },
  'pullover': { category: 'Sweater', fabric: 'Cotton', fit: 'Regular', weight: 0.7 },

  // Pants
  'jeans': { category: 'Jeans', fabric: 'Denim', fit: 'Regular', weight: 1 },
  'denim': { category: 'Jeans', fabric: 'Denim', fit: 'Regular', weight: 0.9 },
  'trousers': { category: 'Pants', fabric: 'Cotton', fit: 'Slim Fit', weight: 1 },
  'pants': { category: 'Pants', fabric: 'Cotton', fit: 'Slim Fit', weight: 1 },
  'chinos': { category: 'Chinos', fabric: 'Cotton', fit: 'Slim Fit', weight: 0.9 },
  'khakis': { category: 'Chinos', fabric: 'Cotton', fit: 'Regular', weight: 0.8 },
  'slacks': { category: 'Pants', fabric: 'Wool', fit: 'Slim Fit', weight: 0.7 },
  'leggings': { category: 'Leggings', fabric: 'Spandex', fit: 'Fitted', weight: 0.8 },
  'shorts': { category: 'Shorts', fabric: 'Cotton', fit: 'Regular', weight: 1 },
  'bermuda': { category: 'Shorts', fabric: 'Cotton', fit: 'Regular', weight: 0.7 },
  'cargo': { category: 'Pants', fabric: 'Cotton', fit: 'Regular', weight: 0.6 },
  'sweatpants': { category: 'Sweatpants', fabric: 'Fleece', fit: 'Regular', weight: 0.7 },
  'joggers': { category: 'Sweatpants', fabric: 'Cotton', fit: 'Regular', weight: 0.7 },

  // Dresses & Skirts
  'dress': { category: 'Dress', fabric: 'Polyester', fit: 'Fitted', weight: 1 },
  'gown': { category: 'Dress', fabric: 'Polyester', fit: 'Fitted', weight: 0.8 },
  'maxi': { category: 'Dress', fabric: 'Cotton', fit: 'Regular', weight: 0.7 },
  'skirt': { category: 'Skirt', fabric: 'Cotton', fit: 'Regular', weight: 1 },
  'mini': { category: 'Skirt', fabric: 'Cotton', fit: 'Regular', weight: 0.7 },
  'midi': { category: 'Skirt', fabric: 'Cotton', fit: 'Regular', weight: 0.6 },

  // Shoes
  'sneaker': { category: 'Sneakers', fabric: 'Leather', fit: 'Regular', weight: 1 },
  'trainer': { category: 'Sneakers', fabric: 'Leather', fit: 'Regular', weight: 0.8 },
  'shoe': { category: 'Shoes', fabric: 'Leather', fit: 'Regular', weight: 0.5 },
  'boot': { category: 'Boots', fabric: 'Leather', fit: 'Regular', weight: 1 },
  'loafer': { category: 'Loafers', fabric: 'Leather', fit: 'Regular', weight: 0.9 },
  'heel': { category: 'Heels', fabric: 'Leather', fit: 'Regular', weight: 0.9 },
  'pump': { category: 'Heels', fabric: 'Leather', fit: 'Regular', weight: 0.7 },
  'sandal': { category: 'Sandals', fabric: 'Leather', fit: 'Regular', weight: 0.8 },
  'flip-flop': { category: 'Sandals', fabric: 'Rubber', fit: 'Regular', weight: 0.7 },
  'oxford shoe': { category: 'Shoes', fabric: 'Leather', fit: 'Regular', weight: 0.8 },
  'moccasin': { category: 'Loafers', fabric: 'Leather', fit: 'Regular', weight: 0.6 },
  'slipper': { category: 'Slippers', fabric: 'Cotton', fit: 'Regular', weight: 0.6 },

  // Accessories
  'belt': { category: 'Belt', fabric: 'Leather', fit: 'One Size', weight: 1 },
  'hat': { category: 'Hat', fabric: 'Cotton', fit: 'One Size', weight: 1 },
  'cap': { category: 'Hat', fabric: 'Cotton', fit: 'One Size', weight: 0.8 },
  'beanie': { category: 'Hat', fabric: 'Wool', fit: 'One Size', weight: 0.7 },
  'scarf': { category: 'Scarf', fabric: 'Wool', fit: 'One Size', weight: 1 },
  'bag': { category: 'Bag', fabric: 'Leather', fit: 'One Size', weight: 1 },
  'handbag': { category: 'Bag', fabric: 'Leather', fit: 'One Size', weight: 0.8 },
  'backpack': { category: 'Bag', fabric: 'Nylon', fit: 'One Size', weight: 0.9 },
  'watch': { category: 'Watch', fabric: 'Metal', fit: 'One Size', weight: 1 },
  'tie': { category: 'Tie', fabric: 'Silk', fit: 'One Size', weight: 1 },
  'glove': { category: 'Gloves', fabric: 'Leather', fit: 'One Size', weight: 0.9 },
  'sunglasses': { category: 'Sunglasses', fabric: 'Plastic', fit: 'One Size', weight: 0.8 },
  'necklace': { category: 'Jewelry', fabric: 'Metal', fit: 'One Size', weight: 0.6 },
  'ring': { category: 'Jewelry', fabric: 'Metal', fit: 'One Size', weight: 0.5 },
  'earring': { category: 'Jewelry', fabric: 'Metal', fit: 'One Size', weight: 0.5 },
  'bracelet': { category: 'Jewelry', fabric: 'Metal', fit: 'One Size', weight: 0.5 },
  'umbrella': { category: 'Accessory', fabric: 'Nylon', fit: 'One Size', weight: 0.4 },
  'wallet': { category: 'Wallet', fabric: 'Leather', fit: 'One Size', weight: 0.7 },
};

function preprocessImage(img: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const size = 224;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  let srcW: number, srcH: number;
  if (img instanceof HTMLVideoElement) {
    srcW = img.videoWidth;
    srcH = img.videoHeight;
  } else {
    srcW = img.width;
    srcH = img.height;
  }

  const minDim = Math.min(srcW, srcH);
  const sx = (srcW - minDim) / 2;
  const sy = (srcH - minDim) / 2;
  ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
  return canvas;
}

function extractDominantColor(imageData: ImageData): { name: string; hex: string; confidence: number } {
  const data = imageData.data;
  const clusters: Map<string, { r: number; g: number; b: number; count: number }> = new Map();

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    let minDist = Infinity;
    let bestColor = COLORS[0];

    for (const color of COLORS) {
      const dist = Math.sqrt((r - color.r) ** 2 + (g - color.g) ** 2 + (b - color.b) ** 2);
      if (dist < minDist) {
        minDist = dist;
        bestColor = color;
      }
    }

    const existing = clusters.get(bestColor.name);
    if (existing) {
      existing.count++;
    } else {
      clusters.set(bestColor.name, { r: bestColor.r, g: bestColor.g, b: bestColor.b, count: 1 });
    }
  }

  let maxCount = 0;
  let dominant = COLORS[0];
  let totalPixels = 0;

  for (const [, cluster] of clusters) {
    totalPixels += cluster.count;
    if (cluster.count > maxCount) {
      maxCount = cluster.count;
      dominant = COLORS.find(c => c.r === cluster.r && c.g === cluster.g && c.b === cluster.b) || COLORS[0];
    }
  }

  const confidence = Math.round((maxCount / totalPixels) * 100);
  const hex = `#${dominant.r.toString(16).padStart(2, '0')}${dominant.g.toString(16).padStart(2, '0')}${dominant.b.toString(16).padStart(2, '0')}`;

  return { name: dominant.name, hex, confidence };
}

function matchClothingWeighted(predictions: { className: string; probability: number }[]): {
  category: string; fabric: string; fit: string; confidence: number; type: string; allLabels: string[];
} {
  const scores: Record<string, { totalWeight: number; totalProb: number; count: number; fabric: string; fit: string }> = {};

  for (const pred of predictions) {
    const className = pred.className.toLowerCase();
    const prob = pred.probability;
    const words = className.split(/[, ]+/).filter((w: string) => w.length > 1);

    for (const word of words) {
      for (const [key, data] of Object.entries(CLOTHING_DB)) {
        if (word.includes(key) || key.includes(word)) {
          if (!scores[data.category]) {
            scores[data.category] = { totalWeight: 0, totalProb: 0, count: 0, fabric: data.fabric, fit: data.fit };
          }
          scores[data.category].totalWeight += data.weight * prob;
          scores[data.category].totalProb += prob;
          scores[data.category].count++;
          break;
        }
      }
    }
  }

  // Also check full class names
  for (const pred of predictions) {
    const className = pred.className.toLowerCase();
    for (const [key, data] of Object.entries(CLOTHING_DB)) {
      if (className.includes(key)) {
        if (!scores[data.category]) {
          scores[data.category] = { totalWeight: 0, totalProb: 0, count: 0, fabric: data.fabric, fit: data.fit };
        }
        scores[data.category].totalWeight += data.weight * pred.probability * 2;
        scores[data.category].totalProb += pred.probability;
        scores[data.category].count++;
        break;
      }
    }
  }

  let bestCategory = 'T-Shirt';
  let bestScore = 0;
  let bestFabric = 'Cotton';
  let bestFit = 'Regular';
  let bestConfidence = 85;

  for (const [cat, score] of Object.entries(scores)) {
    const avgScore = score.totalWeight / Math.max(1, score.count);
    if (avgScore > bestScore) {
      bestScore = avgScore;
      bestCategory = cat;
      bestFabric = score.fabric;
      bestFit = score.fit;
    }
  }

  // Boost confidence if MobileNet directly predicted it
  const topPred = predictions[0]?.className.toLowerCase() || '';
  for (const [key, data] of Object.entries(CLOTHING_DB)) {
    if (topPred.includes(key)) {
      bestFabric = data.fabric;
      bestFit = data.fit;
      bestConfidence = Math.round(predictions[0].probability * 100);
      break;
    }
  }

  const allLabels = predictions.slice(0, 5).map(p => p.className.split(',')[0].trim());

  return {
    type: bestCategory,
    category: bestCategory,
    fabric: bestFabric,
    fit: bestFit,
    confidence: Math.min(bestConfidence + 5, 99),
    allLabels,
  };
}

async function tryClarifaiAPI(base64: string): Promise<RecognitionResult | null> {
  const PAT = process.env.EXPO_PUBLIC_CLARIFAI_PAT;
  const USER_ID = process.env.EXPO_PUBLIC_CLARIFAI_USER_ID;
  const APP_ID = process.env.EXPO_PUBLIC_CLARIFAI_APP_ID;

  if (!PAT || !USER_ID || !APP_ID) return null;

  try {
    const imageBytes = base64.replace(/^data:image\/\w+;base64,/, '');
    const raw = JSON.stringify({
      user_app_id: { user_id: USER_ID, app_id: APP_ID },
      inputs: [{ data: { image: { base64: imageBytes } } }],
    });

    const response = await fetch(
      `https://api.clarifai.com/v2/models/fashion-model/versions/0.1/outputs`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Key ${PAT}`,
          'Content-Type': 'application/json',
        },
        body: raw,
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const concepts = data.outputs?.[0]?.data?.concepts || [];

    const predictions = concepts.map((c: any) => ({
      className: c.name,
      probability: c.value,
    }));

    const matched = matchClothingWeighted(predictions);
    const topConfidence = Math.round((predictions[0]?.probability || 0) * 100);

    return {
      type: matched.type,
      category: matched.category,
      color: '',
      colorHex: '',
      fabric: matched.fabric,
      fit: matched.fit,
      confidence: Math.max(topConfidence, matched.confidence),
      attributes: predictions.slice(0, 5).map((c: any) => c.name),
      allPredictions: predictions.slice(0, 5),
    };
  } catch {
    return null;
  }
}

async function tryGoogleVision(base64: string): Promise<RecognitionResult | null> {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_VISION_KEY;
  if (!apiKey) return null;

  try {
    const body = {
      requests: [{
        image: { content: base64.replace(/^data:image\/\w+;base64,/, '') },
        features: [{ type: 'LABEL_DETECTION', maxResults: 20 }],
      }],
    };

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const labels = data.responses?.[0]?.labelAnnotations || [];

    const predictions = labels.map((l: any) => ({
      className: l.description,
      probability: l.score,
    }));

    const matched = matchClothingWeighted(predictions);
    const topConfidence = Math.round((predictions[0]?.probability || 0) * 100);

    return {
      type: matched.type,
      category: matched.category,
      color: '',
      colorHex: '',
      fabric: matched.fabric,
      fit: matched.fit,
      confidence: Math.max(topConfidence, matched.confidence),
      attributes: predictions.slice(0, 5).map((l: any) => l.description),
      allPredictions: predictions.slice(0, 5),
    };
  } catch {
    return null;
  }
}

export function useAIVision() {
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      setLoading(false);
      return;
    }

    let mounted = true;

    async function load() {
      try {
        setLoadProgress(10);
        const tf = await import('@tensorflow/tfjs');
        setLoadProgress(30);
        await tf.ready();
        setLoadProgress(50);

        try {
          await tf.setBackend('webgl');
        } catch {
          await tf.setBackend('cpu');
        }
        setLoadProgress(70);

        const mobilenet = await import('@tensorflow-models/mobilenet');
        setLoadProgress(85);

        const m = await mobilenet.load({
          version: 2,
          alpha: 1.0,
        });
        setLoadProgress(100);

        if (mounted) {
          modelRef.current = m;
          setModel(m);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Failed to load AI model:', err);
        if (mounted) {
          setError(err.message || 'Failed to load AI vision model');
          setLoading(false);
        }
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  const classifyImage = useCallback(async (
    imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    base64?: string
  ): Promise<RecognitionResult | null> => {
    // Try external APIs first if base64 is provided
    if (base64) {
      const clarifaiResult = await tryClarifaiAPI(base64);
      if (clarifaiResult && clarifaiResult.confidence >= 85) {
        return clarifaiResult;
      }

      const visionResult = await tryGoogleVision(base64);
      if (visionResult && visionResult.confidence >= 85) {
        return visionResult;
      }
    }

    // Fallback to MobileNet
    if (!modelRef.current) {
      console.warn('Model not loaded yet');
      return null;
    }

    try {
      const processedCanvas = preprocessImage(imageElement);
      const predictions = await modelRef.current.classify(processedCanvas);

      if (!predictions || predictions.length === 0) {
        return null;
      }

      const matched = matchClothingWeighted(predictions);

      // Extract color from the processed image
      const ctx = processedCanvas.getContext('2d')!;
      const imageData = ctx.getImageData(0, 0, 224, 224);
      const color = extractDominantColor(imageData);

      const allPredictions = predictions.slice(0, 5).map((p: any) => ({
        label: p.className.split(',')[0].trim(),
        prob: Math.round(p.probability * 100),
      }));

      return {
        type: matched.type,
        category: matched.category,
        color: color.name,
        colorHex: color.hex,
        fabric: matched.fabric,
        fit: matched.fit,
        confidence: matched.confidence,
        attributes: allPredictions.map(p => p.label),
        allPredictions,
      };
    } catch (err: any) {
      console.error('Classification error:', err);
      return null;
    }
  }, []);

  return { model, loading, loadProgress, error, classifyImage };
}
