'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UtensilsCrossed, CalendarDays, ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useLang } from '../components/LanguageProvider';
import { Reveal } from '../components/Reveal';
import { IMAGES } from '../lib/images';

export default function Home() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  const heroStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image src={IMAGES.hero} alt="" fill sizes="100vw" quality={60} className="object-cover brightness-[0.38]" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal" />
          <div className="absolute inset-0 ember animate-ember-drift" />
          <div className="absolute inset-0 bg-jali opacity-40 mix-blend-soft-light" />
        </div>

        <motion.div variants={heroStagger} initial="hidden" animate="show" className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-12">
          <motion.div variants={heroItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/15 border border-saffron/30 text-saffron-soft text-sm font-medium mb-7 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            {t.heroTag}
          </motion.div>
          <motion.h1 variants={heroItem} className="text-5xl md:text-7xl font-heading font-medium text-cream mb-6 leading-[1.05] tracking-tight">
            {t.heroTitle1} <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-saffron-soft via-saffron to-paprika">{t.heroTitle2}</span>
          </motion.h1>
          <motion.p variants={heroItem} className="text-lg md:text-xl text-cream/75 mb-10 max-w-2xl mx-auto leading-relaxed">{t.heroDesc}</motion.p>
          <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/menu" className="group w-full sm:w-auto bg-saffron hover:bg-saffron-soft text-charcoal px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-saffron/25">
              <UtensilsCrossed className="w-5 h-5 transition-transform group-hover:rotate-12" />
              {t.exploreMenu}
            </Link>
            <Link href="/reservation" className="w-full sm:w-auto bg-cream/5 hover:bg-cream/10 backdrop-blur border border-cream/20 text-cream px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105">
              <CalendarDays className="w-5 h-5" />
              {t.bookTable}
            </Link>
          </motion.div>
        </motion.div>

        {!reduce && (
          <motion.div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-saffron/60" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        )}
      </section>

      {/* Intro & AI mention */}
      <section className="bg-charcoal py-24 text-center px-6 relative">
        <div className="absolute inset-0 bg-jali opacity-30" />
        <Reveal className="max-w-4xl mx-auto relative z-10">
          <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{t.menuEyebrow}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-cream mt-3 mb-6">{t.weAreHere}</h2>
          <p className="text-cream/60 text-lg leading-relaxed">{t.weAreHereDesc}</p>
        </Reveal>
      </section>

      {/* Featured CTA band: menu + offers teasers */}
      <section className="bg-cocoa py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-jali opacity-25" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] ember rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 relative z-10">
          <Reveal>
            <Link href="/menu" className="group block h-full rounded-3xl overflow-hidden relative border border-saffron/15 hover:border-saffron/35 transition-colors min-h-[18rem]">
              <Image src={IMAGES.categories.indian} alt="" fill sizes="(max-width:768px) 100vw, 50vw" quality={60} className="object-cover brightness-[0.4] group-hover:brightness-50 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-heading font-medium text-cream mb-2">{t.menuTitle}</h3>
                <p className="text-cream/70 mb-4 max-w-sm">{t.menuDesc}</p>
                <span className="inline-flex items-center gap-2 text-saffron font-semibold">{t.exploreMenu} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/offers" className="group block h-full rounded-3xl overflow-hidden relative border border-saffron/15 hover:border-saffron/35 transition-colors min-h-[18rem]">
              <Image src={IMAGES.offersBanner} alt="" fill sizes="(max-width:768px) 100vw, 50vw" quality={60} className="object-cover brightness-[0.4] group-hover:brightness-50 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-3xl font-heading font-medium text-cream mb-2">{t.specialOffers}</h3>
                <p className="text-cream/70 mb-4 max-w-sm">{t.offersIntro}</p>
                <span className="inline-flex items-center gap-2 text-saffron font-semibold">{t.offers} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
