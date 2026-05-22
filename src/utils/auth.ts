const MEMBER_TOKEN_KEY = 'memberToken';
const GUEST_TOKEN_KEY = 'guestToken';

/** Authorization 헤더에 넣을 토큰 (memberToken 우선) */
export const getAuthToken = () =>
  localStorage.getItem(MEMBER_TOKEN_KEY) ?? localStorage.getItem(GUEST_TOKEN_KEY);

export const getMemberToken = () => localStorage.getItem(MEMBER_TOKEN_KEY);

export const getGuestToken = () => localStorage.getItem(GUEST_TOKEN_KEY);

export const hasAuth = () => !!getAuthToken();

export const isMember = () => !!getMemberToken();

export const isGuest = () => !!getGuestToken();

export const setMemberAuth = (memberToken: string) => {
  localStorage.removeItem(GUEST_TOKEN_KEY);
  localStorage.setItem(MEMBER_TOKEN_KEY, memberToken);
};

export const setGuestAuth = (guestToken: string) => {
  localStorage.removeItem(MEMBER_TOKEN_KEY);
  localStorage.setItem(GUEST_TOKEN_KEY, guestToken);
};

export const clearAuth = () => {
  localStorage.removeItem(MEMBER_TOKEN_KEY);
  localStorage.removeItem(GUEST_TOKEN_KEY);
};
