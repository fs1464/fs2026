import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CalendarClock, MapPin } from 'lucide-react-native';
import { colors, fonts } from '@/constants/theme';
import { daysUntil, formatDate } from '@/utils/format';
import type { Cohort } from '@/types/funding';
import { Chip } from './Chip';

interface Props {
  cohort: Cohort;
  onPress: () => void;
}

export function CohortCard({ cohort, onPress }: Props) {
  const days = daysUntil(cohort.application_deadline);
  const deadlineTone = days != null && days <= 7 ? 'warning' : 'default';
  const deadlineLabel =
    days == null
      ? formatDate(cohort.application_deadline)
      : days < 0
        ? 'Closed'
        : days === 0
          ? 'Closes today'
          : `${days} days left`;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <Text style={styles.org} numberOfLines={1}>
          {cohort.organization_name || 'Organization'}
        </Text>
        <Chip label={deadlineLabel} tone={deadlineTone} />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {cohort.program_name || 'Program'}
      </Text>
      <Text style={styles.desc} numberOfLines={2}>
        {cohort.description}
      </Text>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <CalendarClock size={12} color={colors.slate500} strokeWidth={2} />
          <Text style={styles.footerText}>Apply by {formatDate(cohort.application_deadline)}</Text>
        </View>
        {!!cohort.location && (
          <View style={styles.footerItem}>
            <MapPin size={12} color={colors.slate500} strokeWidth={2} />
            <Text style={styles.footerText}>{cohort.location}</Text>
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
    gap: 8,
  },
  pressed: { opacity: 0.85 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  org: { flex: 1, fontFamily: fonts.bodySemi, fontSize: 12, color: colors.primaryDim, textTransform: 'uppercase', letterSpacing: 0.5 },
  title: { fontFamily: fonts.headline, fontSize: 16, color: colors.onSurface },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.onSurfaceVariant, lineHeight: 19 },
  footer: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginTop: 4 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontFamily: fonts.body, fontSize: 12, color: colors.slate500 },
});
