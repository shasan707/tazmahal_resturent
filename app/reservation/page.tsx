'use client';

import React from 'react';
import Image from 'next/image';
import { useLang } from '../../components/LanguageProvider';
import { Reveal } from '../../components/Reveal';
import { IMAGES } from '../../lib/images';

export default function ReservationPage() {
  const { t } = useLang();

  return (
    <section className="py-28 md:py-32 bg-charcoal relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-jali opacity-20 z-0" />
      <div className="absolute top-0 left-0 w-[36rem] h-[36rem] ember rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-stretch">
        {/* Ambiance image */}
        <Reveal className="hidden lg:block">
          <div className="relative h-full min-h-[28rem] rounded-[2.5rem] overflow-hidden border border-saffron/20">
            <Image src={IMAGES.reservationAmbiance} alt="" fill sizes="50vw" quality={60} className="object-cover brightness-[0.55]" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <div className="absolute bottom-0 p-10">
              <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{t.booking}</span>
              <h2 className="text-3xl font-heading font-medium text-cream mt-2">{t.bookTitle}</h2>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <div className="bg-cocoa-light/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-saffron/20 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/20 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{t.booking}</span>
              <h1 className="text-3xl md:text-4xl font-heading font-medium text-cream mt-2 mb-2">{t.bookTitle}</h1>
              <p className="text-cream/55 mb-8">{t.reservationIntro} {t.bookDesc}</p>

              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-cream/80 mb-1.5">{t.date}</label>
                    <input title="Date" type="date" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner [color-scheme:dark]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cream/80 mb-1.5">{t.time}</label>
                    <input title="Time" type="time" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner [color-scheme:dark]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cream/80 mb-1.5">{t.guests}</label>
                  <select title="Guests" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner [&>option]:bg-cocoa">
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cream/80 mb-1.5">{t.name}</label>
                  <input title="Name" type="text" placeholder="Jan Kowalski" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner placeholder:text-cream/25" />
                </div>
                <button type="button" className="w-full bg-gradient-to-r from-saffron to-paprika hover:from-saffron-soft hover:to-paprika text-charcoal shadow-lg shadow-saffron/25 font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] mt-4">
                  {t.confirm}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
