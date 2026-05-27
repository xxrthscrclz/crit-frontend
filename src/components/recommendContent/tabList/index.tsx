import { useState } from 'react';

interface TabListProps {
  tabs: string[];
  defaultTab?: number;
  activeIndex?: number;
  onChange?: (index: number) => void;
}

const TabList = ({ tabs, defaultTab = 0, activeIndex, onChange }: TabListProps) => {
  const [internalIndex, setInternalIndex] = useState(defaultTab);
  const currentIndex = activeIndex ?? internalIndex;

  const handleClick = (index: number) => {
    if (activeIndex === undefined) {
      setInternalIndex(index);
    }
    onChange?.(index);
  };

  return (
    <div className="relative flex h-16 w-155 items-center justify-center overflow-hidden rounded-xl bg-[#6B4EFF] px-4 py-0.5 opacity-90 max-md:mx-auto max-md:origin-top max-md:scale-[0.88]">
      <div
        className={`absolute h-11 w-72 rounded-xl bg-white transition-transform duration-300 ease-in-out max-md:w-[45%] max-md:h-9 ${currentIndex === 0 ? 'tab-indicator-left' : 'tab-indicator-right'}`}
      />
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`relative z-10 flex h-15 w-73 cursor-pointer items-center justify-center rounded-xl transition-colors duration-300 ${
            currentIndex === index
              ? 'typo-title-bold text-[#6B4EFF]'
              : 'typo-body1-medium text-white'
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabList;
