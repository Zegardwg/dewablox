"use client"

import {
  Instagram,
  ShoppingCart,
  ShieldCheck,
  Megaphone,
  Timer
} from "lucide-react"

const ICONS = {
  Instagram,
  ShoppingCart,
  ShieldCheck,
  Megaphone,
  Timer
} as const

export type LinkItem = {
  label: string
  href: string
  icon: keyof typeof ICONS
  description: string
  cta?: string
  badges?: Array<{
    label: string
    icon: keyof typeof ICONS
  }>
}

export function LinkCardPlus({ item }: { item: LinkItem }) {
  const Icon = ICONS[item.icon]
  
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-[var(--radius)] p-3 glass-strong hover-gold-glow focus-gold border border-[rgba(var(--ring-gold),0.35)]"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 place-content-center rounded-lg border border-[rgba(var(--ring-gold),0.35)] bg-[rgba(0,0,0,0.25)] shadow-inner">
          <Icon className="h-4 w-4 text-[rgb(var(--ring-gold))]" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[rgb(var(--color-ivory))]">{item.label}</p>
            {item.cta && (
              <span className="ml-auto rounded bg-[rgba(var(--ring-gold),0.15)] px-1.5 py-0.5 text-xs font-medium text-[rgb(var(--ring-gold))]">
                {item.cta}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-[rgb(var(--color-ivory))]/75">
            {item.description}
          </p>
          {item.badges && item.badges.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {item.badges.map((badge) => {
                const BadgeIcon = ICONS[badge.icon]
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1 rounded bg-[rgba(var(--ring-gold),0.15)] px-1.5 py-0.5 text-xs font-medium text-[rgb(var(--ring-gold))]"
                  >
                    <BadgeIcon className="h-3 w-3" aria-hidden="true" />
                    {badge.label}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </a>
  )
}
