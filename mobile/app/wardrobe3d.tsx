import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../utils/theme';
import { WardrobeExperience } from '../components/wardrobe/WardrobeExperience';

export default function Wardrobe3DScreen() {
  const router = useRouter();

  if (Platform.OS !== 'web') {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>🏗️</Text>
        <Text style={{ color: theme.colors.white, fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
          Immersive 3D Wardrobe
        </Text>
        <Text style={{ color: theme.colors.textTertiary, fontSize: 14, textAlign: 'center', marginTop: 8 }}>
          Available on web browser
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          style={{ marginTop: 24, backgroundColor: theme.colors.gold, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 }}
        >
          <Text style={{ color: theme.colors.dark, fontSize: 15, fontWeight: '600' }}>Continue to App</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0806' }}>
      {/* Exit button overlay */}
      <View
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
          paddingTop: 16, paddingHorizontal: 20, paddingBottom: 12,
          flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10,
            paddingVertical: 6, paddingHorizontal: 14,
            borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <Text style={{ color: 'rgba(245,245,245,0.5)', fontSize: 11, fontWeight: '500' }}>Exit</Text>
        </TouchableOpacity>
      </View>
      <WardrobeExperience />
    </View>
  );
}
