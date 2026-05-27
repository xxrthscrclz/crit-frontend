import type { ReactNode } from 'react';

interface FormContainerProps {
  title: string;
  titleAddon?: ReactNode;
  titleRight?: ReactNode;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children?: ReactNode;
}

const FormContainer = ({
  title,
  titleAddon,
  titleRight,
  placeholder,
  value,
  onChange,
  disabled = false,
  children,
}: FormContainerProps) => {
  const hasTitleActions = titleAddon || titleRight;

  return (
    <div className="flex h-21 w-full flex-col items-start gap-2 max-md:h-auto">
      {hasTitleActions ? (
        <div className="flex h-7 w-full items-center justify-between self-stretch max-md:h-auto max-md:flex-wrap max-md:gap-2">
          <div className="flex items-center gap-2 max-md:min-w-0 max-md:gap-1.5">
            <div className="typo-body1-medium text-[#0A0A0A] whitespace-nowrap max-md:whitespace-normal">
              {title}
            </div>
            {titleAddon}
          </div>
          {titleRight}
        </div>
      ) : (
        <div className="flex h-7 shrink-0 items-center gap-2 self-stretch max-md:h-auto">
          <div className="typo-body1-medium text-[#0A0A0A]">{title}</div>
        </div>
      )}
      {children ?? (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
          className={`flex h-12 shrink-0 items-center self-stretch rounded-lg border border-transparent bg-[#FEF8FF] px-3 py-1 typo-body2 text-[#0A0A0A] outline-none placeholder:typo-body2 placeholder:text-[#0a0a0a89] max-md:h-10 max-md:w-full ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
        />
      )}
    </div>
  );
};

export default FormContainer;
