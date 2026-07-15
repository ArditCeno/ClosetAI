import { View, type ViewProps } from 'react-native';

interface GlassCardProps extends ViewProps {
  variant?: 'dark' | 'light' | 'gold';
  glow?: boolean;
}

const variants = {
  dark: {
    bg: 'rgba(22, 22, 22, 0.6)',
    border: 'rgba(255, 255, 255, 0.08)',
  },
  light: {
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  gold: {
    bg: 'rgba(200, 164, 92, 0.1)',
    border: 'rgba(200, 164, 92, 0.2)',
  },
};

export default function GlassCard({
  variant = 'dark',
  glow = false,
  style,
  children,
  ...props
}: GlassCardProps) {
  const v = variants[variant];
  return (
    <View
      style={[
        {
          backgroundColor: v.bg,
          borderWidth: 1,
          borderColor: v.border,
          borderRadius: 16,
          shadowColor: glow ? '#C8A45C' : '#000',
          shadowOffset: { width: 0, height: glow ? 0 : 4 },
          shadowOpacity: glow ? 0.3 : 0.3,
          shadowRadius: glow ? 20 : 12,
          elevation: 8,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
