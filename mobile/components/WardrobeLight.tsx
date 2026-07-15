import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { theme } from '../utils/theme';

interface WardrobeLightProps {
  side: 'left' | 'right';
  delay?: number;
}

export default function WardrobeLight({ side, delay = 0 }: WardrobeLightProps) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: 2000 }),
          withTiming(0.4, { duration: 2000 })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          [side]: 0,
          width: 60,
          height: 4,
          backgroundColor: theme.colors.led,
          borderRadius: 2,
          shadowColor: theme.colors.led,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 12,
          elevation: 8,
        },
        animatedStyle,
      ]}
    />
  );
}
