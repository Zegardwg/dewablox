"use client"

import { motion } from "framer-motion"
import { MessageCircle, Megaphone } from "lucide-react"

export function ActionDock() {
  return (
    <div
      className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 sm:bottom-5"
      role="region"
      aria-label="Tindakan cepat"
    >
      <div className="glass-strong hover-gold-glow rounded-[calc(var(--radius)+4px)] border border-[rgba(var(--ring-gold),0.35)] backdrop-blur px-2 py-2 shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center gap-2">
          <motion.a
            href="https://wa.me/6285746142660"
            target="_blank"
            rel="noreferrer noopener"
            whileTap={{ scale: 0.97 }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-4 py-2 focus-gold border border-[rgba(var(--ring-gold),0.35)] bg-[rgba(0,0,0,0.25)] text-[rgb(var(--color-ivory))]"
            aria-label="Chat Admin via WhatsApp (buka di tab baru)"
          >
            <MessageCircle className="h-4 w-4 text-[rgb(var(--ring-gold))]" aria-hidden="true" />
            <span className="font-medium">Chat Admin</span>
          </motion.a>

          <motion.a
            href="https://chat.whatsapp.com/LfyQ6YyoI0n3GR4Bibvpu1?mode=ems_copy_t"
            target="_blank"
            rel="noreferrer noopener"
            whileTap={{ scale: 0.97 }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-4 py-2 focus-gold border border-[rgba(var(--ring-gold),0.35)] bg-[rgba(0,0,0,0.15)] text-[rgb(var(--color-ivory))]"
            aria-label="Lihat Promo & Update (buka di tab baru)"
          >
            <Megaphone className="h-4 w-4 text-[rgb(var(--ring-gold))]" aria-hidden="true" />
            <span className="font-medium">Grub Roblox</span>
          </motion.a>
        </div>
      </div>
    </div>
  )
}
