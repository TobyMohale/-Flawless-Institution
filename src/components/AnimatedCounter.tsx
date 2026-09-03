import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number; // duration in ms
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
  direction?: 'up' | 'down';
  useGrouping?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
  direction,
  useGrouping = true
}) => {
  // Determine start value based on direction or from prop
  const startingValue = from !== undefined 
    ? from 
    : (direction === 'down' ? to + Math.max(20, Math.round(to * 0.3)) : 0);

  const [displayValue, setDisplayValue] = useState<number>(startingValue);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
        }
      },
      { threshold: 0.15 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, startingValue, to, duration]);

  const animateCount = () => {
    setHasAnimated(true);
    const start = startingValue;
    const end = to;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo formula for ultra-smooth deceleration
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const current = start + (end - start) * easeOut;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const formattedNumber = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.round(displayValue).toLocaleString(undefined, { useGrouping });

  return (
    <span
      ref={countRef}
      className={`inline-flex items-baseline tabular-nums cursor-pointer select-none transition-transform active:scale-95 ${className}`}
      onClick={() => {
        // Allow re-triggering animation on click for tactile delight
        setHasAnimated(false);
        setTimeout(() => animateCount(), 50);
      }}
      title="Click to replay count animation"
    >
      {prefix && <span>{prefix}</span>}
      <span>{formattedNumber}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
};
