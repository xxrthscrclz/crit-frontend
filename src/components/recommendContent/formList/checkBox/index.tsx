import { useState } from 'react';
import CheckIcon from '@/assets/icons/check-icon.svg?react';

interface CheckBoxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckBox = ({ label, checked: controlledChecked, onChange }: CheckBoxProps) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked ?? internalChecked;

  const handleClick = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <div
      onClick={handleClick}
      className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-lg border border-black/10 px-3 max-md:h-10 max-md:gap-2 max-md:px-2.5"
    >
      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm shadow-sm max-md:h-4 max-md:w-4 ${
          isChecked ? 'border border-[#7C5CFF] bg-[#7C5CFF]' : 'border border-black/10 bg-[#FEF8FF]'
        }`}
      >
        {isChecked && <CheckIcon className="h-3 w-3 text-white max-md:h-2.5 max-md:w-2.5" />}
      </div>
      <div className="flex h-6 w-48 shrink-0 items-center gap-2 typo-body2 text-[#0A0A0A] tracking-wide max-md:min-w-0 max-md:flex-1 max-md:truncate">
        {label}
      </div>
    </div>
  );
};

export default CheckBox;
