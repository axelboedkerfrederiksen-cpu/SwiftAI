"use client";

import { useEffect, useRef } from "react";

type Direction = "up" | "left" | "right" | "scale";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

const directionClass: Record<Direction, string> = {
  up: "fade-in",
  left: "fade-in-left",
  right: "fade-in-right",
  scale: "fade-in-scale",
};

export default function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${directionClass[direction]} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
