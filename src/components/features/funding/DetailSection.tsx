import { StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';
import { colors, fonts } from '@/constants/theme';

interface Props {
  label: string;
  children: ReactNode;
}

export function DetailSection({ label, children }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.primary,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  body: { gap: 6 },
});
