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

  return (
    <section id="menu" className="py-28 md:py-32 bg-cocoa relative overflow-hidden min-h-screen">
      {/* Dark food-image grid behind the menu (kept as-is) */}
      <div aria-hidden className="absolute inset-0 z-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 opacity-[0.32] pointer-events-none select-none">
        {IMAGES.menuBg.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
        ))}
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(120%_85%_at_50%_50%,rgba(32,22,15,0.94)_40%,rgba(32,22,15,0.55)_100%)]" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] ember rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{t.menuEyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-medium text-cream mt-3 mb-4">{t.menuTitle}</h1>
          <p className="text-cream/60 max-w-xl mx-auto">{t.menuIntro}</p>
        </Reveal>

        {/* Today's Special — featured cards */}
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

        {/* Categories as cinematic alternating banners (Figma "dining zone" style) */}
        <div className="flex flex-col gap-10">
          {menuSections.map((section, idx) => {
            const imageLeft = idx % 2 === 0;
            return (
              <Reveal key={idx}>
                <div className={'relative overflow-hidden rounded-[2rem] border border-saffron/15 shadow-[0_8px_40px_0_rgba(0,0,0,0.45)] flex flex-col ' + (imageLeft ? 'md:flex-row' : 'md:flex-row-reverse')}>
                  {/* Image side */}
                  <div className="relative w-full md:w-3/5 min-h-[18rem] md:min-h-[26rem]">
                    <Image src={section.banner} alt={section.title} fill sizes="(max-width:768px) 100vw, 60vw" quality={60} className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 to-transparent" />
                    <div className={'absolute inset-0 ' + (imageLeft ? 'md:bg-gradient-to-r' : 'md:bg-gradient-to-l') + ' md:from-transparent md:via-transparent md:to-cocoa'} />
                  </div>

                  {/* Text side */}
                  <div className="relative w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-cocoa-light/50 backdrop-blur-sm">
                    <span className="text-saffron/70 text-xs font-semibold tracking-[0.3em] uppercase mb-2">
                      {String(idx + 1).padStart(2, '0')} — {section.tagline}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-medium italic text-transparent bg-clip-text bg-gradient-to-r from-saffron-soft via-saffron to-paprika mb-6 leading-tight">
                      {section.title}
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-baseline gap-3 group/item">
                          <span className="font-semibold text-cream group-hover/item:text-saffron transition-colors whitespace-nowrap">
                            {item.name}
                            {isVeg(item.desc) && <Leaf className="inline w-3 h-3 ml-1 text-cardamom" />}
                          </span>
                          <span className="flex-1 border-b border-dotted border-saffron/20 translate-y-[-3px]" />
                          <span className="font-bold text-saffron whitespace-nowrap">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
