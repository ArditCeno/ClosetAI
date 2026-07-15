import { View, Text, TouchableOpacity, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import GlassCard from "../../components/GlassCard";
import { theme } from "../../utils/theme";

const menuItems = [
  { icon: "👕", label: "My Closet", desc: "Manage your wardrobe", color: "#5B8DFF" },
  { icon: "⭐", label: "Upgrade to Premium", desc: "Unlock unlimited features", color: "#C8A45C" },
  { icon: "📊", label: "Style Stats", desc: "Your fashion insights", color: "#55D68A" },
  { icon: "🏆", label: "AI Score", desc: "Style evolution tracking", color: "#C084FC" },
  { icon: "⚙️", label: "Settings", desc: "Preferences & notifications", color: "#F97316" },
];

export default function ProfileScreen() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === "web" ? 100 : 120 }}
      >
        {/* Dressing Room Header */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={{
            paddingTop: Platform.OS === "web" ? 48 : 56,
            paddingHorizontal: 20,
            paddingBottom: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.gold,
              fontSize: theme.fontSize.xs,
              fontWeight: "600",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Dressing Room
          </Text>

          {/* Mirror Frame */}
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "rgba(22, 22, 22, 0.8)",
              borderWidth: 2,
              borderColor: "rgba(200, 164, 92, 0.3)",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: theme.colors.gold,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 40 }}>👤</Text>
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: theme.colors.greenSuccess,
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: theme.colors.background,
              }}
            />
          </View>

          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.fontSize.xl,
              fontWeight: "700",
              marginTop: 14,
            }}
          >
            {user?.name || "User"}
          </Text>
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.fontSize.sm,
              marginTop: 2,
            }}
          >
            {user?.email || "user@example.com"}
          </Text>

          <View
            style={{
              backgroundColor:
                user?.subscription_tier === "premium"
                  ? "rgba(200, 164, 92, 0.15)"
                  : "rgba(91, 141, 255, 0.15)",
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 4,
              marginTop: 10,
              borderWidth: 1,
              borderColor:
                user?.subscription_tier === "premium"
                  ? "rgba(200, 164, 92, 0.3)"
                  : "rgba(91, 141, 255, 0.3)",
            }}
          >
            <Text
              style={{
                color:
                  user?.subscription_tier === "premium"
                    ? theme.colors.gold
                    : theme.colors.blueAccent,
                fontSize: theme.fontSize.xs,
                fontWeight: "500",
              }}
            >
              {user?.subscription_tier === "premium" ? "⭐ Premium" : "Free Plan"}
            </Text>
          </View>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={{
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {[
            { value: "24", label: "Items", color: theme.colors.blueAccent },
            { value: "12", label: "Outfits", color: theme.colors.greenSuccess },
            { value: "85", label: "Style Score", color: theme.colors.gold },
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
                  fontSize: theme.fontSize.lg,
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

        {/* Menu Items */}
        <View style={{ paddingHorizontal: 20 }}>
          <Animated.View entering={FadeInUp.delay(300).springify()}>
            <GlassCard variant="dark" style={{ padding: 8, marginBottom: 16 }}>
              {menuItems.map((item, i) => {
                const navRoutes: Record<string, any> = {
                  "My Closet": "/(tabs)/closet",
                  "Upgrade to Premium": "/(tabs)/profile",
                  "Style Stats": "/(tabs)/profile",
                  "AI Score": "/(tabs)/profile",
                  "Settings": "/(tabs)/profile",
                };
                return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.7}
                  onPress={() => router.push(navRoutes[item.label] || "/(tabs)/profile")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    borderBottomWidth: i < menuItems.length - 1 ? 1 : 0,
                    borderBottomColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: `${item.color}15`,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.colors.white, fontSize: theme.fontSize.sm, fontWeight: "500" }}>
                      {item.label}
                    </Text>
                    <Text style={{ color: theme.colors.textTertiary, fontSize: theme.fontSize.xs, marginTop: 1 }}>
                      {item.desc}
                    </Text>
                  </View>
                  <Text style={{ color: theme.colors.textTertiary, fontSize: 16 }}>›</Text>
                </TouchableOpacity>
              );
              })}
            </GlassCard>
          </Animated.View>

          {/* Sign Out */}
          <Animated.View entering={FadeInUp.delay(400).springify()}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSignOut}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                paddingVertical: 14,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "rgba(255, 90, 99, 0.2)",
                backgroundColor: "rgba(255, 90, 99, 0.05)",
              }}
            >
              <Text style={{ fontSize: 16 }}>🚪</Text>
              <Text style={{ color: theme.colors.red, fontSize: theme.fontSize.sm, fontWeight: "600" }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: 11,
              textAlign: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            ClosetAI v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
