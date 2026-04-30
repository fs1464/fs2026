import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getCohort } from '@/services/funding';
import { colors, fonts, spacing } from '@/constants/theme';
import { formatCurrency, formatDate } from '@/utils/format';
import { Chip } from '@/components/funding/Chip';
import { DetailHeader } from '@/components/funding/DetailHeader';
import { DetailSection } from '@/components/funding/DetailSection';

export default function CohortDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = useQuery({ queryKey: ['cohort', id], queryFn: () => getCohort(id as string), enabled: !!id });

  const onApply = () => {
    if (q.data?.application_link) Linking.openURL(q.data.application_link).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title="Cohort" />
      {q.isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : !q.data ? (
        <View style={styles.center}>
          <Text style={styles.muted}>Cohort not found.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.heroCard}>
            <Text style={styles.orgName}>{q.data.organization_name}</Text>
            <Text style={styles.heroTitle}>{q.data.program_name}</Text>
            <View style={styles.chipRow}>
              <Chip label={`Apply by ${formatDate(q.data.application_deadline)}`} tone="warning" />
              {!!q.data.location && <Chip label={q.data.location} />}
            </View>
          </View>
          <DetailSection label="Program overview">
            <Text style={styles.paragraph}>{q.data.description || 'No description provided.'}</Text>
          </DetailSection>
          <View style={styles.dateRow}>
            <View style={styles.dateCell}>
              <Text style={styles.dateLabel}>Start</Text>
              <Text style={styles.dateValue}>{formatDate(q.data.start_date)}</Text>
            </View>
            <View style={styles.dateCell}>
              <Text style={styles.dateLabel}>End</Text>
              <Text style={styles.dateValue}>{formatDate(q.data.end_date)}</Text>
            </View>
          </View>
          {(q.data.stipend || q.data.equity_taken) && (
            <DetailSection label="Terms">
              {!!q.data.stipend && (
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Stipend</Text>
                  <Text style={styles.kvValue}>{formatCurrency(q.data.stipend)}</Text>
                </View>
              )}
              {q.data.equity_taken != null && (
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Equity taken</Text>
                  <Text style={styles.kvValue}>{q.data.equity_taken}%</Text>
                </View>
              )}
            </DetailSection>
          )}
          {q.data.benefits?.length > 0 && (
            <DetailSection label="Benefits">
              {q.data.benefits.map((b, i) => (
                <Text key={i} style={styles.bullet}>
                  .  {b}
                </Text>
              ))}
            </DetailSection>
          )}
          {q.data.eligibility_criteria?.length > 0 && (
            <DetailSection label="Eligibility">
              {q.data.eligibility_criteria.map((b, i) => (
                <Text key={i} style={styles.bullet}>
                  .  {b}
                </Text>
              ))}
            </DetailSection>
          )}
          <Pressable style={styles.primaryCta} onPress={onApply} disabled={!q.data.application_link}>
            <Text style={styles.primaryCtaLabel}>Apply Now</Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { fontFamily: fonts.body, color: colors.onSurfaceVariant },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  heroCard: { backgroundColor: colors.primaryContainer, borderRadius: 20, padding: spacing.lg, gap: 6 },
  orgName: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.primaryDim, textTransform: 'uppercase', letterSpacing: 1 },
  heroTitle: { fontFamily: fonts.headline, fontSize: 22, color: colors.onPrimaryContainer },
  chipRow: { flexDirection: 'row', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  paragraph: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.onSurfaceVariant },
  dateRow: { flexDirection: 'row', gap: 10 },
  dateCell: { flex: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.outlineVariant, borderRadius: 14, padding: 14, gap: 4 },
  dateLabel: { fontFamily: fonts.body, fontSize: 11, color: colors.slate500, textTransform: 'uppercase', letterSpacing: 0.5 },
  dateValue: { fontFamily: fonts.headlineSemi, fontSize: 14, color: colors.onSurface },
  kvRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
  kvKey: { fontFamily: fonts.body, fontSize: 13, color: colors.slate500 },
  kvValue: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.onSurface },
  bullet: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.onSurfaceVariant },
  primaryCta: { marginTop: spacing.md, backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  primaryCtaLabel: { fontFamily: fonts.label, fontSize: 14, color: colors.onPrimary },
});
