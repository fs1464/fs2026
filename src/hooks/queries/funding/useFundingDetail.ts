import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryClient';
import { getCohort, getDeal, getGrant } from '@/services/funding';

export function useDealDetail(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.funding.dealDetail(id ?? ''),
    queryFn: () => getDeal(id as string),
    enabled: !!id,
  });
}

export function useCohortDetail(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.funding.cohortDetail(id ?? ''),
    queryFn: () => getCohort(id as string),
    enabled: !!id,
  });
}

export function useGrantDetail(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.funding.grantDetail(id ?? ''),
    queryFn: () => getGrant(id as string),
    enabled: !!id,
  });
}
