'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, MapPin, Phone, ChefHat } from 'lucide-react';
import { useLang } from './LanguageProvider';
import { SOCIALS } from './Brand';
import { SITE } from '../lib/site';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#0a0a0b] pt-24 pb-12 border-t border-white/10 text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-jali opacity-10" />
      {/* Giant brand watermark — fades out toward the top-right via a mask gradient */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 z-0 font-heading font-black tracking-tight text-white/[0.05] leading-none whitespace-nowrap text-[6rem] sm:text-[10rem] lg:text-[16rem] [mask-image:linear-gradient(to_top_right,white_35%,transparent_80%)] [-webkit-mask-image:linear-gradient(to_top_right,white_35%,transparent_80%)]"
      >
        JOTILABS
      </span>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16 relative z-10">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
            <div className="w-10 h-10 bg-gradient-to-br from-saffron to-paprika rounded-full flex items-center justify-center shadow-lg shadow-saffron/20">
              <ChefHat className="text-charcoal w-6 h-6" />
            </div>
            <span className="text-2xl font-heading font-semibold text-cream tracking-wide">Taj Mahal</span>
          </Link>
          <p className="max-w-md leading-relaxed text-sm">{t.footerAbout}</p>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-6 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-saffron" /> {t.location}
          </h4>
          <ul className="space-y-3 text-sm">
            {SITE.address.map(line => <li key={line}>{line}</li>)}
            <li className="pt-2">
              <a href={SITE.phoneTel} className="flex items-center hover:text-saffron transition-colors">
                <Phone className="w-3 h-3 mr-1.5" /> {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-semibold mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-saffron" /> {t.hours}
          </h4>
          <ul className="space-y-3 text-sm">
            {SITE.hours.map(({ d, h }) => (
              <li key={d} className="flex justify-between"><span>{d}</span> <span className="text-cream">{h}</span></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright + socials sit ABOVE the divider line */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm relative z-10 mb-8">
        <p className="text-gray-400 text-center md:text-left">
          {t.rights}{' '}
          <a
            href={SITE.brandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-saffron font-medium hover:text-saffron-soft no-underline transition-colors"
          >
            JotilLab
          </a>
        </p>
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 hover:text-charcoal hover:bg-saffron hover:border-saffron transition-all hover:scale-105"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Divider line, now beneath the copyright + socials */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="border-t border-white/10" />
      </div>
    </footer>
  );
}
