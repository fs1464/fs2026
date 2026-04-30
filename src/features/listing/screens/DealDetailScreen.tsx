import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useDealDetail } from '@/hooks/queries/funding';
import { colors, fonts, spacing } from '@/design/tokens';
import { formatCurrency } from '@/utils/format';
import { Chip } from '@/components/features/funding/Chip';
import { DetailHeader } from '@/components/features/funding/DetailHeader';
import { DetailSection } from '@/components/features/funding/DetailSection';

const STAGE_LABELS: Record<string, string> = {
  idea: 'Idea',
  mvp: 'MVP',
  early: 'Early',
  growth: 'Growth',
  scale: 'Scale',
};

export default function DealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = useDealDetail(id);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title="Deal" />
      {q.isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : !q.data ? (
        <View style={styles.center}>
          <Text style={styles.muted}>Deal not found.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.heroCard}>
            <Chip label={STAGE_LABELS[q.data.stage] ?? q.data.stage} tone="primary" />
            <Text style={styles.heroTitle}>{q.data.business_name}</Text>
            {!!q.data.industry && <Text style={styles.heroMeta}>{q.data.industry}{q.data.location ? ` . ${q.data.location}` : ''}</Text>}
          </View>
          <View style={styles.statsRow}>
            <Stat label="Ask" value={formatCurrency(q.data.funding_ask)} />
            <Stat label="Equity" value={`${q.data.equity_offered}%`} />
            <Stat label="Revenue" value={formatCurrency(q.data.revenue)} />
          </View>
          <DetailSection label="About the business">
            <Text style={styles.paragraph}>{q.data.description || 'No description provided.'}</Text>
          </DetailSection>
          {Object.keys(q.data.traction_metrics || {}).length > 0 && (
            <DetailSection label="Traction">
              {Object.entries(q.data.traction_metrics).map(([k, v]) => (
                <View key={k} style={styles.kvRow}>
                  <Text style={styles.kvKey}>{k}</Text>
                  <Text style={styles.kvValue}>{String(v)}</Text>
                </View>
              ))}
            </DetailSection>
          )}
          <Pressable style={styles.primaryCta}>
            <Text style={styles.primaryCtaLabel}>Express Interest</Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { fontFamily: fonts.body, color: colors.onSurfaceVariant },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  heroCard: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 20,
    padding: spacing.lg,
    gap: 8,
  },
  heroTitle: { fontFamily: fonts.headline, fontSize: 22, color: colors.onPrimaryContainer },
  heroMeta: { fontFamily: fonts.body, fontSize: 13, color: colors.onPrimaryContainer, opacity: 0.85 },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500, textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { fontFamily: fonts.headlineSemi, fontSize: 15, color: colors.onSurface },
  paragraph: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.onSurfaceVariant },
  kvRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
  kvKey: { fontFamily: fonts.body, fontSize: 13, color: colors.slate500 },
  kvValue: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurface },
  primaryCta: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryCtaLabel: { fontFamily: fonts.label, fontSize: 14, color: colors.onPrimary },
});
