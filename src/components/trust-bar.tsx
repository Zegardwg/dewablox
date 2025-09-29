"use client";

import type React from "react";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ShieldCheck, BadgeCheck, Clock3, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Stat = {
  icon: React.ElementType;
  label: string;
  // When showPlus is true, we render a small "+" after the value
  value?: number;
  suffix?: string;
  showPlus?: boolean;
  // Static text if no animated value needed
  text?: string;
};

function CountUp({
  to = 100,
  duration = 1.6,
}: {
  to?: number;
  duration?: number;
}) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      mv.set(p * to);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const unsub = spring.on("change", (v) => setVal(Math.round(v)));
    return () => {
      cancelAnimationFrame(raf);
      unsub?.();
    };
  }, [to, duration, mv, spring]);
  return <>{val}</>;
}

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  const stats: Stat[] = [
    {
      icon: ShieldCheck,
      label: "Aman & Terpercaya",
      text: "Terdaftar Bin & 100% Garansi",
    },
    { icon: Clock3, label: "Respon Cepat", value: 5, suffix: " mnt" },
    {
      icon: BadgeCheck,
      label: "Transaksi Sukses",
      value: 10000,
      suffix: "+",
      showPlus: false,
    },
    { icon: Sparkles, label: "Rating Pengguna", value: 4.9, suffix: "/5" },
  ];

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-4 sm:gap-3 md:gap-4"
      aria-label="Bar kepercayaan pengguna">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 18,
              delay: idx * 0.06,
            }}
            className="rounded-[var(--radius)] p-2.5 sm:p-3 md:p-4 glass-strong hover-gold-glow focus-gold border border-[rgba(var(--ring-gold),0.35)]">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="grid h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 place-content-center rounded-lg border border-[rgba(var(--ring-gold),0.35)] bg-[rgba(0,0,0,0.25)] shadow-inner">
                <Icon
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[rgb(var(--ring-gold))]"
                  aria-hidden="true"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] sm:text-xs md:text-sm text-[rgb(var(--color-ivory))]/75">
                  {s.label}
                </p>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-[rgb(var(--color-ivory))]">
                  {s.text ? (
                    s.text
                  ) : inView ? (
                    <>
                      <CountUp
                        to={
                          typeof s.value === "number" ? Math.floor(s.value) : 0
                        }
                      />
                      {typeof s.value === "number" && s.value % 1 !== 0
                        ? s.value.toString().split(".")[1]
                        : null}
                      {s.suffix ? s.suffix : s.showPlus ? "+" : null}
                    </>
                  ) : (
                    "—"
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
