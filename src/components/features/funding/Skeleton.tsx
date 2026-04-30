import { StyleSheet, View } from 'react-native';
import { colors } from '@/constants/theme';

export function CardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.lineLg} />
      <View style={styles.lineMd} />
      <View style={styles.lineSm} />
      <View style={styles.row}>
        <View style={styles.pill} />
        <View style={styles.pill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    gap: 10,
  },
  lineLg: { height: 16, width: '70%', borderRadius: 6, backgroundColor: colors.surfaceContainer },
  lineMd: { height: 12, width: '50%', borderRadius: 6, backgroundColor: colors.surfaceContainer },
  lineSm: { height: 10, width: '90%', borderRadius: 6, backgroundColor: colors.surfaceContainer },
  row: { flexDirection: 'row', gap: 8, marginTop: 4 },
  pill: { height: 22, width: 72, borderRadius: 999, backgroundColor: colors.surfaceContainer },
});
