'use client';

import React from 'react';
import Image from 'next/image';
import { Leaf, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLang } from '../../components/LanguageProvider';
import { Reveal } from '../../components/Reveal';
import { getMenuSections, getFeatured, isVeg } from '../../lib/menu';
import { IMAGES } from '../../lib/images';

export default function MenuPage() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const menuSections = getMenuSections(lang);
  const featured = getFeatured(lang);

  // Running index so each row gets a varied placeholder thumbnail.
  let thumbIdx = 0;
  const nextThumb = (override?: string) =>
    override || IMAGES.itemPool[thumbIdx++ % IMAGES.itemPool.length];

  return (
    <section id="menu" className="py-28 md:py-32 bg-cocoa relative overflow-hidden min-h-screen">
      {/* Dark food-image grid behind the menu (kept as-is) */}
      <div aria-hidden className="absolute inset-0 z-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 opacity-[0.32] pointer-events-none select-none">
        {IMAGES.menuBg.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
        ))}
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(120%_85%_at_50%_50%,rgba(32,22,15,0.93)_38%,rgba(32,22,15,0.5)_100%)]" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] ember rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{t.menuEyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-medium text-cream mt-3 mb-4">{t.menuTitle}</h1>
          <p className="text-cream/60 max-w-xl mx-auto">{t.menuIntro}</p>
        </Reveal>

        {/* Today's Special — Figma-style featured cards */}
        <Reveal className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-saffron text-sm font-medium tracking-[0.25em] uppercase">
            <span className="h-px w-8 bg-saffron/50" /> {lang === 'pl' ? 'Polecane dania' : "Today's Special"} <span className="h-px w-8 bg-saffron/50" />
          </span>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {featured.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.07}>
              <motion.div
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="h-full bg-cocoa-light/70 backdrop-blur-md rounded-3xl overflow-hidden border border-saffron/15 hover:border-saffron/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] group"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image src={f.img} alt={f.name} fill sizes="(max-width:1024px) 50vw, 25vw" quality={60} className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa-light/90 to-transparent" />
                  <span className="absolute top-3 right-3 bg-charcoal/70 backdrop-blur-sm text-saffron text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 border border-saffron/30">
                    <Star className="w-3 h-3 fill-saffron text-saffron" /> {f.rating}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-lg text-cream mb-1">{f.name}</h3>
                  <p className="text-sm text-cream/50 mb-4">{f.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-saffron text-saffron" />)}
                    </div>
                    <span className="font-bold text-charcoal bg-saffron px-3 py-1 rounded-full shadow-md text-sm">{f.price}</span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Full menu — Figma-style list rows with per-dish thumbnails */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {menuSections.map((section, idx) => (
            <Reveal key={idx} delay={(idx % 2) * 0.08}>
              <motion.div
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="h-full bg-cocoa-light/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-saffron/15 hover:border-saffron/35 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] transition-colors"
              >
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-saffron/15">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden relative shrink-0 border border-saffron/25 shadow-inner">
                    <Image src={section.img} alt={section.title} fill sizes="56px" quality={60} className="object-cover" />
                  </div>
                  <h2 className="text-2xl font-heading font-medium text-saffron">{section.title}</h2>
                </div>

                <div className="flex flex-col">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-saffron/10 last:border-0 group/item">
                      <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-saffron/20">
                        <Image src={nextThumb(item.img)} alt="" fill sizes="48px" quality={55} className="object-cover transition-transform duration-500 group-hover/item:scale-110" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-cream group-hover/item:text-saffron transition-colors flex items-center gap-2 flex-wrap leading-tight">
                          {item.name}
                          {isVeg(item.desc) && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-cardamom border border-cardamom/40 bg-cardamom/10 px-1.5 py-0.5 rounded-full">
                              <Leaf className="w-2.5 h-2.5" /> {t.vegTag}
                            </span>
                          )}
                        </h3>
                        {item.desc && <p className="text-sm text-cream/45 mt-0.5">{item.desc}</p>}
                      </div>
                      <span className="font-bold text-charcoal bg-saffron px-3 py-1 rounded-full shadow-md text-sm shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
