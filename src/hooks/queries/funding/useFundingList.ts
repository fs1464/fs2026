import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryClient';
import { listCohorts, listDeals, listGrants } from '@/services/funding';
import type { Cohort, Deal, Grant } from '@/types/funding';

export function useDealsList(page = 0, enabled = true) {
  return useQuery<Deal[]>({
    queryKey: queryKeys.funding.deals(page),
    queryFn: () => listDeals(page),
    enabled,
  });
}

export function useCohortsList(page = 0, enabled = true) {
  return useQuery<Cohort[]>({
    queryKey: queryKeys.funding.cohorts(page),
    queryFn: () => listCohorts(page),
    enabled,
  });
}

export function useGrantsList(page = 0, enabled = true) {
  return useQuery<Grant[]>({
    queryKey: queryKeys.funding.grants(page),
    queryFn: () => listGrants(page),
    enabled,
  });
}
