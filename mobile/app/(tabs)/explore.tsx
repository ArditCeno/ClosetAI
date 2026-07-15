import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import GlassCard from "../../components/GlassCard";
import { theme } from "../../utils/theme";

const occasions = [
  { id: "work", label: "💼 Work", color: "#5B8DFF" },
  { id: "date", label: "❤️ Date", color: "#FF5A63" },
  { id: "travel", label: "✈️ Travel", color: "#C084FC" },
  { id: "beach", label: "🏖 Beach", color: "#38BDF8" },
  { id: "gym", label: "💪 Gym", color: "#A3E635" },
  { id: "dinner", label: "🍷 Dinner", color: "#C8A45C" },
];

const suggestions = [
  "What should I wear for a job interview?",
  "Style this shirt for a date night",
  "What's trending this season?",
];

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 100 : 120 }}
      >
        {/* Hologram Header */}
        <View style={{ position: "relative", overflow: "hidden" }}>
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={{
              paddingTop: Platform.OS === "web" ? 48 : 56,
              paddingHorizontal: 20,
              paddingBottom: 24,
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "rgba(91, 141, 255, 0.1)",
                  borderWidth: 1,
                  borderColor: "rgba(91, 141, 255, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: theme.colors.blueAccent,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 6,
                }}
              >
                <Text style={{ fontSize: 28 }}>🤖</Text>
              </View>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: theme.fontSize.xl,
                  fontWeight: "700",
                  marginTop: 12,
                }}
              >
                AI Stylist
              </Text>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.sm,
                  marginTop: 4,
                  textAlign: "center",
                }}
              >
                What are we wearing today?
              </Text>
            </View>
          </Animated.View>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Occasion Chips */}
          <Animated.View entering={FadeInUp.delay(200).springify()} style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.fontSize.sm,
                fontWeight: "600",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 12,
                marginLeft: 4,
              }}
            >
              Pick an occasion
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {occasions.map((occ) => (
                <TouchableOpacity
                  key={occ.id}
                  activeOpacity={0.7}
                  onPress={() =>
                    setSelectedOccasion(selectedOccasion === occ.id ? null : occ.id)
                  }
                  style={{
                    backgroundColor:
                      selectedOccasion === occ.id
                        ? `${occ.color}20`
                        : "rgba(22, 22, 22, 0.8)",
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor:
                      selectedOccasion === occ.id
                        ? `${occ.color}40`
                        : "rgba(255,255,255,0.06)",
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedOccasion === occ.id ? occ.color : theme.colors.textSecondary,
                      fontSize: theme.fontSize.sm,
                      fontWeight: "500",
                    }}
                  >
                    {occ.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Generate Button */}
          {selectedOccasion && (
            <Animated.View entering={FadeInDown.springify()} style={{ marginBottom: 20 }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/outfit/generate")}
                style={{
                  backgroundColor: theme.colors.gold,
                  borderRadius: 14,
                  paddingVertical: 14,
                  alignItems: "center",
                  shadowColor: theme.colors.gold,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 4,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.dark,
                    fontSize: theme.fontSize.md,
                    fontWeight: "700",
                  }}
                >
                  Generate Outfit
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Fashion Chat */}
          <Animated.View entering={FadeInUp.delay(300).springify()} style={{ marginBottom: 20 }}>
            <GlassCard variant="dark" style={{ padding: 20 }}>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.sm,
                  fontWeight: "600",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Fashion Chat
              </Text>

              <View style={{ gap: 8, marginBottom: 14 }}>
                {suggestions.map((s, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.7}
                    onPress={() => setChatInput(s)}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      borderRadius: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 14,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.sm }}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.06)",
                    paddingHorizontal: 14,
                    justifyContent: "center",
                  }}
                >
                  <TextInput
                    placeholder="Ask AI for style advice..."
                    placeholderTextColor={theme.colors.textTertiary}
                    value={chatInput}
                    onChangeText={setChatInput}
                    style={{
                      color: theme.colors.white,
                      fontSize: theme.fontSize.sm,
                      paddingVertical: 10,
                    }}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!chatInput.trim()) return;
                    const responses = [
                      "A blue blazer with chinos would look great! Add a pocket square for flair.",
                      "Try layering a sweater over a collared shirt. Perfect for a smart casual look.",
                      "White sneakers, dark jeans, and a linen shirt. Effortless and stylish.",
                      "For that occasion, a well-fitted suit in navy or charcoal is always a winner.",
                      "Accessorize with a leather watch and a minimalist belt to elevate the outfit.",
                    ];
                    setChatResponse(responses[Math.floor(Math.random() * responses.length)]);
                  }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: chatInput.trim() ? theme.colors.blueAccent : "rgba(255,255,255,0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 18 }}>→</Text>
                </TouchableOpacity>
              </View>

              {chatResponse && (
                <Animated.View entering={FadeInUp.springify()} style={{ marginTop: 12, backgroundColor: "rgba(91,141,255,0.08)", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "rgba(91,141,255,0.12)" }}>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 11, letterSpacing: 1, marginBottom: 6 }}>AI STYLIST</Text>
                  <Text style={{ color: theme.colors.white, fontSize: theme.fontSize.sm, lineHeight: 20 }}>
                    {chatResponse}
                  </Text>
                </Animated.View>
              )}
            </GlassCard>
          </Animated.View>

          {/* Style Tips */}
          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <GlassCard variant="gold" style={{ padding: 20, marginBottom: 20 }}>
              <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                <Text style={{ fontSize: 24 }}>✨</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.gold, fontSize: theme.fontSize.md, fontWeight: "600", marginBottom: 4 }}>
                    Style Tip
                  </Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.sm, lineHeight: 20 }}>
                    Layering different textures adds depth to your outfit. Try pairing a cotton shirt with a wool blazer.
                  </Text>
                </View>
              </View>
            </GlassCard>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
