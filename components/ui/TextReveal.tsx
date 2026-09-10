"use client";

import { useEffect, useRef, useState } from "react";

export function TextReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        style={{
          transform: shown ? "translateY(0)" : "translateY(110%)",
          opacity: shown ? 1 : 0,
          transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.9s ${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}