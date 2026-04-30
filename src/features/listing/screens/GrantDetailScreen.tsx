import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useGrantDetail } from '@/hooks/queries/funding';
import { colors, fonts, spacing } from '@/design/tokens';
import { formatCurrency, formatDate } from '@/utils/format';
import { Chip } from '@/components/funding/Chip';
import { DetailHeader } from '@/components/funding/DetailHeader';
import { DetailSection } from '@/components/funding/DetailSection';

export default function GrantDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = useGrantDetail(id);

  const onApply = () => {
    if (q.data?.application_link) Linking.openURL(q.data.application_link).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title="Grant" />
      {q.isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : !q.data ? (
        <View style={styles.center}>
          <Text style={styles.muted}>Grant not found.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.heroCard}>
            <Text style={styles.provider}>{q.data.provider_name}</Text>
            <Text style={styles.heroTitle}>{q.data.title}</Text>
            <View style={styles.amountPill}>
              <Text style={styles.amountLabel}>Grant amount</Text>
              <Text style={styles.amountValue}>{formatCurrency(q.data.grant_amount)}</Text>
            </View>
          </View>
          <View style={styles.chipRow}>
            <Chip label={`Deadline ${formatDate(q.data.deadline)}`} tone="warning" />
            {q.data.tags?.slice(0, 3).map((t) => (
              <Chip key={t} label={t} />
            ))}
          </View>
          <DetailSection label="About this grant">
            <Text style={styles.paragraph}>{q.data.description || 'No description provided.'}</Text>
          </DetailSection>
          {q.data.eligibility?.length > 0 && (
            <DetailSection label="Eligibility">
              {q.data.eligibility.map((b, i) => (
                <Text key={i} style={styles.bullet}>
                  .  {b}
                </Text>
              ))}
            </DetailSection>
          )}
          <Pressable style={styles.primaryCta} onPress={onApply} disabled={!q.data.application_link}>
            <Text style={styles.primaryCtaLabel}>Apply for Grant</Text>
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
  heroCard: { backgroundColor: colors.tertiaryContainer, borderRadius: 20, padding: spacing.lg, gap: 6 },
  provider: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.tertiary, textTransform: 'uppercase', letterSpacing: 1 },
  heroTitle: { fontFamily: fonts.headline, fontSize: 22, color: '#075985' },
  amountPill: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 2,
  },
  amountLabel: { fontFamily: fonts.body, fontSize: 10, color: colors.slate500, textTransform: 'uppercase', letterSpacing: 0.6 },
  amountValue: { fontFamily: fonts.headlineSemi, fontSize: 16, color: colors.onSurface },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  paragraph: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.onSurfaceVariant },
  bullet: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.onSurfaceVariant },
  primaryCta: { marginTop: spacing.md, backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  primaryCtaLabel: { fontFamily: fonts.label, fontSize: 14, color: colors.onPrimary },
});
