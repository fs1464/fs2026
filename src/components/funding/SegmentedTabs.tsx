import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';

export type FundingSegment = 'deals' | 'cohorts' | 'grants';

interface Props {
  value: FundingSegment;
  onChange: (v: FundingSegment) => void;
}

const OPTIONS: { key: FundingSegment; label: string }[] = [
  { key: 'deals', label: 'Deals' },
  { key: 'cohorts', label: 'Cohorts' },
  { key: 'grants', label: 'Grants' },
];

export function SegmentedTabs({ value, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      {OPTIONS.map((opt) => {
        const active = opt.key === value;
        return (
          <Pressable key={opt.key} onPress={() => onChange(opt.key)} style={[styles.tab, active && styles.tabActive]}>
            <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainer,
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  label: { fontFamily: fonts.label, fontSize: 13, color: colors.slate500 },
  labelActive: { color: colors.onSurface },
});
