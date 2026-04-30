import { useMutation } from '@tanstack/react-query';
import { toggleBookmark } from '@/services/funding';
import type { FundingEntityType } from '@/types/funding';

export function useToggleBookmark() {
  return useMutation({
    mutationFn: ({
      userId,
      entityType,
      entityId,
    }: {
      userId: string;
      entityType: FundingEntityType;
      entityId: string;
    }) => toggleBookmark(userId, entityType, entityId),
  });
}
