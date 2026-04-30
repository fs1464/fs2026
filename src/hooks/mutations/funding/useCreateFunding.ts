import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/config/queryClient';
import { createCohort, createDeal, createGrant } from '@/services/funding';
import type { Cohort, Deal, Grant } from '@/types/funding';

export function useCreateDeal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ input, userId }: { input: Partial<Deal>; userId: string }) =>
      createDeal(input, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.funding.all });
    },
  });
}

export function useCreateCohort() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ input, userId }: { input: Partial<Cohort>; userId: string }) =>
      createCohort(input, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.funding.all });
    },
  });
}

export function useCreateGrant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ input, userId }: { input: Partial<Grant>; userId: string }) =>
      createGrant(input, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.funding.all });
    },
  });
}
