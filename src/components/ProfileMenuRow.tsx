import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BarnagardColors } from '@/constants/barnagard';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type Props = {
  label: string;
  onPress?: () => void;
  icon?: IconName;
  iconColor?: string;
  labelColor?: string;
  chevronColor?: string;
  showStatusDot?: boolean;
};

export default function ProfileMenuRow({
  label,
  onPress,
  icon,
  iconColor = BarnagardColors.link,
  labelColor = BarnagardColors.textPrimary,
  chevronColor = '#B8C0CC',
  showStatusDot = false,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && styles.rowPressed,
      ]}
      onPress={onPress}
    >
      {icon ? (
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={iconColor}
          style={styles.icon}
        />
      ) : null}

      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>

      {showStatusDot ? <View style={styles.dot} /> : null}

      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color={chevronColor}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: BarnagardColors.card,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowPressed: {
    opacity: 0.92,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BarnagardColors.badge,
    marginRight: 8,
  },
});
