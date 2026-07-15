import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useAuthStore } from "../../store";
import Login3DBackground from "../../components/Login3DBackground";
import { theme } from "../../utils/theme";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthStore();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) return;
    setLoading(true);
    try {
      await signUp(email, password, name);
      if (Platform.OS === "web") {
        router.replace("/wardrobe3d");
      } else {
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Login3DBackground>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
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
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text style={{ color: theme.colors.white, fontSize: 24, fontWeight: "700" }}>
                Create Account
              </Text>
              <Text style={{ color: theme.colors.textTertiary, fontSize: 13, marginTop: 4 }}>
                Join your AI wardrobe
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).springify()} style={{ gap: 14 }}>
            <View>
              <Text style={{ color: "rgba(245,245,245,0.5)", fontSize: 11, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                Name
              </Text>
              <TextInput
                placeholder="Your name"
                placeholderTextColor="rgba(245,245,245,0.2)"
                value={name}
                onChangeText={setName}
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
              onPress={handleRegister}
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
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} style={{ paddingVertical: 10 }}>
              <Text style={{ color: "rgba(245,245,245,0.35)", fontSize: 12, textAlign: "center" }}>
                Already have an account?{" "}
                <Text style={{ color: theme.colors.gold, fontWeight: "600" }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Login3DBackground>
  );
}
