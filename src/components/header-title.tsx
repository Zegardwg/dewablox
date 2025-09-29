"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function HeaderTitle() {
  return (
    <header className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="relative h-14 w-14 overflow-hidden rounded-lg ring-1 ring-border"
        aria-hidden="true"
      >
        {/* Logo placeholder, ganti ke /logo.svg bila tersedia */}
        <Image src="/placeholder-logo.svg" alt="Logo Dewablox.id" fill sizes="56px" className="object-contain p-2" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04, type: "spring", stiffness: 260, damping: 22 }}
        className="mt-3 text-pretty text-4xl md:text-5xl font-serif font-extrabold tracking-tight rainbow-text neon-text"
      >
        Dewablox.id
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, type: "spring", stiffness: 240, damping: 22 }}
        className="mt-1 text-sm leading-relaxed text-muted-foreground"
      >
        TOKO ROBLOX NO 1 INDONESIA
      </motion.p>
    </header>
  )
}
