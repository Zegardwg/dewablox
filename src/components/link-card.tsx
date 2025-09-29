"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Globe, Instagram, MessageCircle, ShoppingCart, type LucideIcon } from "lucide-react"

export type LinkItem = {
  label: string
  href: string
  icon: "Globe" | "Instagram" | "MessageCircle" | "ShoppingCart"
  description?: string
}

const iconMap: Record<LinkItem["icon"], LucideIcon> = {
  Globe,
  Instagram,
  MessageCircle,
  ShoppingCart,
}

export function LinkCard({ item }: { item: LinkItem }) {
  const Icon = iconMap[item.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      <Card className="group relative overflow-hidden rounded-xl border border-border/80 glass-strong transition-shadow">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
          className="transition-shadow group-hover:gold-glow tilt-3d"
        >
          <Link
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-3 rounded-xl p-4 outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={`${item.label} (buka di tab baru)`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-border group-hover:bg-primary/20">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>

            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">{item.label}</span>
              {item.description ? (
                <span className="truncate text-xs text-muted-foreground">{item.description}</span>
              ) : null}
            </span>

            <span className="sr-only">Membuka di tab baru</span>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, color-mix(in oklab, var(--brand-gold) 55%, transparent), transparent 30% 70%, color-mix(in oklab, var(--brand-gold) 55%, transparent))",
                mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                padding: 1,
                backgroundClip: "content-box, border-box",
              }}
            />
          </Link>
        </motion.div>
      </Card>
    </motion.div>
  )
}
