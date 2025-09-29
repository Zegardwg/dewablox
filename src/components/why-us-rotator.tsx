"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, ShieldCheck, Zap, BadgeCheck } from "lucide-react"

type Item = { title: string; desc: string; icon: React.ComponentType<{ className?: string }> }

const ITEMS: Item[] = [
  { title: "Aman & Terpercaya", desc: "Transaksi tepercaya, garansi hingga selesai.", icon: ShieldCheck },
  { title: "Proses Kilat", desc: "Eksekusi cepat—main lagi tanpa menunggu.", icon: Zap },
  { title: "Harga Kompetitif", desc: "Nilai terbaik—hemat tanpa kompromi.", icon: BadgeCheck },
  { title: "Nuansa Gaming", desc: "Pengalaman interaktif yang smooth.", icon: Gamepad2 },
]

export function WhyUsRotator() {
  const reduce = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    [],
  )
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % ITEMS.length), 3800)
    return () => clearInterval(t)
  }, [reduce, paused])

  // 3D tilt
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rotX = (0.5 - py) * 10
      const rotY = (px - 0.5) * 12
      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
    })
  }
  function onLeave() {
    const el = cardRef.current
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % ITEMS.length)
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + ITEMS.length) % ITEMS.length)
  }

  const item = ITEMS[index]
  const Icon = item.icon

  return (
    <section aria-label="Mengapa memilih Dewablox" className="w-full max-w-md mx-auto">
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setPaused(true)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: 18, rotateX: -6 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-[var(--radius)] p-4 sm:p-5 glass-strong hover-gold-glow focus-gold relative"
        role="region"
        tabIndex={0}
      >
        <div className="absolute inset-0 rounded-[var(--radius)] card-gaming opacity-25 pointer-events-none" />
        <div className="relative grid grid-cols-[auto,1fr] gap-3 items-center">
          <div className="h-12 w-12 rounded-xl grid place-content-center border border-[rgba(var(--ring-gold),0.35)] bg-[rgba(0,0,0,0.25)] shadow-inner">
            <AnimatePresence mode="wait">
              <motion.span
                key={item.title}
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                className="text-[rgb(var(--ring-gold))] drop-shadow-[0_0_10px_rgba(255,224,70,.35)]"
                aria-hidden
              >
                <Icon className="h-7 w-7" />
              </motion.span>
            </AnimatePresence>
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={item.title + "-h"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="font-serif text-xl sm:text-2xl rainbow-text neon-text"
              >
                Mengapa memilih Dewablox?
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p
                key={item.title + "-p"}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="text-[rgb(var(--color-ivory))]/90 text-sm leading-relaxed"
              >
                <strong className="text-[rgb(var(--ring-gold))]">{item.title}</strong> — {item.desc}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
