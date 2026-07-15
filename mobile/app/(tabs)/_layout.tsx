import { Tabs } from "expo-router";
import { View, Text, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { theme } from "../../utils/theme";

const tabIcons: Record<string, string> = {
  index: "🏠",
  closet: "👕",
  scan: "📸",
  explore: "🤖",
  profile: "👤",
};

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 100 }),
        withSpring(1, { damping: 12, stiffness: 200 })
      );
    } else {
      scale.value = withSpring(1);
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[{ alignItems: "center", justifyContent: "center" }, animatedStyle]}>
      <Text style={{ fontSize: 22, marginBottom: 2 }}>{tabIcons[name]}</Text>
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "fade",
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "web" ? 16 : 24,
          left: 16,
          right: 16,
          backgroundColor: "rgba(22, 22, 22, 0.75)",
          borderTopWidth: 0,
          borderRadius: 24,
          paddingTop: 8,
          paddingBottom: Platform.OS === "web" ? 8 : 24,
          height: Platform.OS === "web" ? 64 : 80,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 16,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.06)",
        },
        tabBarActiveTintColor: theme.colors.gold,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.5,
          marginTop: -2,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabBarIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="closet"
        options={{
          title: "Closet",
          tabBarIcon: ({ focused }) => <TabBarIcon name="closet" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => <TabBarIcon name="scan" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "AI",
          tabBarIcon: ({ focused }) => <TabBarIcon name="explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => <TabBarIcon name="profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
