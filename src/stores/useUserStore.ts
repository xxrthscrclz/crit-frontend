import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  channelName: string | null;
  channelURL: string | null;
  userEmail: string | null;
  joinDate: string | null;
}

interface UserStore extends UserProfile {
  setUser: (profile: UserProfile) => void;
  clearUser: () => void;
}

const emptyProfile: UserProfile = {
  channelName: null,
  channelURL: null,
  userEmail: null,
  joinDate: null,
};

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      ...emptyProfile,
      setUser: profile =>
        set(state => ({
          ...state,
          ...profile,
        })),
      clearUser: () =>
        set(state => ({
          ...state,
          ...emptyProfile,
        })),
    }),
    {
      name: 'user-storage',
      partialize: state => ({
        channelName: state.channelName,
        channelURL: state.channelURL,
        userEmail: state.userEmail,
        joinDate: state.joinDate,
      }),
    },
  ),
);

export default useUserStore;
