import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';

interface Props {
  label: string;
  tone?: 'default' | 'primary' | 'success' | 'warning';
}

export function Chip({ label, tone = 'default' }: Props) {
  const bg =
    tone === 'primary'
      ? colors.primaryContainer
      : tone === 'success'
        ? '#dcfce7'
        : tone === 'warning'
          ? '#fef3c7'
          : colors.surfaceContainer;
  const fg =
    tone === 'primary'
      ? colors.onPrimaryContainer
      : tone === 'success'
        ? '#166534'
        : tone === 'warning'
          ? '#92400e'
          : colors.slate600;
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  label: { fontFamily: fonts.bodySemi, fontSize: 11, letterSpacing: 0.2 },
});
