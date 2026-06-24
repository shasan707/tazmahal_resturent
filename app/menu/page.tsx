'use client';

import React from 'react';
import Image from 'next/image';
import { Leaf } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLang } from '../../components/LanguageProvider';
import { Reveal } from '../../components/Reveal';
import { getMenuSections, isVeg } from '../../lib/menu';
import { IMAGES } from '../../lib/images';

export default function MenuPage() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const menuSections = getMenuSections(lang);

  return (
    <section id="menu" className="py-28 md:py-32 bg-cocoa relative overflow-hidden min-h-screen">
      {/* Dark food-image grid behind the menu (visible on both sides, subtle behind text) */}
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

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {menuSections.map((section, idx) => (
            <Reveal key={idx} delay={(idx % 2) * 0.08}>
              <motion.div
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="h-full bg-cocoa-light/60 backdrop-blur-md rounded-3xl p-8 border border-saffron/15 hover:border-saffron/35 shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] relative overflow-hidden group/panel transition-colors"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-saffron/15">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative shrink-0 border border-saffron/25 shadow-inner">
                      <Image src={section.img} alt={section.title} fill sizes="64px" quality={60} className="object-cover transition-transform duration-700 group-hover/panel:scale-110" />
                    </div>
                    <h2 className="text-2xl font-heading font-medium text-saffron">{section.title}</h2>
                  </div>
                  <div className="flex flex-col gap-5">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center group/item gap-4">
                        <div className="pr-2 min-w-0">
                          <h3 className="font-semibold text-cream group-hover/item:text-saffron transition-colors flex items-center gap-2 flex-wrap">
                            {item.name}
                            {isVeg(item.desc) && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-cardamom border border-cardamom/40 bg-cardamom/10 px-1.5 py-0.5 rounded-full">
                                <Leaf className="w-2.5 h-2.5" /> {t.vegTag}
                              </span>
                            )}
                          </h3>
                          {item.desc && <p className="text-sm text-cream/45 mt-1">{item.desc}</p>}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-saffron/15 w-10 hidden sm:block border-b border-dotted" />
                          <span className="font-bold text-charcoal bg-saffron px-3 py-1 rounded-full shadow-md text-sm">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
