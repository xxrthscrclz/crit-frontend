import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CritLogo from '@/assets/icons/critLogo.svg?react';
import GoogleIcon from '@/assets/icons/google-icon.svg?react';
import { postGuestLogin, postTestLogin, type MemberLoginResponse } from '@/api/command';
import useUserStore from '@/stores/useUserStore';
import { hasAuth, setGuestAuth, setMemberAuth } from '@/utils/auth';
import { mockMemberProfile } from '@/mocks/data/userMock';

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(s => s.setUser);
  const clearUser = useUserStore(s => s.clearUser);

  const applyMemberLogin = useCallback(
    (data: MemberLoginResponse) => {
      setMemberAuth(data.memberToken);
      setUser({
        channelName: data.channelName ?? null,
        channelURL: data.channelUrl ?? null,
        userEmail: data.userEmail ?? null,
        joinDate: data.joinDate ?? null,
      });
      navigate('/', { replace: true });
    },
    [navigate, setUser],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      setMemberAuth(token);
      setUser({
        channelName: params.get('channelName'),
        channelURL: params.get('channelUrl'),
        userEmail: params.get('userEmail'),
        joinDate: params.get('joinDate'),
      });
      navigate('/', { replace: true });
      return;
    }

    if (hasAuth()) {
      navigate('/', { replace: true });
    }
  }, [navigate, setUser]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_AUTH_URL}/oauth2/authorization/google`;
  };

  const handleGuestBrowse = async () => {
    try {
      const { guestToken } = await postGuestLogin();
      clearUser();
      setGuestAuth(guestToken);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('guest 토큰 발급 실패:', err);
    }
  };

  const handleTestLogin = async () => {
    try {
      const res = await postTestLogin();
      applyMemberLogin(res);
    } catch (err) {
      console.error('테스트 로그인 실패:', err);
    }
  };

  const handleMockLogin = () => {
    setMemberAuth('mock-jwt-token-for-development');
    setUser(mockMemberProfile);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-8">
        <CritLogo className="w-[330px] h-[165px]" />

        <div className="flex w-[612px] flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="text-[#232323] typo-login-title">Sign in</div>
            <div className="text-[#969696] typo-login-body">구글 계정으로 로그인하세요.</div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[54px] px-2 py-4 justify-center items-center self-stretch rounded-[10px] border border-[#E6E8E7] bg-[#CDC1FF] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#232323] typo-login-body">Sign in with Google</span>
              <GoogleIcon className="w-6 h-6" />
            </div>
          </button>

          <div className="flex w-full gap-3 self-stretch">
            <button
              type="button"
              onClick={handleGuestBrowse}
              className="flex flex-1 h-[54px] px-2 py-4 justify-center items-center rounded-[10px] text-[#969696] typo-login-guest border-2 border-[#E6E8E7] bg-white cursor-pointer hover:border-[#CDC1FF] hover:text-[#6B4EFF]"
            >
              <span>비회원으로 둘러보기</span>
            </button>

            <button
              type="button"
              onClick={handleTestLogin}
              className="flex flex-1 h-[54px] px-2 py-4 justify-center items-center rounded-[10px] text-[#6B4EFF] typo-login-guest border-2 border-[#CDC1FF] bg-white cursor-pointer hover:border-[#6B4EFF] hover:text-[#CDC1FF]"
            >
              <span>테스트 계정으로 로그인</span>
            </button>
          </div>

          {import.meta.env.VITE_USE_MOCK === 'true' && (
            <button
              type="button"
              onClick={handleMockLogin}
              className="flex h-[54px] px-2 py-4 justify-center items-center self-stretch rounded-[10px] border border-dashed border-gray-400 bg-gray-100 cursor-pointer"
            >
              <span className="text-gray-600 typo-body-bold">🧪 개발자 로그인</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
