import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import GlassCard from "../../components/GlassCard";
import WardrobeLight from "../../components/WardrobeLight";
import Shelf from "../../components/Shelf";
import { theme } from "../../utils/theme";

const quickItems = [
  { id: "tshirts", label: "T-Shirts", icon: "👕", color: "#5B8DFF" },
  { id: "shirts", label: "Shirts", icon: "👔", color: "#C8A45C" },
  { id: "pants", label: "Pants", icon: "👖", color: "#55D68A" },
  { id: "jackets", label: "Jackets", icon: "🧥", color: "#FF5A63" },
  { id: "shoes", label: "Shoes", icon: "👟", color: "#C084FC" },
  { id: "accessories", label: "Accessories", icon: "👜", color: "#F97316" },
];

const occasionItems = [
  { id: "work", label: "Work", icon: "💼", color: "#5B8DFF" },
  { id: "date", label: "Date", icon: "❤️", color: "#FF5A63" },
  { id: "travel", label: "Travel", icon: "✈️", color: "#C084FC" },
  { id: "casual", label: "Casual", icon: "😎", color: "#55D68A" },
];

export default function HomeScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [1, 0.8]),
    transform: [
      { translateY: interpolate(scrollY.value, [0, 100], [0, -20]) },
    ],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 100 : 120 }}
      >
        {/* Wardrobe Top Bar with LED Lights */}
        <View style={{ position: "relative", overflow: "hidden" }}>
          <WardrobeLight side="left" delay={0} />
          <WardrobeLight side="right" delay={500} />

          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={[
              {
                paddingTop: Platform.OS === "web" ? 48 : 56,
                paddingHorizontal: 20,
                paddingBottom: 24,
              },
              headerStyle,
            ]}
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
              Your Wardrobe
            </Text>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: theme.fontSize.xxxl,
                fontWeight: "700",
                letterSpacing: -0.5,
              }}
            >
              Good Morning
            </Text>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.fontSize.md,
                marginTop: 4,
              }}
            >
              Ready to look amazing today
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/wardrobe3d")}
              style={{
                marginTop: 14,
                backgroundColor: "rgba(200, 164, 92, 0.1)",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "rgba(200, 164, 92, 0.2)",
                paddingVertical: 10,
                paddingHorizontal: 16,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 18 }}>🏛️</Text>
              <Text style={{ color: theme.colors.gold, fontSize: theme.fontSize.sm, fontWeight: "600" }}>
                Enter Immersive 3D Wardrobe
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Quick Access Shelf */}
        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <Animated.View entering={FadeInUp.delay(200).springify()}>
            <GlassCard variant="dark" style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: `${theme.colors.gold}20`,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  <Text style={{ fontSize: 16, color: theme.colors.gold }}>✨</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: theme.colors.white,
                      fontSize: theme.fontSize.md,
                      fontWeight: "600",
                    }}
                  >
                    Outfit of the Day
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textTertiary,
                      fontSize: theme.fontSize.sm,
                      marginTop: 2,
                    }}
                  >
                    Let AI style you based on your closet
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push("/outfit/generate")}
                style={{
                  backgroundColor: theme.colors.gold,
                  borderRadius: 12,
                  paddingVertical: 12,
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
            </GlassCard>
          </Animated.View>

          {/* Stats Row */}
          <Animated.View
            entering={FadeInUp.delay(300).springify()}
            style={{ flexDirection: "row", gap: 10, marginTop: 16, marginBottom: 24 }}
          >
            {[
              { value: "24", label: "Items", color: theme.colors.blueAccent },
              { value: "12", label: "Outfits", color: theme.colors.greenSuccess },
              { value: "8", label: "Styles", color: theme.colors.gold },
            ].map((stat) => (
              <View
                key={stat.label}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(22, 22, 22, 0.6)",
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  padding: 14,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: stat.color,
                    fontSize: theme.fontSize.xl,
                    fontWeight: "700",
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    color: theme.colors.textTertiary,
                    fontSize: theme.fontSize.xs,
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </Animated.View>

          {/* My Wardrobe Shelves */}
          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <Shelf
              title="Categories"
              items={quickItems}
              onItemPress={(item) => router.push("/(tabs)/closet")}
            />
          </Animated.View>

          {/* Quick Actions */}
          <Animated.View entering={FadeInUp.delay(500).springify()}>
            <GlassCard variant="dark" style={{ padding: 20, marginBottom: 16 }}>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.fontSize.sm,
                  fontWeight: "600",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Quick Actions
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/(tabs)/scan")}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(91, 141, 255, 0.1)",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: "rgba(91, 141, 255, 0.15)",
                    padding: 14,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 28, marginBottom: 6 }}>📸</Text>
                  <Text style={{ color: theme.colors.white, fontSize: 12, fontWeight: "500" }}>
                    Scan
                  </Text>
                  <Text style={{ color: theme.colors.textTertiary, fontSize: 10 }}>
                    Add clothes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/trip/pack")}
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(200, 164, 92, 0.1)",
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: "rgba(200, 164, 92, 0.15)",
                    padding: 14,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 28, marginBottom: 6 }}>🧳</Text>
                  <Text style={{ color: theme.colors.white, fontSize: 12, fontWeight: "500" }}>
                    Trip Pack
                  </Text>
                  <Text style={{ color: theme.colors.textTertiary, fontSize: 10 }}>
                    Pack smart
                  </Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </Animated.View>

          {/* Occasions */}
          <Animated.View entering={FadeInUp.delay(600).springify()}>
            <Shelf
              title="Styled for"
              items={occasionItems}
              columns={2}
              onItemPress={(item) => router.push("/outfit/generate")}
            />
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
