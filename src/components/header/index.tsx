import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutIcon from '@/assets/icons/logout-icon.svg?react';
import PersonIcon from '@/assets/icons/person-icon.svg?react';
import CritLogo from '@/assets/icons/critLogo.svg?react';
import useUserStore from '@/stores/useUserStore';
import UserInfoModal from '@/pages/userInfoModal';
import ConfirmModal from '@/components/confirmModal';
import ThemeToggle from '@/components/header/ThemeToggle';
import { clearAuth, isMember } from '@/utils/auth';

const navItems = [
  { label: '영상추천', path: '/recommend' },
  { label: '채널분석', path: '/analysis', requiresLogin: true },
  { label: '트렌드', path: '/trend' },
] as const;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const channelName = useUserStore(s => s.channelName);
  const clearUser = useUserStore(s => s.clearUser);
  const isLoggedIn = isMember();
  const [showModal, setShowModal] = useState(false);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGoToLogin = () => {
    setMenuOpen(false);
    clearAuth();
    clearUser();
    navigate('/login');
  };

  const handleAnalysisClick = () => {
    if (!isLoggedIn) {
      setShowLoginRequiredModal(true);
      return;
    }
    navigate('/analysis');
  };

  const handleNavClick = (path: string, requiresLogin?: boolean) => {
    setMenuOpen(false);
    if (requiresLogin) {
      handleAnalysisClick();
      return;
    }
    navigate(path);
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="sticky top-0 z-50 w-full border-b border-default bg-white/70 backdrop-blur-md">
      <div className="relative flex h-20 items-center justify-between gap-3 px-5 max-md:h-16 max-md:px-4">
        <CritLogo
          className="w-38 h-11 shrink-0 cursor-pointer max-md:h-8 max-md:w-24"
          onClick={() => {
            setMenuOpen(false);
            navigate('/');
          }}
        />

        <div className="flex items-center gap-5 self-stretch max-md:hidden">
          {navItems.map(item => (
            <div
              key={item.path}
              className="flex h-9 w-24 cursor-pointer flex-col justify-center text-center typo-body2"
              onClick={() =>
                handleNavClick(item.path, 'requiresLogin' in item && item.requiresLogin)
              }
            >
              <div className={isActive(item.path) ? 'text-brand' : 'text-black'}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className="flex h-9 min-w-0 items-center justify-center whitespace-nowrap max-md:hidden">
          {isLoggedIn ? (
            <>
              <div className="truncate text-brand typo-body2">{channelName}</div>
              <div className="text-black typo-body2">&nbsp;님 어서오세요!</div>
            </>
          ) : (
            <div
              className="cursor-pointer text-brand typo-body2 hover:underline"
              onClick={handleGoToLogin}
            >
              로그인 하러 가기
            </div>
          )}
        </div>

        <div className="flex h-11 shrink-0 items-center justify-end gap-5 max-md:gap-3">
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-black max-md:flex"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
          <LogoutIcon
            className="crit-icon-muted h-6 w-6 cursor-pointer hover:text-brand"
            onClick={handleGoToLogin}
          />
          <PersonIcon
            className="crit-icon-muted h-6 w-6 cursor-pointer hover:text-brand"
            onClick={() => setShowModal(true)}
          />
          <ThemeToggle />
        </div>
      </div>

      {menuOpen && (
        <div className="hidden border-t border-default bg-white px-4 py-4 max-md:block">
          <div className="mb-4">
            {isLoggedIn ? (
              <div className="text-black typo-body2">
                <span className="text-brand">{channelName}</span>님 어서오세요!
              </div>
            ) : (
              <button type="button" className="text-brand typo-body2" onClick={handleGoToLogin}>
                로그인 하러 가기
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.path}
                type="button"
                className={`rounded-lg px-4 py-3 text-left typo-body2 ${
                  isActive(item.path) ? 'bg-accent-soft text-brand' : 'text-black'
                }`}
                onClick={() =>
                  handleNavClick(item.path, 'requiresLogin' in item && item.requiresLogin)
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showModal && <UserInfoModal onClose={() => setShowModal(false)} />}
      {showLoginRequiredModal && (
        <ConfirmModal
          message="채널분석은 로그인 후 이용 가능합니다."
          onConfirm={() => setShowLoginRequiredModal(false)}
          secondaryLabel="로그인 하러 가기"
          onSecondary={() => {
            setShowLoginRequiredModal(false);
            handleGoToLogin();
          }}
        />
      )}
    </div>
  );
};

export default Header;
