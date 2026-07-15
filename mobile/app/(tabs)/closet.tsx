import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import WardrobeLight from "../../components/WardrobeLight";
import Shelf from "../../components/Shelf";
import GlassCard from "../../components/GlassCard";
import { theme } from "../../utils/theme";

const categories = [
  { id: "tshirts", label: "T-Shirts", icon: "👕", color: "#5B8DFF", count: 6 },
  { id: "shirts", label: "Shirts", icon: "👔", color: "#C8A45C", count: 4 },
  { id: "pants", label: "Pants", icon: "👖", color: "#55D68A", count: 3 },
  { id: "jackets", label: "Jackets", icon: "🧥", color: "#FF5A63", count: 2 },
  { id: "shoes", label: "Shoes", icon: "👟", color: "#C084FC", count: 5 },
  { id: "accessories", label: "Accessories", icon: "👜", color: "#F97316", count: 4 },
];

export default function ClosetScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 100 : 120 }}
      >
        <View style={{ position: "relative", overflow: "hidden" }}>
          <WardrobeLight side="left" delay={0} />
          <WardrobeLight side="right" delay={300} />
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={{
              paddingTop: Platform.OS === "web" ? 48 : 56,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                color: theme.colors.gold,
                fontSize: theme.fontSize.xs,
                fontWeight: "600",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              My Collection
            </Text>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: theme.fontSize.xxl,
                fontWeight: "700",
              }}
            >
              Wardrobe
            </Text>
            <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
              <View
                style={{
                  backgroundColor: "rgba(91, 141, 255, 0.1)",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderColor: "rgba(91, 141, 255, 0.2)",
                }}
              >
                <Text style={{ color: theme.colors.blueAccent, fontSize: theme.fontSize.xs, fontWeight: "500" }}>
                  {categories.reduce((a, b) => a + (b.count || 0), 0)} items
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(85, 214, 138, 0.1)",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderColor: "rgba(85, 214, 138, 0.2)",
                }}
              >
                <Text style={{ color: theme.colors.greenSuccess, fontSize: theme.fontSize.xs, fontWeight: "500" }}>
                  {categories.length} categories
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <Shelf
              title="Categories"
              items={categories}
              onItemPress={(item) => router.push("/(tabs)/scan")}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300).springify()} style={{ marginBottom: 16 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(tabs)/scan")}
              style={{
                backgroundColor: theme.colors.gold,
                borderRadius: 14,
                paddingVertical: 14,
                alignItems: "center",
                shadowColor: theme.colors.gold,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                elevation: 4,
              }}
            >
              <Text style={{ color: theme.colors.dark, fontSize: theme.fontSize.md, fontWeight: "700" }}>
                📸 Scan New Item
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <GlassCard variant="dark" style={{ padding: 20, marginBottom: 16 }}>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.sm,
                  fontWeight: "600",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Recent Activity
              </Text>
              <View style={{ gap: 12 }}>
                {[
                  { action: "Added new shirt", time: "2 hours ago", icon: "👔" },
                  { action: "Created Date outfit", time: "Yesterday", icon: "❤️" },
                  { action: "Scanned new sneakers", time: "2 days ago", icon: "👟" },
                ].map((activity, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingVertical: 8,
                      borderBottomWidth: i < 2 ? 1 : 0,
                      borderBottomColor: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: "rgba(255,255,255,0.05)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>{activity.icon}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: theme.colors.white, fontSize: theme.fontSize.sm, fontWeight: "500" }}>
                        {activity.action}
                      </Text>
                      <Text style={{ color: theme.colors.textTertiary, fontSize: theme.fontSize.xs, marginTop: 1 }}>
                        {activity.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </GlassCard>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
