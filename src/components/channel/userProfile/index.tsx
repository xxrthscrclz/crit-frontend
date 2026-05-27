import useChannelStore from '@/stores/useChannelStore';
import CritLogo from '@/assets/icons/critLogo.svg?react';

interface UserProfileProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const UserProfile = ({ onRefresh, isRefreshing }: UserProfileProps) => {
  const data = useChannelStore(s => s.data);
  const channel = data?.channel;

  return (
    <div className="flex w-full h-39 justify-between items-center gap-8 px-6 py-4 rounded-xl border border-brand-secondary max-md:h-auto max-md:min-h-39 max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-4">
      <div className="flex items-center gap-8 max-md:min-w-0 max-md:gap-4">
        <div className="w-30 h-30 rounded-full bg-avatar-ring overflow-hidden shrink-0 max-md:h-20 max-md:w-20">
          {(channel?.profileImageUrl && (
            <img
              src={channel.profileImageUrl}
              alt={channel.name}
              className="w-full h-full object-cover"
            />
          )) || <CritLogo className="w-30 h-30 object-cover max-md:h-20 max-md:w-20" />}
        </div>
        <div className="flex flex-col justify-start gap-3">
          <div className="w-full typo-title2 text-black">{channel?.name ?? 'channel ID'}</div>
          <div className="flex flex-col w-full justify-start gap-2">
            <div className="typo-body1-medium text-black">{channel?.handle ?? 'youtube_name'}</div>
            <div className="typo-body1-medium text-black">
              구독자 {channel?.subscriberCount ? channel.subscriberCount.toLocaleString() : 'n'}명
            </div>
          </div>
        </div>
      </div>
      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-strong text-white typo-body5 cursor-pointer hover:bg-brand-deep disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M21 12a9 9 0 11-2.2-5.9M21 3v5h-5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isRefreshing ? '갱신 중...' : '갱신 하기'}
        </button>
      )}
    </div>
  );
};

export default UserProfile;
