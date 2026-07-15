import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import GlassCard from "../../components/GlassCard";
import { theme } from "../../utils/theme";

export default function PackScreen() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [packed, setPacked] = useState(false);
  const router = useRouter();

  const canPack = destination.trim().length > 0 && days.trim().length > 0;

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
            Smart Packing
          </Text>
          <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.md, marginTop: 4 }}>
            AI will pack for your trip
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <GlassCard variant="dark" style={{ padding: 20, marginBottom: 16 }}>
              <View style={{ gap: 16 }}>
                <View>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontSize.sm,
                      fontWeight: "500",
                      marginBottom: 6,
                    }}
                  >
                    Destination
                  </Text>
                  <TextInput
                    placeholder="e.g. Paris, Rome..."
                    placeholderTextColor={theme.colors.textTertiary}
                    value={destination}
                    onChangeText={setDestination}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      color: theme.colors.white,
                      fontSize: theme.fontSize.md,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontSize.sm,
                      fontWeight: "500",
                      marginBottom: 6,
                    }}
                  >
                    Duration
                  </Text>
                  <TextInput
                    placeholder="Number of days"
                    placeholderTextColor={theme.colors.textTertiary}
                    value={days}
                    onChangeText={setDays}
                    keyboardType="number-pad"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.08)",
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      color: theme.colors.white,
                      fontSize: theme.fontSize.md,
                    }}
                  />
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={!canPack || packed}
                  onPress={() => setPacked(true)}
                  style={{
                    backgroundColor: canPack ? theme.colors.gold : "rgba(255,255,255,0.05)",
                    borderRadius: 14,
                    paddingVertical: 14,
                    alignItems: "center",
                    marginTop: 4,
                    opacity: canPack ? 1 : 0.4,
                  }}
                >
                  <Text
                    style={{
                      color: canPack ? theme.colors.dark : theme.colors.textTertiary,
                      fontSize: theme.fontSize.md,
                      fontWeight: "700",
                    }}
                  >
                    {packed ? "Packed! ✓" : "Pack for me!"}
                  </Text>
                </TouchableOpacity>
              </View>

              {packed && (
                <Animated.View entering={FadeInDown.springify()} style={{ marginTop: 16 }}>
                  <View style={{ backgroundColor: "rgba(85,214,138,0.1)", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "rgba(85,214,138,0.2)" }}>
                    <Text style={{ color: theme.colors.greenSuccess, fontSize: 11, fontWeight: "600", letterSpacing: 1, marginBottom: 8 }}>PACKING LIST FOR {destination.toUpperCase()}</Text>
                    <Text style={{ color: theme.colors.white, fontSize: theme.fontSize.sm, lineHeight: 22 }}>
                      👕 {Math.max(1, Math.round(parseInt(days || "1") * 0.6))} Shirts{"\n"}
                      👖 {Math.max(1, Math.round(parseInt(days || "1") * 0.3))} Pants{"\n"}
                      🧦 {parseInt(days || "1")} Pairs of socks{"\n"}
                      👟 2 Pairs of shoes{"\n"}
                      🧥 1 Jacket{"\n"}
                      🩳 {Math.max(1, Math.round(parseInt(days || "1") * 0.2))} Shorts
                    </Text>
                  </View>
                </Animated.View>
              )}
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <GlassCard variant="gold" style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                <Text style={{ fontSize: 20 }}>💡</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.colors.gold, fontSize: theme.fontSize.md, fontWeight: "600", marginBottom: 4 }}>
                    Pro Tip
                  </Text>
                  <Text style={{ color: theme.colors.textSecondary, fontSize: theme.fontSize.sm, lineHeight: 20 }}>
                    AI will check the weather at your destination and create the perfect outfits for each day of your trip.
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
