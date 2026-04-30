import { create } from 'zustand';
import { supabase } from '@/lib/api/client';
import type { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialize: () => Promise<void>;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      const { data } = await supabase.auth.getSession();
      set({
        session: data.session,
        user: data.session?.user ?? null,
        isAuthenticated: !!data.session,
        isLoading: false,
      });
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          session,
          user: session?.user ?? null,
          isAuthenticated: !!session,
        });
      });
    } catch {
      set({ isLoading: false });
    }
  },

  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session,
    }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, isAuthenticated: false });
  },
}));
