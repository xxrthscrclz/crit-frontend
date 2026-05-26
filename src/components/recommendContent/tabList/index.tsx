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
    <div className="relative flex w-155 h-16 px-4 py-0.5 justify-center items-center rounded-xl opacity-90 bg-[#6B4EFF]">
      <div
        className={`absolute w-72 h-11 rounded-xl bg-white transition-transform duration-300 ease-in-out ${currentIndex === 0 ? 'tab-indicator-left' : 'tab-indicator-right'}`}
      />
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`relative z-10 flex w-73 h-15 justify-center items-center rounded-xl cursor-pointer transition-colors duration-300
            ${currentIndex === index ? 'typo-title-bold text-[#6B4EFF]' : 'typo-body1-medium text-white'}`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabList;
