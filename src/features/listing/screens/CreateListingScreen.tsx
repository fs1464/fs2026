import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, fonts, spacing } from '@/design/tokens';
import { Field } from '@/components/funding/Field';
import { DetailHeader } from '@/components/funding/DetailHeader';
import {
  useCreateCohort,
  useCreateDeal,
  useCreateGrant,
} from '@/hooks/mutations/funding';
import { supabase } from '@/lib/api/client';
import { AppError } from '@/errors/domain.errors';
import type { DealStage } from '@/types/funding';

type CreateType = 'deals' | 'cohorts' | 'grants';

const STAGES: DealStage[] = ['idea', 'mvp', 'early', 'growth', 'scale'];

export default function CreateFundingScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const kind: CreateType = (type === 'cohorts' || type === 'grants' ? type : 'deals') as CreateType;
  const createDealM = useCreateDeal();
  const createCohortM = useCreateCohort();
  const createGrantM = useCreateGrant();

  const [values, setValues] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<DealStage>('idea');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const set = (key: string) => (text: string) => setValues((v) => ({ ...v, [key]: text }));

  const parseList = (text: string | undefined) =>
    (text ?? '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

  const num = (text: string | undefined) => {
    const n = Number(text);
    return Number.isFinite(n) ? n : 0;
  };

  const onSubmit = async () => {
    setErrorMsg(null);
    setSubmitting(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) {
        setErrorMsg('Please sign in to post a listing.');
        setSubmitting(false);
        return;
      }
      if (kind === 'deals') {
        if (!values.business_name?.trim()) throw new Error('Business name is required');
        await createDealM.mutateAsync({
          input: {
            business_name: values.business_name.trim(),
            description: values.description?.trim() ?? '',
            revenue: num(values.revenue),
            funding_ask: num(values.funding_ask),
            equity_offered: num(values.equity_offered),
            stage,
            industry: values.industry?.trim() ?? '',
            location: values.location?.trim() ?? '',
            status: 'active',
          },
          userId,
        });
      } else if (kind === 'cohorts') {
        if (!values.program_name?.trim()) throw new Error('Program name is required');
        await createCohortM.mutateAsync({
          input: {
            organization_name: values.organization_name?.trim() ?? '',
            program_name: values.program_name.trim(),
            description: values.description?.trim() ?? '',
            benefits: parseList(values.benefits),
            eligibility_criteria: parseList(values.eligibility_criteria),
            application_deadline: values.application_deadline || null,
            start_date: values.start_date || null,
            end_date: values.end_date || null,
            stipend: values.stipend ? num(values.stipend) : null,
            equity_taken: values.equity_taken ? num(values.equity_taken) : null,
            location: values.location?.trim() ?? '',
            application_link: values.application_link?.trim() ?? '',
            status: 'active',
          },
          userId,
        });
      } else {
        if (!values.title?.trim()) throw new Error('Grant title is required');
        await createGrantM.mutateAsync({
          input: {
            title: values.title.trim(),
            provider_name: values.provider_name?.trim() ?? '',
            description: values.description?.trim() ?? '',
            grant_amount: num(values.grant_amount),
            eligibility: parseList(values.eligibility),
            deadline: values.deadline || null,
            application_link: values.application_link?.trim() ?? '',
            tags: parseList(values.tags),
            status: 'active',
          },
          userId,
        });
      }
      router.back();
    } catch (e) {
      const msg =
        e instanceof AppError
          ? e.userMessage
          : e instanceof Error
            ? e.message
            : 'Failed to create listing';
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const headerTitle =
    kind === 'deals' ? 'Post a Deal' : kind === 'cohorts' ? 'Create Cohort' : 'Add Grant';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <DetailHeader title={headerTitle} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {errorMsg && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errorMsg}</Text>
            </View>
          )}

          {kind === 'deals' && (
            <>
              <Field label="Business name" value={values.business_name ?? ''} onChangeText={set('business_name')} placeholder="e.g. Acme Labs" />
              <Field label="Description" value={values.description ?? ''} onChangeText={set('description')} placeholder="What does the business do?" multiline numberOfLines={4} style={{ minHeight: 96, textAlignVertical: 'top' }} />
              <View style={styles.row}>
                <View style={styles.half}>
                  <Field label="Annual revenue (INR)" value={values.revenue ?? ''} onChangeText={set('revenue')} keyboardType="numeric" placeholder="0" />
                </View>
                <View style={styles.half}>
                  <Field label="Funding ask (INR)" value={values.funding_ask ?? ''} onChangeText={set('funding_ask')} keyboardType="numeric" placeholder="0" />
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.half}>
                  <Field label="Equity offered (%)" value={values.equity_offered ?? ''} onChangeText={set('equity_offered')} keyboardType="numeric" placeholder="0" />
                </View>
                <View style={styles.half}>
                  <Field label="Industry" value={values.industry ?? ''} onChangeText={set('industry')} placeholder="e.g. SaaS" />
                </View>
              </View>
              <Field label="Location" value={values.location ?? ''} onChangeText={set('location')} placeholder="e.g. Bengaluru" />
              <View style={styles.gap}>
                <Text style={styles.groupLabel}>Stage</Text>
                <View style={styles.chipGrid}>
                  {STAGES.map((s) => {
                    const active = s === stage;
                    return (
                      <Pressable
                        key={s}
                        onPress={() => setStage(s)}
                        style={[styles.stageChip, active && styles.stageChipActive]}
                      >
                        <Text style={[styles.stageChipLabel, active && styles.stageChipLabelActive]}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </>
          )}

          {kind === 'cohorts' && (
            <>
              <Field label="Organization name" value={values.organization_name ?? ''} onChangeText={set('organization_name')} placeholder="e.g. Sequoia Surge" />
              <Field label="Program name" value={values.program_name ?? ''} onChangeText={set('program_name')} placeholder="e.g. Surge 10" />
              <Field label="Description" value={values.description ?? ''} onChangeText={set('description')} placeholder="Describe the program" multiline numberOfLines={4} style={{ minHeight: 96, textAlignVertical: 'top' }} />
              <Field label="Benefits (one per line)" value={values.benefits ?? ''} onChangeText={set('benefits')} placeholder={'Mentorship\nNetwork access'} multiline numberOfLines={4} style={{ minHeight: 80, textAlignVertical: 'top' }} />
              <Field label="Eligibility (one per line)" value={values.eligibility_criteria ?? ''} onChangeText={set('eligibility_criteria')} placeholder={'Incorporated startup\nEarly-stage'} multiline numberOfLines={4} style={{ minHeight: 80, textAlignVertical: 'top' }} />
              <View style={styles.row}>
                <View style={styles.half}>
                  <Field label="Start date" value={values.start_date ?? ''} onChangeText={set('start_date')} placeholder="YYYY-MM-DD" />
                </View>
                <View style={styles.half}>
                  <Field label="End date" value={values.end_date ?? ''} onChangeText={set('end_date')} placeholder="YYYY-MM-DD" />
                </View>
              </View>
              <Field label="Application deadline" value={values.application_deadline ?? ''} onChangeText={set('application_deadline')} placeholder="YYYY-MM-DD" />
              <View style={styles.row}>
                <View style={styles.half}>
                  <Field label="Stipend (INR, optional)" value={values.stipend ?? ''} onChangeText={set('stipend')} keyboardType="numeric" placeholder="0" />
                </View>
                <View style={styles.half}>
                  <Field label="Equity taken (%, optional)" value={values.equity_taken ?? ''} onChangeText={set('equity_taken')} keyboardType="numeric" placeholder="0" />
                </View>
              </View>
              <Field label="Location" value={values.location ?? ''} onChangeText={set('location')} placeholder="e.g. Remote / Mumbai" />
              <Field label="Application link" value={values.application_link ?? ''} onChangeText={set('application_link')} autoCapitalize="none" placeholder="https://" />
            </>
          )}

          {kind === 'grants' && (
            <>
              <Field label="Grant title" value={values.title ?? ''} onChangeText={set('title')} placeholder="e.g. Startup India Seed Fund" />
              <Field label="Provider name" value={values.provider_name ?? ''} onChangeText={set('provider_name')} placeholder="e.g. Government of India" />
              <Field label="Description" value={values.description ?? ''} onChangeText={set('description')} placeholder="Describe the grant" multiline numberOfLines={4} style={{ minHeight: 96, textAlignVertical: 'top' }} />
              <Field label="Grant amount (INR)" value={values.grant_amount ?? ''} onChangeText={set('grant_amount')} keyboardType="numeric" placeholder="0" />
              <Field label="Eligibility (one per line)" value={values.eligibility ?? ''} onChangeText={set('eligibility')} placeholder={'Indian startups\nDPIIT-recognized'} multiline numberOfLines={4} style={{ minHeight: 80, textAlignVertical: 'top' }} />
              <Field label="Deadline" value={values.deadline ?? ''} onChangeText={set('deadline')} placeholder="YYYY-MM-DD" />
              <Field label="Tags (one per line)" value={values.tags ?? ''} onChangeText={set('tags')} placeholder={'government\nseed'} multiline numberOfLines={3} style={{ minHeight: 60, textAlignVertical: 'top' }} />
              <Field label="Application link" value={values.application_link ?? ''} onChangeText={set('application_link')} autoCapitalize="none" placeholder="https://" />
            </>
          )}

          <Pressable onPress={onSubmit} disabled={submitting} style={[styles.submit, submitting && styles.submitDisabled]}>
            <Text style={styles.submitLabel}>{submitting ? 'Publishing...' : 'Publish'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  body: { padding: spacing.lg, gap: spacing.md, paddingBottom: 120 },
  row: { flexDirection: 'row', gap: 10 },
  half: { flex: 1 },
  gap: { gap: 8 },
  groupLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate700 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  stageChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  stageChipActive: { backgroundColor: colors.primaryContainer, borderColor: colors.primary },
  stageChipLabel: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.slate600 },
  stageChipLabelActive: { color: colors.onPrimaryContainer },
  submit: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitDisabled: { opacity: 0.6 },
  submitLabel: { fontFamily: fonts.label, fontSize: 14, color: colors.onPrimary },
  errorBanner: { backgroundColor: '#fee2e2', borderRadius: 10, padding: 12 },
  errorBannerText: { fontFamily: fonts.body, fontSize: 13, color: '#991b1b' },
});
