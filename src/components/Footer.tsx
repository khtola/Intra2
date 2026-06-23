import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { BarnagardColors } from '@/constants/barnagard';

const PHONE = '+298727200';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.textRow}>
        <Text style={styles.text}>INTRA, </Text>
        <Pressable onPress={() => Linking.openURL(`tel:${PHONE}`)}>
          <Text style={styles.link}>+298 72 72 00</Text>
        </Pressable>
        <Text style={styles.text}>, www.intra.fo</Text>
      </View>
      <Text style={styles.logo}>INTRA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: BarnagardColors.footerBackground,
    paddingHorizontal: 22,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  text: {
    color: BarnagardColors.footerText,
    fontSize: 12,
  },
  link: {
    color: BarnagardColors.footerLink,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  logo: {
    color: BarnagardColors.footerText,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
