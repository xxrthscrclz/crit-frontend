import UserIcon from '@/assets/icons/user-info-icons/person-icon.svg?react';
import MailIcon from '@/assets/icons/user-info-icons/mail-icon.svg?react';
import CalendarIcon from '@/assets/icons/user-info-icons/calendar-icon.svg?react';

type ItemType = 'name' | 'email' | 'date' | 'accountType';

interface UserInfoModalItemProps {
  type: ItemType;
  value: string;
}

const itemConfig = {
  name: { icon: UserIcon, label: '이름' },
  email: { icon: MailIcon, label: '이메일' },
  date: { icon: CalendarIcon, label: '가입일' },
  accountType: { icon: UserIcon, label: '계정 유형' },
};

const UserInfoModalItem = ({ type, value }: UserInfoModalItemProps) => {
  const { icon: Icon, label } = itemConfig[type];

  return (
    <div className="flex w-full px-7.5 py-4 justify-between items-center">
      <div className="flex justify-center items-center gap-7.5">
        <Icon className="crit-icon-muted w-6 h-6 shrink-0" />
        <div className="text-black typo-body1-medium">{label}</div>
      </div>
      {type === 'accountType' ? (
        <div className="px-3 py-0.5 justify-center items-center rounded-lg bg-accent-muted text-brand-text-alt typo-body4-semibold">
          {value}
        </div>
      ) : (
        <div className="text-black typo-body1-medium">{value}</div>
      )}
    </div>
  );
};

export default UserInfoModalItem;
