"use client";

import { useEffect, useState } from "react";

interface UseCountdownProps {
  seconds?: number;
  onComplete?: () => void;
}

export function useCountdown({
  seconds = 3,
  onComplete,
}: UseCountdownProps) {
  const [count, setCount] = useState<number | null>(null);

  const startCountdown = () => {
    setCount(seconds);
  };

  useEffect(() => {
    if (count === null) return;

    if (count === 0) {
      onComplete?.();
      setCount(null);
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return {
    count,
    isCountingDown: count !== null,
    startCountdown,
  };
}