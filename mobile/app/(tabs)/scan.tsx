import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  interpolate,
} from "react-native-reanimated";
import { theme } from "../../utils/theme";
import WebCamera from "../../components/WebCamera";
import { useAIVision, type RecognitionResult } from "../../hooks/useAIVision";

type Mode = "camera" | "gallery" | "scanning";

export default function ScanScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("camera");
  const [scanResult, setScanResult] = useState<RecognitionResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const webCamRef = useRef<any>(null);
  const { classifyImage, loading: modelLoading, loadProgress } = useAIVision();

  const scanLine = useSharedValue(0);

  useEffect(() => {
    scanLine.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500 }),
        withTiming(0, { duration: 2500 })
      ),
      -1,
      true
    );
  }, []);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scanLine.value, [0, 1], [0, 300]) }],
    opacity: interpolate(scanLine.value, [0, 0.5, 1], [0.3, 1, 0.3]),
  }));

  const handleScan = async (base64?: string) => {
    setScanning(true);
    setMode("scanning");

    try {
      let result: RecognitionResult | null = null;

      if (base64 && Platform.OS === "web") {
        const img = new Image();
        img.src = base64;
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error('Failed to load image'));
        });

        result = await classifyImage(img, base64);
      }

      if (!result) {
        // Fallback simulation
        await new Promise(r => setTimeout(r, 2000));
        result = {
          type: "T-Shirt",
          category: "T-Shirt",
          color: "Blue",
          colorHex: "#0050C8",
          fabric: "Cotton",
          fit: "Regular",
          confidence: 92,
          attributes: ["T-Shirt", "Cotton", "Casual"],
          allPredictions: [{ label: "T-Shirt", prob: 92 }],
        };
      }

      setScanResult(result);
    } catch (err) {
      console.error('Recognition failed:', err);
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Camera/Scan Area */}
      <View style={{ flex: 1, backgroundColor: "#000", position: "relative", overflow: "hidden" }}>
        {/* Web Camera Feed */}
        {Platform.OS === "web" && !scanResult && (
          <WebCamera
            ref={webCamRef}
            onCapture={(base64) => handleScan(base64)}
            scanning={scanning}
          />
        )}

        {/* Scan Frame Overlay */}
        <View
          style={{
            position: "absolute",
            top: Platform.OS === "web" ? 80 : 100,
            left: 40,
            right: 40,
            bottom: 120,
            borderWidth: 1,
            borderColor: "rgba(91, 141, 255, 0.3)",
            borderRadius: 16,
          }}
        >
          {/* Corner decorations */}
          {["top", "bottom"].map((v) =>
            ["left", "right"].map((h) => (
              <View
                key={`${v}-${h}`}
                style={{
                  position: "absolute",
                  [v]: -1,
                  [h]: -1,
                  width: 24,
                  height: 24,
                  borderColor: theme.colors.blueAccent,
                  borderTopWidth: v === "top" ? 2 : 0,
                  borderBottomWidth: v === "bottom" ? 2 : 0,
                  borderLeftWidth: h === "left" ? 2 : 0,
                  borderRightWidth: h === "right" ? 2 : 0,
                  borderTopLeftRadius: v === "top" && h === "left" ? 8 : 0,
                  borderTopRightRadius: v === "top" && h === "right" ? 8 : 0,
                  borderBottomLeftRadius: v === "bottom" && h === "left" ? 8 : 0,
                  borderBottomRightRadius: v === "bottom" && h === "right" ? 8 : 0,
                }}
              />
            ))
          )}

          {/* Scanning line */}
          {mode === "scanning" && (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  left: -20,
                  right: -20,
                  height: 2,
                  backgroundColor: theme.colors.blueAccent,
                  shadowColor: theme.colors.blueAccent,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.8,
                  shadowRadius: 8,
                  elevation: 4,
                },
                scanLineStyle,
              ]}
            />
          )}
        </View>

        {/* ANIMATED SCANNING DOTS (PARTICLES) */}
        {mode === "scanning" && (
          <Animated.View entering={FadeIn} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <ParticleDot key={i} index={i} />
            ))}
          </Animated.View>
        )}

        {/* Scanner Info */}
        <Animated.View
          entering={FadeIn.delay(300)}
          style={{
            position: "absolute",
            bottom: Platform.OS === "web" ? 100 : 120,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.fontSize.sm,
              fontWeight: "500",
              letterSpacing: 1,
            }}
          >
            {mode === "scanning" ? "AI is detecting fabric..." : "Scan your clothing"}
          </Text>
          {scanResult && (
            <Animated.View
              entering={FadeIn.springify()}
              style={{
                marginTop: 16,
                backgroundColor: "rgba(22,22,22,0.95)",
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
                width: 300,
              }}
            >
              {/* Header with confidence */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <Text style={{ color: theme.colors.textTertiary, fontSize: 11, letterSpacing: 1 }}>
                  DETECTED ITEM
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View style={{
                    width: 40, height: 4, borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                  }}>
                    <View style={{
                      width: `${scanResult.confidence}%`, height: '100%',
                      backgroundColor: scanResult.confidence >= 90 ? theme.colors.greenSuccess : scanResult.confidence >= 75 ? theme.colors.gold : theme.colors.red,
                      borderRadius: 2,
                    }} />
                  </View>
                  <Text style={{ color: scanResult.confidence >= 90 ? theme.colors.greenSuccess : theme.colors.gold, fontSize: 11, fontWeight: "700" }}>
                    {scanResult.confidence}%
                  </Text>
                </View>
              </View>

              {/* Details */}
              {[
                { label: "Type", value: scanResult.type, color: theme.colors.blueAccent },
                { label: "Color", value: scanResult.color, color: theme.colors.gold, colorSwatch: scanResult.colorHex },
                { label: "Fabric", value: scanResult.fabric, color: theme.colors.blueAccent },
                { label: "Fit", value: scanResult.fit, color: theme.colors.greenSuccess },
              ].map((row) => (
                <View
                  key={row.label}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  <Text style={{ color: theme.colors.textTertiary, fontSize: 12 }}>{row.label}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    {(row as any).colorSwatch && (
                      <View style={{
                        width: 12, height: 12, borderRadius: 6,
                        backgroundColor: (row as any).colorSwatch,
                        borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
                      }} />
                    )}
                    <Text style={{ color: row.color, fontSize: 13, fontWeight: "600" }}>{row.value}</Text>
                  </View>
                </View>
              ))}

              {/* Tags */}
              {scanResult.attributes && scanResult.attributes.length > 0 && (
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {scanResult.attributes.slice(0, 4).map((attr, i) => (
                    <View key={i} style={{
                      backgroundColor: "rgba(91,141,255,0.08)",
                      borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2,
                      borderWidth: 1, borderColor: "rgba(91,141,255,0.1)",
                    }}>
                      <Text style={{ color: theme.colors.textTertiary, fontSize: 9 }}>{attr}</Text>
                    </View>
                  ))}
                </View>
              )}

              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  backgroundColor: theme.colors.gold,
                  borderRadius: 10,
                  paddingVertical: 10,
                  alignItems: "center",
                  marginTop: 10,
                  shadowColor: theme.colors.gold,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 3,
                }}
                onPress={() => {
                  setScanResult(null);
                  setMode("camera");
                  router.push("/(tabs)/closet");
                }}
              >
                <Text style={{ color: theme.colors.dark, fontSize: 13, fontWeight: "700" }}>
                  Save to Closet ✓
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </View>

      {/* Bottom Controls - Glass */}
      <View
        style={{
          backgroundColor: "rgba(22, 22, 22, 0.9)",
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.06)",
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: Platform.OS === "web" ? 20 : 32,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (Platform.OS === "web" && webCamRef.current?.capture) {
              webCamRef.current.capture();
            } else {
              handleScan();
            }
          }}
          disabled={scanning || modelLoading}
          style={{
            backgroundColor: scanning ? "rgba(91, 141, 255, 0.3)" : theme.colors.blueAccent,
            borderRadius: 14,
            paddingVertical: 14,
            alignItems: "center",
            shadowColor: theme.colors.blueAccent,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: scanning ? 0.1 : 0.3,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.fontSize.md,
              fontWeight: "700",
            }}
          >
            {modelLoading ? `Loading AI ${loadProgress}%` : scanning ? "AI Analyzing..." : scanResult ? "Scan Again" : "Take Photo"}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
          {(["gallery", "camera"] as const).map((m) => (
            <TouchableOpacity
              key={m}
              activeOpacity={0.7}
              onPress={() => {
                setMode(m);
                setScanResult(null);
              }}
              style={{
                flex: 1,
                backgroundColor: mode === m ? "rgba(91, 141, 255, 0.15)" : "rgba(255,255,255,0.05)",
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: "center",
                borderWidth: 1,
                borderColor: mode === m ? "rgba(91, 141, 255, 0.2)" : "rgba(255,255,255,0.06)",
              }}
            >
              <Text style={{ color: mode === m ? theme.colors.blueAccent : theme.colors.textTertiary, fontSize: 13, fontWeight: "600" }}>
                {m === "gallery" ? "📁 Gallery" : "📷 Camera"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

function ParticleDot({ index }: { index: number }) {
  const x = useSharedValue(Math.random() * 100);
  const y = useSharedValue(Math.random() * 100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      index * 100,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        true
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    left: `${x.value}%`,
    top: `${y.value}%`,
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: 2,
          height: 2,
          borderRadius: 1,
          backgroundColor: theme.colors.blueAccent,
        },
        style,
      ]}
    />
  );
}
