import { TouchableOpacity, Text, type TouchableOpacityProps, type TextProps } from 'react-native';
import { theme } from '../utils/theme';

interface PremiumButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'gold' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  textProps?: TextProps;
}

export default function PremiumButton({
  variant = 'primary',
  size = 'md',
  label,
  style,
  textProps,
  children,
  ...props
}: PremiumButtonProps) {
  const bgColors = {
    primary: theme.colors.gold,
    gold: theme.colors.gold,
    ghost: 'transparent',
    danger: theme.colors.red,
  };

  const textColors = {
    primary: theme.colors.dark,
    gold: theme.colors.dark,
    ghost: theme.colors.gold,
    danger: theme.colors.white,
  };

  const paddings = {
    sm: { py: 8, px: 16, fs: theme.fontSize.sm },
    md: { py: 12, px: 24, fs: theme.fontSize.md },
    lg: { py: 16, px: 32, fs: theme.fontSize.lg },
  };

  const p = paddings[size];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: bgColors[variant],
          paddingVertical: p.py,
          paddingHorizontal: p.px,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          shadowColor: variant === 'ghost' ? 'transparent' : theme.colors.gold,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
      {label && (
        <Text
          style={{
            color: textColors[variant],
            fontSize: p.fs,
            fontWeight: '600',
          }}
          {...textProps}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
