/** POST /login_test 응답 mock */
export const mockTestLoginResponse = {
  memberToken: 'mock-member-token-for-test',
  channelName: 'CRiT 공식채널',
  channelUrl: 'https://www.youtube.com/channel/UC_DEMO_CRIT_2026',
  userEmail: 'demo@crit.kr',
  joinDate: '2026-01-15',
};

/** 개발자 로그인용 (useUserStore — channelURL) */
export const mockMemberProfile = {
  channelName: mockTestLoginResponse.channelName,
  channelURL: mockTestLoginResponse.channelUrl,
  userEmail: mockTestLoginResponse.userEmail,
  joinDate: mockTestLoginResponse.joinDate,
};
