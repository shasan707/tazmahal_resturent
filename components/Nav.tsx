'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChefHat, Globe, Menu as MenuIcon, X } from 'lucide-react';
import { useLang } from './LanguageProvider';

export default function Nav() {
  const { lang, toggle, t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t.home },
    { href: '/menu', label: t.menu },
    { href: '/offers', label: t.offers },
    { href: '/reservation', label: t.booking },
    { href: '/contact', label: t.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-charcoal/80 backdrop-blur-md border-b border-saffron/15">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="w-10 h-10 bg-gradient-to-br from-saffron to-paprika rounded-full flex items-center justify-center shadow-lg shadow-saffron/20">
            <ChefHat className="text-charcoal w-6 h-6" />
          </div>
          <span className="text-2xl font-heading font-semibold text-cream tracking-wide">Taj Mahal</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={'transition-colors ' + (isActive(l.href) ? 'text-saffron' : 'text-cream/70 hover:text-saffron')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggle} className="flex items-center gap-1.5 text-xs text-cream/80 hover:text-cream border border-saffron/25 hover:border-saffron/50 bg-saffron/5 py-1.5 px-3 rounded-full transition-all">
            <Globe className="w-3.5 h-3.5" />
            {lang.toUpperCase()}
          </button>
          <Link href="/reservation" className="hidden sm:flex bg-saffron hover:bg-saffron-soft text-charcoal px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105">
            {t.order}
          </Link>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            className="md:hidden text-cream w-10 h-10 flex items-center justify-center"
          >
            {open ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-saffron/15 bg-charcoal/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={'py-2.5 text-base transition-colors ' + (isActive(l.href) ? 'text-saffron' : 'text-cream/80 hover:text-saffron')}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
