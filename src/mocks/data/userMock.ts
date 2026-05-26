import type { MemberLoginResponse } from '@/api/command';

/** POST /login_test 응답 mock */
export const mockTestLoginResponses: MemberLoginResponse[] = [
  {
    memberToken: 'mock-member-token-crit',
    channelName: 'CRiT 공식채널',
    channelUrl: 'https://www.youtube.com/channel/UC_DEMO_CRIT_2026',
    userEmail: 'demo@crit.kr',
    joinDate: '2026-01-15',
    category: '교육 / IT',
  },
  {
    memberToken: 'mock-member-token-game',
    channelName: '겜생러 TV',
    channelUrl: 'https://www.youtube.com/channel/UC_DEMO_GAME_2026',
    userEmail: 'demo@crit.kr',
    joinDate: '2026-01-15',
    category: '게임',
  },
  {
    memberToken: 'mock-member-token-travel',
    channelName: '여행하는 지우',
    channelUrl: 'https://www.youtube.com/channel/UC_DEMO_TRAVEL_2026',
    userEmail: 'demo@crit.kr',
    joinDate: '2026-01-15',
    category: '여행 / 브이로그',
  },
];

/** 개발자 로그인용 (로컬 mock — useUserStore) */
export const mockMemberProfile = {
  channelName: 'CRiT',
  channelURL: 'https://www.youtube.com/@CRiT',
  userEmail: 'creatorintrend@gmail.com',
  joinDate: '2026.03.01',
  category: null,
};
