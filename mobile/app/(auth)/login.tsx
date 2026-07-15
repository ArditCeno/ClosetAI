import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useAuthStore } from "../../store";
import Login3DBackground from "../../components/Login3DBackground";
import PalaceDoors from "../../components/PalaceDoors";
import { theme } from "../../utils/theme";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const { signIn, session } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await signIn(email, password);
      if (Platform.OS === "web") {
        setDoorsOpen(true);
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoorsOpened = () => {
    router.replace("/wardrobe3d");
  };

  useEffect(() => {
    if (session && !loading && Platform.OS !== "web") {
      router.replace("/(tabs)");
    }
  }, [session, loading]);

  return (
    <PalaceDoors open={doorsOpen} onOpened={handleDoorsOpened}>
      <Login3DBackground>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
          {/* Glass Login Panel */}
          <Animated.View
            entering={FadeIn.delay(400).duration(800)}
            style={{
              width: "100%",
              maxWidth: 380,
              backgroundColor: Platform.OS === "web"
                ? "rgba(22, 22, 22, 0.55)"
                : "rgba(22, 22, 22, 0.85)",
              borderRadius: 24,
              borderWidth: 1,
              borderColor: "rgba(200, 164, 92, 0.12)",
              padding: 28,
              ...(Platform.OS === "web" ? { backdropFilter: "blur(20px)" } : {}),
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 32,
              elevation: 16,
            }}
          >
            {/* Logo */}
            <Animated.View entering={FadeInDown.delay(600).springify()}>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(200, 164, 92, 0.1)",
                    borderWidth: 1,
                    borderColor: "rgba(200, 164, 92, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <Text style={{ fontSize: 26 }}>👑</Text>
                </View>
                <Text style={{ color: theme.colors.white, fontSize: 26, fontWeight: "700", letterSpacing: -0.5 }}>
                  ClosetAI
                </Text>
                <Text style={{ color: theme.colors.textTertiary, fontSize: 13, marginTop: 4 }}>
                  Your AI Fashion Wardrobe
                </Text>
              </View>
            </Animated.View>

            {/* Form */}
            <Animated.View entering={FadeInDown.delay(800).springify()} style={{ gap: 14 }}>
              <View>
                <Text style={{ color: "rgba(245,245,245,0.5)", fontSize: 11, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                  Email
                </Text>
                <TextInput
                  placeholder="your@email.com"
                  placeholderTextColor="rgba(245,245,245,0.2)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderWidth: 1,
                    borderColor: "rgba(200, 164, 92, 0.12)",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme.colors.white,
                    fontSize: theme.fontSize.sm,
                  }}
                />
              </View>

              <View>
                <Text style={{ color: "rgba(245,245,245,0.5)", fontSize: 11, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                  Password
                </Text>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="rgba(245,245,245,0.2)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    borderWidth: 1,
                    borderColor: "rgba(200, 164, 92, 0.12)",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    color: theme.colors.white,
                    fontSize: theme.fontSize.sm,
                  }}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleLogin}
                disabled={loading}
                style={{
                  backgroundColor: theme.colors.gold,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                  marginTop: 6,
                  shadowColor: theme.colors.gold,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 4,
                }}
              >
                {loading ? (
                  <ActivityIndicator color={theme.colors.dark} />
                ) : (
                  <Text style={{ color: theme.colors.dark, fontSize: theme.fontSize.md, fontWeight: "700" }}>
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/(auth)/register")} style={{ paddingVertical: 10 }}>
                <Text style={{ color: "rgba(245,245,245,0.35)", fontSize: 12, textAlign: "center" }}>
                  Don't have an account?{" "}
                  <Text style={{ color: theme.colors.gold, fontWeight: "600" }}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* Footer */}
          <Animated.View entering={FadeIn.delay(1200)} style={{ position: "absolute", bottom: 32 }}>
            <Text style={{ color: "rgba(245,245,245,0.15)", fontSize: 9, letterSpacing: 2 }}>
              THE ROYAL WARDROBE
            </Text>
          </Animated.View>
        </View>
      </Login3DBackground>
    </PalaceDoors>
  );
}
