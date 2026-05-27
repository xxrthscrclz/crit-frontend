import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CritLogo from '@/assets/icons/critLogo.svg?react';
import GoogleIcon from '@/assets/icons/google-icon.svg?react';
import { SERVER_URL } from '@/api/axios';
import { postGuestLogin, postTestLogin, type MemberLoginResponse } from '@/api/command';
import TestAccountSelectModal from '@/pages/testAccountSelectModal';
import useUserStore from '@/stores/useUserStore';
import { hasAuth, setGuestAuth, setMemberAuth } from '@/utils/auth';
import { mockMemberProfile } from '@/mocks/data/userMock';

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(s => s.setUser);
  const clearUser = useUserStore(s => s.clearUser);
  const setTestAccounts = useUserStore(s => s.setTestAccounts);
  const clearTestAccounts = useUserStore(s => s.clearTestAccounts);
  const [showTestAccountModal, setShowTestAccountModal] = useState(false);

  const applyTestAccountLogin = useCallback(
    (account: MemberLoginResponse) => {
      setMemberAuth(account.memberToken);
      setUser({
        channelName: account.channelName,
        channelURL: account.channelUrl,
        userEmail: account.userEmail,
        joinDate: account.joinDate,
        category: account.category,
      });
      clearTestAccounts();
      setShowTestAccountModal(false);
      navigate('/', { replace: true });
    },
    [clearTestAccounts, navigate, setUser],
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
        category: null,
      });
      navigate('/', { replace: true });
      return;
    }

    if (hasAuth()) {
      navigate('/', { replace: true });
    }
  }, [navigate, setUser]);

  const handleGoogleLogin = () => {
    window.location.href = `${SERVER_URL}/oauth2/authorization/google`;
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
      const accounts = await postTestLogin();
      setTestAccounts(accounts);
      setShowTestAccountModal(true);
    } catch (err) {
      console.error('테스트 로그인 실패:', err);
    }
  };

  const handleMockLogin = () => {
    setMemberAuth('mock-jwt-token-for-development');
    setUser(mockMemberProfile);
    navigate('/', { replace: true });
  };

  const handleCloseTestAccountModal = () => {
    setShowTestAccountModal(false);
    clearTestAccounts();
  };

  return (
    <div className="flex min-h-screen items-center justify-center max-md:px-4 max-md:py-8">
      <div className="flex flex-col items-center gap-8 max-md:w-full max-md:max-w-[612px] max-md:gap-6">
        <CritLogo className="h-[165px] w-[330px] max-md:h-auto max-md:w-full max-md:max-w-[280px]" />

        <div className="flex w-[612px] flex-col items-start gap-8 max-md:w-full max-md:gap-6">
          <div className="flex flex-col items-start gap-3 self-stretch">
            <div className="text-secondary typo-login-title">Sign in</div>
            <div className="text-subtle typo-login-body">구글 계정으로 로그인하세요.</div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[54px] px-2 py-4 justify-center items-center self-stretch rounded-[10px] border border-neutral bg-accent-muted cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-secondary typo-login-body">Sign in with Google</span>
              <GoogleIcon className="w-6 h-6" />
            </div>
          </button>

          <div className="flex w-full gap-3 self-stretch max-md:flex-col">
            <button
              type="button"
              onClick={handleGuestBrowse}
              className="flex flex-1 h-[54px] px-2 py-4 justify-center items-center rounded-[10px] text-subtle typo-login-guest border-2 border-neutral bg-white cursor-pointer hover:border-accent-muted hover:text-brand"
            >
              <span>비회원으로 둘러보기</span>
            </button>

            <button
              type="button"
              onClick={handleTestLogin}
              className="flex flex-1 h-[54px] px-2 py-4 justify-center items-center rounded-[10px] text-brand typo-login-guest border-2 border-accent-muted bg-white cursor-pointer hover:border-brand hover:text-brand-secondary"
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

      {showTestAccountModal && (
        <TestAccountSelectModal
          onClose={handleCloseTestAccountModal}
          onLogin={applyTestAccountLogin}
        />
      )}
    </div>
  );
};

export default LoginPage;
