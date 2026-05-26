import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MemberLoginResponse } from '@/api/command';

export interface UserProfile {
  channelName: string | null;
  channelURL: string | null;
  userEmail: string | null;
  joinDate: string | null;
  category: string | null;
}

interface UserStore extends UserProfile {
  testAccounts: MemberLoginResponse[];
  setUser: (profile: UserProfile) => void;
  setTestAccounts: (accounts: MemberLoginResponse[]) => void;
  clearTestAccounts: () => void;
  clearUser: () => void;
}

const emptyProfile: UserProfile = {
  channelName: null,
  channelURL: null,
  userEmail: null,
  joinDate: null,
  category: null,
};

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      ...emptyProfile,
      testAccounts: [],
      setUser: profile =>
        set(state => ({
          ...state,
          ...profile,
        })),
      setTestAccounts: accounts =>
        set(state => ({
          ...state,
          testAccounts: accounts,
        })),
      clearTestAccounts: () =>
        set(state => ({
          ...state,
          testAccounts: [],
        })),
      clearUser: () =>
        set(state => ({
          ...state,
          ...emptyProfile,
          testAccounts: [],
        })),
    }),
    {
      name: 'user-storage',
      partialize: state => ({
        channelName: state.channelName,
        channelURL: state.channelURL,
        userEmail: state.userEmail,
        joinDate: state.joinDate,
        category: state.category,
      }),
    },
  ),
);

export default useUserStore;
