import { useState } from 'react';

const steps = [0, 5, 10, 15, 20, 25, 30];

interface TimeSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  compact?: boolean;
}

const TimeSlider = ({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  compact = false,
}: TimeSliderProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);

  const value = controlledValue ?? internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    const snapped = steps.reduce((prev, curr) =>
      Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev,
    );
    setInternalValue(snapped);
    onChange?.(snapped);
  };

  const percent = (value / 30) * 100;

  return (
    <div className={`relative flex flex-col ${compact ? 'w-full' : 'w-full max-w-120'}`}>
      <div
        className={`absolute -top-8 px-3 py-1 rounded-md bg-brand-secondary/80 text-white text-xs font-semibold transition-all duration-200 whitespace-nowrap slider-value-tooltip ${dragging ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        style={{ '--slider-percent': percent } as React.CSSProperties}
      >
        {value}분
      </div>
      <input
        type="range"
        min={0}
        max={30}
        step={5}
        value={value}
        onChange={handleChange}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onTouchStart={() => setDragging(true)}
        onTouchEnd={() => setDragging(false)}
        className="crit-time-slider w-full h-2 cursor-pointer appearance-none rounded-full"
        style={{ '--slider-percent': percent } as React.CSSProperties}
      />
      <div className="flex w-full justify-between mt-2 px-1">
        {steps.map(s => (
          <span key={s} className="text-xs text-gray-500 w-5 text-center">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TimeSlider;
