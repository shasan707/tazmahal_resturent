'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useLang } from '../../components/LanguageProvider';
import { Reveal } from '../../components/Reveal';
import { SOCIALS } from '../../components/Brand';
import { IMAGES } from '../../lib/images';
import { SITE } from '../../lib/site';

export default function ContactPage() {
  const { t } = useLang();

  return (
    <>
      {/* Header with ambiance */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={IMAGES.contactAmbiance} alt="" fill sizes="100vw" quality={55} className="object-cover brightness-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/70 to-charcoal" />
          <div className="absolute inset-0 bg-jali opacity-30 mix-blend-soft-light" />
        </div>
        <Reveal className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{t.contact}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-medium text-cream mt-3 mb-4">{t.contactTitle}</h1>
          <p className="text-cream/70 text-lg">{t.contactIntro}</p>
        </Reveal>
      </section>

      {/* Contact cards */}
      <section className="bg-charcoal pb-28 px-6 relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Reveal>
            <a href={SITE.phoneTel} className="block h-full bg-cocoa-light/60 backdrop-blur-md p-8 rounded-3xl border border-saffron/15 hover:border-saffron/35 transition-colors text-center group">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-saffron to-paprika rounded-2xl flex items-center justify-center shadow-lg shadow-saffron/20 mb-5"><Phone className="w-6 h-6 text-charcoal" /></div>
              <h2 className="text-lg font-semibold text-cream mb-2">{t.callUs}</h2>
              <p className="text-saffron group-hover:text-saffron-soft transition-colors font-medium">{SITE.phoneDisplay}</p>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full bg-cocoa-light/60 backdrop-blur-md p-8 rounded-3xl border border-saffron/15 text-center">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-saffron to-paprika rounded-2xl flex items-center justify-center shadow-lg shadow-saffron/20 mb-5"><MapPin className="w-6 h-6 text-charcoal" /></div>
              <h2 className="text-lg font-semibold text-cream mb-2">{t.findUs}</h2>
              {SITE.address.map(line => <p key={line} className="text-cream/65 text-sm">{line}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="h-full bg-cocoa-light/60 backdrop-blur-md p-8 rounded-3xl border border-saffron/15 text-center">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-saffron to-paprika rounded-2xl flex items-center justify-center shadow-lg shadow-saffron/20 mb-5"><Clock className="w-6 h-6 text-charcoal" /></div>
              <h2 className="text-lg font-semibold text-cream mb-2">{t.hours}</h2>
              {SITE.hours.map(({ d, h }) => (
                <p key={d} className="text-cream/65 text-sm flex justify-between gap-3"><span>{d}</span><span className="text-cream">{h}</span></p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="max-w-5xl mx-auto mt-8">
          <div className="rounded-3xl overflow-hidden border border-saffron/15 h-72">
            <iframe
              title="Map"
              className="w-full h-full grayscale-[0.3] contrast-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=ul.+Pi%C4%99kna+24,+Warszawa&output=embed"
            />
          </div>
        </Reveal>

        {/* Socials + CTA */}
        <Reveal className="max-w-5xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                 className="w-11 h-11 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-cream/80 hover:text-charcoal hover:bg-saffron hover:border-saffron transition-all hover:scale-105">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <Link href="/reservation" className="inline-flex items-center gap-2 bg-saffron hover:bg-saffron-soft text-charcoal px-7 py-3.5 rounded-full font-semibold transition-all hover:scale-105">
            {t.bookTable} <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
