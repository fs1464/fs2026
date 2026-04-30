import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MapPin, TrendingUp } from 'lucide-react-native';
import { colors, fonts } from '@/constants/theme';
import { formatCurrency } from '@/utils/format';
import type { Deal } from '@/types/funding';
import { Chip } from './Chip';

interface Props {
  deal: Deal;
  onPress: () => void;
}

const STAGE_LABELS: Record<Deal['stage'], string> = {
  idea: 'Idea',
  mvp: 'MVP',
  early: 'Early',
  growth: 'Growth',
  scale: 'Scale',
};

export function DealCard({ deal, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {deal.business_name || 'Untitled'}
        </Text>
        <Chip label={STAGE_LABELS[deal.stage]} tone="primary" />
      </View>
      <Text style={styles.desc} numberOfLines={2}>
        {deal.description}
      </Text>
      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Ask</Text>
          <Text style={styles.metricValue}>{formatCurrency(deal.funding_ask)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Equity</Text>
          <Text style={styles.metricValue}>{deal.equity_offered}%</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Revenue</Text>
          <Text style={styles.metricValue}>{formatCurrency(deal.revenue)}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        {!!deal.industry && (
          <View style={styles.footerItem}>
            <TrendingUp size={12} color={colors.slate500} strokeWidth={2} />
            <Text style={styles.footerText}>{deal.industry}</Text>
          </View>
        )}
        {!!deal.location && (
          <View style={styles.footerItem}>
            <MapPin size={12} color={colors.slate500} strokeWidth={2} />
            <Text style={styles.footerText}>{deal.location}</Text>
          </View>
        )}
      </View>
    </Pressable>
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
  pressed: { opacity: 0.85, transform: [{ scale: 0.995 }] },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  title: { flex: 1, fontFamily: fonts.headline, fontSize: 16, color: colors.onSurface },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 19 },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
    alignItems: 'center',
  },
  metric: { flex: 1, alignItems: 'center', gap: 2 },
  metricLabel: { fontFamily: fonts.body, fontSize: 10, color: colors.slate500, textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { fontFamily: fonts.headlineSemi, fontSize: 13, color: colors.onSurface },
  divider: { width: 1, height: 24, backgroundColor: colors.outlineVariant },
  footer: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginTop: 4 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
});
