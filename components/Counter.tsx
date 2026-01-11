import React, { useState, useEffect } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  isVisible: boolean;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const endValue = end;
    const incrementTime = (duration / endValue);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endValue) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return <span>{count.toLocaleString('pt-BR')}</span>;
};

export default Counter;
