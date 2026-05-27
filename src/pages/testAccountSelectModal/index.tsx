import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/assets/icons/user-info-icons/close-icon.svg?react';
import useUserStore from '@/stores/useUserStore';
import type { MemberLoginResponse } from '@/api/command';

interface TestAccountSelectModalProps {
  onClose: () => void;
  onLogin: (account: MemberLoginResponse) => void;
}

const TestAccountSelectModal = ({ onClose, onLogin }: TestAccountSelectModalProps) => {
  const testAccounts = useUserStore(s => s.testAccounts);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLogin = () => {
    const account = testAccounts[selectedIndex];
    if (!account) return;
    onLogin(account);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="flex flex-col w-200 px-8 py-8 gap-6 bg-white rounded-xl border-2 border-[#8257B4] shadow-[0_4px_20px_rgba(130,87,180,0.2)] animate-modal-in max-md:mx-4 max-md:w-full max-md:max-w-200 max-md:px-5 max-md:py-6 max-md:gap-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex w-full justify-between items-center">
          <div className="text-black typo-title2">테스트 계정 선택</div>
          <CloseIcon className="w-6 h-6 cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex w-full gap-3 max-md:flex-col">
          {testAccounts.map((account, index) => {
            const isSelected = selectedIndex === index;

            return (
              <button
                key={`${account.channelUrl}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`flex flex-1 flex-col items-center justify-center gap-2 min-h-28 px-4 py-4 rounded-xl border-2 text-center cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-[#7C5CFF] bg-[#F5EFFF]'
                    : 'border-[#E6E8E7] bg-white hover:border-[#CDC1FF]'
                }`}
              >
                <div className="text-black typo-body1-medium">{account.channelName}</div>
                <div className="text-[#717171] typo-body2">{account.category}</div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={testAccounts.length === 0}
          className="flex py-2.5 px-5 mx-auto justify-center items-center rounded-lg bg-[#7C5CFF] active:bg-[#6344DD] typo-body1-medium text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default TestAccountSelectModal;
