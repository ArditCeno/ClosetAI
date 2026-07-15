import { View, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { theme } from '../utils/theme';

interface PalaceDoorsProps {
  open: boolean;
  onOpened?: () => void;
  children?: React.ReactNode;
}

export default function PalaceDoors({ open, onOpened, children }: PalaceDoorsProps) {
  const leftProgress = useSharedValue(0);
  const rightProgress = useSharedValue(0);
  const overlayOpacity = useSharedValue(1);

  useEffect(() => {
    if (open) {
      leftProgress.value = withDelay(
        400,
        withSpring(1, { damping: 12, stiffness: 100, mass: 1.5 }, (finished) => {
          if (finished) {
            rightProgress.value = withSpring(1, { damping: 12, stiffness: 100, mass: 1.5 }, (f2) => {
              if (f2) {
                overlayOpacity.value = withTiming(0, { duration: 500 }, (f3) => {
                  if (f3 && onOpened) runOnJS(onOpened)();
                });
              }
            });
          }
        })
      );
    }
  }, [open]);

  const leftDoorStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${leftProgress.value * -60}deg` },
      { translateX: leftProgress.value * -50 },
    ],
    opacity: 1 - leftProgress.value * 0.3,
  }));

  const rightDoorStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rightProgress.value * 60}deg` },
      { translateX: rightProgress.value * 50 },
    ],
    opacity: 1 - rightProgress.value * 0.3,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    pointerEvents: overlayOpacity.value > 0 ? ('auto' as any) : ('none' as any),
  }));

  if (Platform.OS !== 'web') return <>{children}</>;

  return (
    <>
      {children}
      <Animated.View
        style={[
          {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            flexDirection: 'row',
          },
          overlayStyle,
        ]}
      >
        {/* Left Door */}
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: '#1A0F0A',
              borderRightWidth: 2,
              borderRightColor: theme.colors.gold,
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'hidden',
            },
            leftDoorStyle,
          ]}
        >
          {/* Door ornament */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.15,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  top: `${i * 12.5}%`,
                  left: '10%',
                  right: '10%',
                  height: 1,
                  backgroundColor: theme.colors.gold,
                  opacity: 0.3,
                }}
              />
            ))}
          </View>
          {/* Arch top */}
          <View
            style={{
              position: 'absolute',
              top: -60,
              [open ? 'right' : 'left']: 0,
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 3,
              borderColor: theme.colors.gold,
              opacity: 0.2,
            }}
          />
        </Animated.View>

        {/* Gap in middle (shows content) */}
        <View style={{ width: 0 }} />

        {/* Right Door */}
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: '#1A0F0A',
              borderLeftWidth: 2,
              borderLeftColor: theme.colors.gold,
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'hidden',
            },
            rightDoorStyle,
          ]}
        >
          {/* Door ornament */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.15,
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  top: `${i * 12.5}%`,
                  left: '10%',
                  right: '10%',
                  height: 1,
                  backgroundColor: theme.colors.gold,
                  opacity: 0.3,
                }}
              />
            ))}
          </View>
          {/* Arch top */}
          <View
            style={{
              position: 'absolute',
              top: -60,
              right: 0,
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 3,
              borderColor: theme.colors.gold,
              opacity: 0.2,
            }}
          />
        </Animated.View>

        {/* Light flash */}
        <View
          style={{
            position: 'absolute',
            top: '30%',
            left: '40%',
            right: '40%',
            height: 2,
            backgroundColor: theme.colors.led,
            shadowColor: theme.colors.led,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 40,
          }}
        />
      </Animated.View>
    </>
  );
}
