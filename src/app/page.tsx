"use client"

import { HeaderTitle } from "@/components/header-title"
import { LinkCardPlus, type LinkItem } from "@/components/link-card-plus"
import { WhyUsRotator } from "@/components/why-us-rotator"
import { ParallaxParticles } from "@/components/parallax-particles"
import { TrustBar } from "@/components/trust-bar"
import { ActionDock } from "@/components/action-dock"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Page() {
  const links: LinkItem[] = [
    {
      label: "Galeri Komunitas",
      href: "https://instagram.com/dewablox.id",
      icon: "Instagram",
      description: "Showcase & Info Terbaru",
    },
    {
      label: "Pusat Jual Beli",
      href: "#", // TODO: ganti dengan link Grup Jual Beli Anda
      icon: "ShoppingCart",
      description: "Temukan Item & Akun Langka",
    },
    {
      label: "Transaksi Aman via WA",
      href: "https://wa.me/6281234567890", // langsung chat Admin
      icon: "ShieldCheck",
      description: "Admin & Midman Service (Tax 5%)",
    },
    {
      label: "Info Harga Miring",
      href: "#", // TODO: ganti dengan link Saluran WhatsApp Dewablox
      icon: "Megaphone",
      description: "Join Channel Promo Spesial!",
    },
  ]

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  }

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Background layer: gambar Anda + overlay gradasi hangat */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Blurred fill layer to cover entire screen smoothly */}
        <Image
          src="/images/bg-gaming.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 blur-sm"
        />
        {/* Safe layer: keep main image content fully visible on small screens */}
        <Image
          src="/images/bg-gaming.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain md:object-cover"
        />
        <div className="gaming-overlay mix-blend-multiply opacity-90" />
        <div className="soft-left-veil" />
      </div>

      {/* Particles layer for parallax */}
      <ParallaxParticles density={28} speed={0.6} parallaxStrength={0.002} />

      {/* Konten */}
      <section
        aria-label="Profil dan tautan Dewablox.id"
        className="mx-auto flex min-h-dvh w-full max-w-sm flex-col items-stretch justify-center gap-6 px-4 py-10"
      >
        <motion.div variants={container} initial="hidden" animate="show">
          <HeaderTitle />

          {/* WhyUsRotator near the top */}
          <div className="mt-4">
            <WhyUsRotator />
          </div>

          {/* TrustBar to boost perceived trust with smooth motion */}
          <div className="mt-5">
            <TrustBar />
          </div>

          <div className="mt-5 grid gap-3">
            {links.map((item) => (
              <LinkCardPlus
                key={item.label}
                item={{
                  ...item,
                  // Optional content—kept minimal to avoid clutter; you can remove or customize:
                  cta: "Buka",
                  badges: [
                    { label: "Terpercaya", icon: "ShieldCheck" },
                    { label: "Respons Cepat", icon: "Timer" },
                  ],
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Sticky action dock for quick conversions */}
      <ActionDock />
    </main>
  )
}
