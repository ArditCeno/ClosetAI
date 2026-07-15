import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../utils/theme';

interface ShelfItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  count?: number;
}

interface ShelfProps {
  title?: string;
  items: ShelfItem[];
  onItemPress?: (item: ShelfItem) => void;
  columns?: 2 | 3;
}

export default function Shelf({ title, items, onItemPress, columns = 3 }: ShelfProps) {
  return (
    <View className="mb-6">
      {title && (
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.fontSize.sm,
            fontWeight: '600',
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 14,
            marginLeft: 4,
          }}
        >
          {title}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {items.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(index * 80).springify()}
            style={{ width: columns === 3 ? '31%' : '48%' }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onItemPress?.(item)}
              style={{
                backgroundColor: 'rgba(22, 22, 22, 0.8)',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.06)',
                padding: 16,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: `${item.color}15`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 22 }}>{item.icon}</Text>
              </View>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: theme.fontSize.sm,
                  fontWeight: '500',
                  textAlign: 'center',
                }}
                numberOfLines={1}
              >
                {item.label}
              </Text>
              {item.count !== undefined && (
                <Text
                  style={{
                    color: theme.colors.textTertiary,
                    fontSize: theme.fontSize.xs,
                    marginTop: 4,
                  }}
                >
                  {item.count} items
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
