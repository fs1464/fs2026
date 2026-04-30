import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarClock, Award } from 'lucide-react-native';
import { colors, fonts } from '@/constants/theme';
import { daysUntil, formatCurrency, formatDate } from '@/utils/format';
import type { Grant } from '@/types/funding';
import { Chip } from './Chip';

interface Props {
  grant: Grant;
  onPress: () => void;
}

export function GrantCard({ grant, onPress }: Props) {
  const days = daysUntil(grant.deadline);
  const deadlineTone = days != null && days <= 7 ? 'warning' : 'default';
  const deadlineLabel =
    days == null
      ? formatDate(grant.deadline)
      : days < 0
        ? 'Closed'
        : days === 0
          ? 'Closes today'
          : `${days} days left`;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <View style={styles.providerWrap}>
          <Award size={14} color={colors.tertiary} strokeWidth={2} />
          <Text style={styles.provider} numberOfLines={1}>
            {grant.provider_name || 'Provider'}
          </Text>
        </View>
        <Chip label={deadlineLabel} tone={deadlineTone} />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {grant.title || 'Grant'}
      </Text>
      <Text style={styles.desc} numberOfLines={2}>
        {grant.description}
      </Text>
      <View style={styles.metricsRow}>
        <Text style={styles.metricLabel}>Grant Amount</Text>
        <Text style={styles.metricValue}>{formatCurrency(grant.grant_amount)}</Text>
      </View>
      <View style={styles.footerItem}>
        <CalendarClock size={12} color={colors.slate500} strokeWidth={2} />
        <Text style={styles.footerText}>Apply by {formatDate(grant.deadline)}</Text>
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
    gap: 8,
  },
  pressed: { opacity: 0.85 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  providerWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  provider: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.tertiary, textTransform: 'uppercase', letterSpacing: 0.4 },
  title: { fontFamily: fonts.headline, fontSize: 16, color: colors.onSurface },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 19 },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 12,
  },
  metricLabel: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
  metricValue: { fontFamily: fonts.headlineSemi, fontSize: 15, color: colors.onSurface },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
});
