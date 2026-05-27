interface SubjectItemProps {
  subject?: string;
  subjectContent?: string;
  selected?: boolean;
  onClick?: () => void;
}

const SubjectItem = ({ subject, subjectContent, selected, onClick }: SubjectItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-234 cursor-pointer flex-col items-start gap-3 rounded-xl border px-8 py-6 transition-all duration-200 max-md:w-full max-md:gap-2 max-md:px-4 max-md:py-4
        ${
          selected
            ? 'border-[#6B4EFF] bg-[#F3F0FF] shadow-md'
            : 'border-[#A594F9] bg-white hover:bg-[#FAFAFE]'
        }`}
    >
      {subject ? (
        <div className="typo-title-bold text-[#0A0A0A]">{subject}</div>
      ) : (
        <div className="typo-title-bold text-gray-400 animate-loading-pulse">
          주제를 분석하고 있습니다...
        </div>
      )}
      {subjectContent && (
        <div className="typo-body2 text-[#717171] whitespace-pre-line">{subjectContent}</div>
      )}
    </div>
  );
};

export default SubjectItem;
