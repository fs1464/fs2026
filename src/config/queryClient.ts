import { QueryCache, QueryClient } from '@tanstack/react-query';
import { AppError } from '@/errors/domain.errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: (failureCount, error) => {
        if (error instanceof AppError) {
          if (error.statusCode >= 400 && error.statusCode < 500) return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache(),
});

export const queryKeys = {
  funding: {
    all: ['funding'] as const,
    deals: (page = 0) => ['funding', 'deals', page] as const,
    cohorts: (page = 0) => ['funding', 'cohorts', page] as const,
    grants: (page = 0) => ['funding', 'grants', page] as const,
    dealDetail: (id: string) => ['funding', 'deals', 'detail', id] as const,
    cohortDetail: (id: string) => ['funding', 'cohorts', 'detail', id] as const,
    grantDetail: (id: string) => ['funding', 'grants', 'detail', id] as const,
  },
  user: {
    profile: ['user', 'profile'] as const,
  },
} as const;
