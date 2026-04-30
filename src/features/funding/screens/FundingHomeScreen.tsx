import { useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react-native';
import { colors, fonts, spacing } from '@/constants/theme';
import { SegmentedTabs, type FundingSegment } from '@/components/funding/SegmentedTabs';
import { DealCard } from '@/components/funding/DealCard';
import { CohortCard } from '@/components/funding/CohortCard';
import { GrantCard } from '@/components/funding/GrantCard';
import { CardSkeleton } from '@/components/funding/Skeleton';
import { EmptyState } from '@/components/funding/EmptyState';
import { listCohorts, listDeals, listGrants } from '@/services/funding';
import type { Cohort, Deal, Grant } from '@/types/funding';

export default function FundingTab() {
  const [segment, setSegment] = useState<FundingSegment>('deals');

  const dealsQ = useQuery({
    queryKey: ['funding', 'deals'],
    queryFn: () => listDeals(0),
    enabled: segment === 'deals',
  });
  const cohortsQ = useQuery({
    queryKey: ['funding', 'cohorts'],
    queryFn: () => listCohorts(0),
    enabled: segment === 'cohorts',
  });
  const grantsQ = useQuery({
    queryKey: ['funding', 'grants'],
    queryFn: () => listGrants(0),
    enabled: segment === 'grants',
  });

  const active =
    segment === 'deals' ? dealsQ : segment === 'cohorts' ? cohortsQ : grantsQ;

  const handleCreate = () => {
    router.push(`/listing/create?type=${segment}` as never);
  };

  const handleOpen = (type: FundingSegment, id: string) => {
    router.push(`/listing/${type}/${id}` as never);
  };

  const emptyCopy: Record<FundingSegment, { title: string; body: string; cta: string }> = {
    deals: { title: 'No active deals', body: 'Be the first to post a funding opportunity for founders and investors.', cta: 'Post a deal' },
    cohorts: { title: 'No cohort programs', body: 'Incubators and accelerators can list programs for founders here.', cta: 'Create cohort' },
    grants: { title: 'No grants listed', body: 'Share grant opportunities with the community of founders.', cta: 'Add grant' },
  };

  const renderContent = () => {
    if (active.isLoading) {
      return (
        <View style={styles.listWrap}>
          {[0, 1, 2].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </View>
      );
    }
    if (active.isError) {
      return (
        <EmptyState
          title="Couldn't load listings"
          body="Something went wrong. Please try again."
          ctaLabel="Retry"
          onCta={() => active.refetch()}
        />
      );
    }
    const data = active.data ?? [];
    if (data.length === 0) {
      const copy = emptyCopy[segment];
      return <EmptyState title={copy.title} body={copy.body} ctaLabel={copy.cta} onCta={handleCreate} />;
    }
    return (
      <FlatList
        data={data as (Deal | Cohort | Grant)[]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listWrap}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        refreshControl={
          <RefreshControl refreshing={active.isRefetching} onRefresh={() => active.refetch()} tintColor={colors.primary} />
        }
        renderItem={({ item }) => {
          if (segment === 'deals') return <DealCard deal={item as Deal} onPress={() => handleOpen('deals', item.id)} />;
          if (segment === 'cohorts') return <CohortCard cohort={item as Cohort} onPress={() => handleOpen('cohorts', item.id)} />;
          return <GrantCard grant={item as Grant} onPress={() => handleOpen('grants', item.id)} />;
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Funding</Text>
          <Text style={styles.title}>Deals, Cohorts & Grants</Text>
        </View>
        <Pressable style={styles.iconBtn} hitSlop={8}>
          <Search size={20} color={colors.slate700} strokeWidth={2} />
        </Pressable>
      </View>
      <View style={styles.segmentWrap}>
        <SegmentedTabs value={segment} onChange={setSegment} />
      </View>
      <View style={styles.body}>{renderContent()}</View>
      <Pressable style={styles.fab} onPress={handleCreate}>
        <Plus size={22} color={colors.onPrimary} strokeWidth={2.5} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  kicker: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.primary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: { fontFamily: fonts.headline, fontSize: 22, color: colors.onSurface, marginTop: 2 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentWrap: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  body: { flex: 1 },
  listWrap: { padding: spacing.lg, gap: 12, paddingBottom: 120 },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
