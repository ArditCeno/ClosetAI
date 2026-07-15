import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import GlassCard from "../../components/GlassCard";
import { theme } from "../../utils/theme";

const occasions = [
  { id: "work", label: "💼 Work" },
  { id: "casual", label: "😎 Casual" },
  { id: "date", label: "❤️ Date" },
  { id: "formal", label: "🎩 Formal" },
  { id: "sport", label: "🏃 Sport" },
  { id: "interview", label: "🎯 Interview" },
];

export default function GenerateOutfitScreen() {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={{ paddingTop: 56, paddingHorizontal: 20, marginBottom: 24 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 16 }}>
            <Text style={{ color: theme.colors.gold, fontSize: theme.fontSize.sm, fontWeight: "500" }}>
              ← Back
            </Text>
          </TouchableOpacity>
          <Text style={{ color: theme.colors.white, fontSize: theme.fontSize.xxl, fontWeight: "700" }}>
            Generate Outfit
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.md, marginTop: 4 }}>
            Choose an occasion
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Animated.View entering={FadeInDown.delay(100).springify()}>
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
              What's the occasion?
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {occasions.map((occ) => (
                <TouchableOpacity
                  key={occ.id}
                  activeOpacity={0.7}
                  onPress={() => setSelectedOccasion(occ.id)}
                  style={{
                    backgroundColor:
                      selectedOccasion === occ.id
                        ? `${theme.colors.gold}20`
                        : "rgba(22, 22, 22, 0.8)",
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor:
                      selectedOccasion === occ.id
                        ? `${theme.colors.gold}40`
                        : "rgba(255,255,255,0.06)",
                  }}
                >
                  <Text
                    style={{
                      color: selectedOccasion === occ.id ? theme.colors.gold : theme.colors.textSecondary,
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

          <Animated.View entering={FadeInDown.delay(200).springify()} style={{ marginTop: 24 }}>
            <GlassCard variant="dark" style={{ padding: 24, alignItems: "center" }}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>🤖</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.sm, textAlign: "center", lineHeight: 20 }}>
                {selectedOccasion
                  ? `AI will generate a ${selectedOccasion} outfit from your closet`
                  : "Select an occasion above to get started"}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!selectedOccasion || generated}
                onPress={() => setGenerated(true)}
                style={{
                  backgroundColor: selectedOccasion ? theme.colors.gold : "rgba(255,255,255,0.05)",
                  borderRadius: 14,
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  marginTop: 16,
                  opacity: selectedOccasion ? 1 : 0.4,
                }}
              >
                <Text
                  style={{
                    color: selectedOccasion ? theme.colors.dark : theme.colors.textTertiary,
                    fontSize: theme.fontSize.md,
                    fontWeight: "700",
                  }}
                >
                  {generated ? "Generated!" : "Generate Outfit"}
                </Text>
              </TouchableOpacity>

              {generated && (
                <Animated.View entering={FadeInDown.springify()} style={{ marginTop: 16, width: '100%' }}>
                  <View style={{ backgroundColor: "rgba(85,214,138,0.1)", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "rgba(85,214,138,0.2)", marginBottom: 10 }}>
                    <Text style={{ color: theme.colors.greenSuccess, fontSize: 11, fontWeight: "600", letterSpacing: 1, marginBottom: 6 }}>OUTFIT READY</Text>
                    <Text style={{ color: theme.colors.white, fontSize: theme.fontSize.sm, lineHeight: 20 }}>
                      👔 Blue Oxford Shirt{"\n"}
                      👖 Khaki Chinos{"\n"}
                      🧥 Navy Blazer{"\n"}
                      👟 Brown Leather Shoes
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push("/(tabs)/closet")}
                    style={{ backgroundColor: "rgba(91,141,255,0.15)", borderRadius: 10, paddingVertical: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(91,141,255,0.2)" }}
                  >
                    <Text style={{ color: theme.colors.blueAccent, fontSize: 13, fontWeight: "600" }}>Save to Closet</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </GlassCard>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
