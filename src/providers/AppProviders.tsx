import type { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { LocationProvider } from './LocationProvider';
import { NotificationProvider } from './NotificationProvider';
import { WebSocketProvider } from './WebSocketProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <LocationProvider>
            <NotificationProvider>
              <WebSocketProvider>{children}</WebSocketProvider>
            </NotificationProvider>
          </LocationProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
