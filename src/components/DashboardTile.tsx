import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  BarnagardColors,
  type DashboardItem,
} from '@/constants/barnagard';

type Props = {
  item: DashboardItem;
  width: number;
  onPress?: () => void;
};

export default function DashboardTile({ item, width, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.tile,
        { width },
        pressed && styles.tilePressed,
      ]}
      onPress={onPress}
    >
      {item.badge != null && item.badge > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      ) : null}

      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={item.icon}
          size={44}
          color="#1A1A1A"
        />
      </View>

      <Text style={styles.label} numberOfLines={2}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    aspectRatio: 1,
    backgroundColor: BarnagardColors.tile,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tilePressed: {
    opacity: 0.92,
  },
  iconWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: BarnagardColors.label,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BarnagardColors.badge,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
