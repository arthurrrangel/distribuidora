"use client";
import { useEffect, useState } from "react";

/**
 * Rotaciona entre palavras com fade + slide.
 * Respeita prefers-reduced-motion (mostra só primeira).
 */
export function WordRotator({
  words,
  interval = 2500,
  className = "",
  style,
}: {
  words: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [idx, setIdx] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) return;
    const id = setInterval(() => {
      setIdx((p) => (p + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  if (reduce) {
    return <span className={className} style={style}>{words[0]}</span>;
  }

  return (
    <span
      className={`word-rotator ${className}`}
      style={{
        display: "inline-block",
        position: "relative",
        ...style,
      }}
    >
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden={i !== idx}
          style={{
            display: i === idx ? "inline-block" : "none",
            animation: i === idx ? "word-in 520ms cubic-bezier(0.22,1,0.36,1) both" : undefined,
          }}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
