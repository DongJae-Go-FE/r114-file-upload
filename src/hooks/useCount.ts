import { useEffect, useState } from "react";

export function useCount(
  goal: number,
  options?: {
    start?: number;
    speed?: number;
    step?: number;
    enable?: boolean;
  }
) {
  const [count, setCount] = useState(
    options?.enable ? options?.start || 0 : goal
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < goal) {
          return prev + (options?.step || 1) < goal
            ? prev + (options?.step || 1)
            : goal;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, options?.speed || 100);

    return () => {
      clearInterval(timer);
    };
  }, [goal, options?.enable, options?.speed, options?.start, options?.step]);

  const reset = () => setCount(options?.start || 0);

  return { count, reset };
}
