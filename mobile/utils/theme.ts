export const theme = {
  colors: {
    background: '#0B0B0C',
    dark: '#161616',
    card: '#222222',
    white: '#F5F5F5',
    gold: '#C8A45C',
    led: '#FFE6B8',
    blueAccent: '#5B8DFF',
    greenSuccess: '#55D68A',
    red: '#FF5A63',
    glass: 'rgba(22, 22, 22, 0.6)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    glassLight: 'rgba(255, 255, 255, 0.04)',
    textPrimary: '#F5F5F5',
    textSecondary: 'rgba(245, 245, 245, 0.6)',
    textTertiary: 'rgba(245, 245, 245, 0.35)',
    shadow: 'rgba(0, 0, 0, 0.45)',
    glow: 'rgba(200, 164, 92, 0.15)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
    display: 48,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  animation: {
    spring: {
      damping: 15,
      stiffness: 200,
      mass: 0.8,
    } as const,
    springLight: {
      damping: 20,
      stiffness: 300,
      mass: 0.5,
    } as const,
    springHeavy: {
      damping: 12,
      stiffness: 150,
      mass: 1.2,
    } as const,
  },
};

export const categories = [
  { id: 'tshirts', label: 'T-Shirts', icon: '👕', color: '#5B8DFF' },
  { id: 'shirts', label: 'Shirts', icon: '👔', color: '#C8A45C' },
  { id: 'pants', label: 'Pants', icon: '👖', color: '#55D68A' },
  { id: 'jackets', label: 'Jackets', icon: '🧥', color: '#FF5A63' },
  { id: 'shoes', label: 'Shoes', icon: '👟', color: '#C084FC' },
  { id: 'accessories', label: 'Accessories', icon: '👜', color: '#F97316' },
];

export const occasions = [
  { id: 'work', label: '💼 Work', color: '#5B8DFF' },
  { id: 'casual', label: '😎 Casual', color: '#55D68A' },
  { id: 'date', label: '❤️ Date', color: '#FF5A63' },
  { id: 'formal', label: '🎩 Formal', color: '#C8A45C' },
  { id: 'sport', label: '🏃 Sport', color: '#F97316' },
  { id: 'travel', label: '✈️ Travel', color: '#C084FC' },
  { id: 'beach', label: '🏖 Beach', color: '#38BDF8' },
  { id: 'gym', label: '💪 Gym', color: '#A3E635' },
];

export const tabs = [
  { id: 'index', label: 'Home', icon: '🏠' },
  { id: 'closet', label: 'Closet', icon: '👕' },
  { id: 'scan', label: 'Scan', icon: '📸' },
  { id: 'explore', label: 'AI', icon: '🤖' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];
