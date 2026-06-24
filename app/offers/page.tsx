'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UtensilsCrossed, Flame, ArrowRight } from 'lucide-react';
import { useLang } from '../../components/LanguageProvider';
import { Reveal } from '../../components/Reveal';
import { IMAGES } from '../../lib/images';

export default function OffersPage() {
  const { t } = useLang();

  const offers = [
    { icon: <span className="font-bold text-charcoal text-xl">%</span>, title: t.discountTitle, desc: t.discountDesc },
    { icon: <Flame className="w-6 h-6 text-charcoal" />, title: t.lunchTitle, desc: t.lunchDesc },
  ];

  return (
    <section className="py-28 md:py-32 bg-charcoal relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image src={IMAGES.offersBanner} alt="" fill sizes="100vw" quality={55} className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/85 to-charcoal" />
      </div>
      <div className="absolute inset-0 bg-jali opacity-20 z-0" />
      <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] ember rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{t.offersEyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-medium text-cream mt-3 mb-4">{t.specialOffers}</h1>
          <p className="text-cream/60 max-w-xl mx-auto">{t.offersIntro}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {offers.map((o, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="h-full bg-cocoa-light/60 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] border border-saffron/15 hover:border-saffron/35 transition-colors flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-saffron to-paprika rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-saffron/20">{o.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-saffron mb-2 font-heading">{o.title}</h2>
                  <p className="text-cream/70 leading-relaxed">{o.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <Link href="/reservation" className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron to-paprika hover:from-saffron-soft text-charcoal px-8 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-saffron/25">
            <UtensilsCrossed className="w-5 h-5" /> {t.order} <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
