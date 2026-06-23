'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin, Phone, ChefHat, UtensilsCrossed, CalendarDays, Globe, Leaf, Flame, ArrowDown } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import VoiceWidget from '../components/VoiceWidget';
import ChatWidget from '../components/ChatWidget';
import { Reveal } from '../components/Reveal';

type Language = 'pl' | 'en';

/* Brand glyphs as inline SVG (currentColor) so they inherit footer contrast. */
const iconBase = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true } as const;

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...props}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
);

const MessengerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...props}><path d="M.001 11.639C.001 4.95 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 0 0-.64.05l-2.39 1.05a.96.96 0 0 1-1.35-.85l-.07-2.14a.97.97 0 0 0-.32-.68A11.39 11.39 0 0 1 .002 11.64Zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 0 0-2.61.48Z"/></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...iconBase} {...props}><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.895c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.218-.96-.479-1.379-.899-.421-.419-.69-.81-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03Zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.441 1.441 0 0 1-2.881 0 1.44 1.44 0 0 1 2.881 0Z"/></svg>
);

const SOCIALS = [
  { label: 'WhatsApp', href: 'https://jotillabs.com', Icon: WhatsAppIcon },
  { label: 'Messenger', href: 'https://jotillabs.com', Icon: MessengerIcon },
  { label: 'Instagram', href: 'https://jotillabs.com', Icon: InstagramIcon },
];

/* Subtle food imagery tiled behind the menu — replace these URLs anytime. */
const MENU_BG_IMAGES = [
  'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=500&q=50',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=50',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=50',
  'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=500&q=50',
  'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=500&q=50',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=50',
  'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=50',
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=50',
];

export default function Home() {
  const [lang, setLang] = useState<Language>('pl');
  const reduce = useReducedMotion();

  const toggleLanguage = () => setLang(l => l === 'pl' ? 'en' : 'pl');

  const t = {
    pl: {
      menu: 'Menu',
      offers: 'Oferty',
      booking: 'Rezerwacja',
      contact: 'Kontakt',
      order: 'Zamów Online',
      heroTag: 'Dostarczamy na terenie całej Warszawy',
      heroTitle1: 'Tętniące życiem smaki',
      heroTitle2: 'Wschodu',
      heroDesc: 'Prawdziwy Kebab, aromatyczne Biryani i autentyczna kuchnia indyjska tworzona z pasją. Odkryj sekrety naszych szefów kuchni.',
      exploreMenu: 'Odkryj Menu',
      bookTable: 'Zarezerwuj Stolik',
      weAreHere: 'Jesteśmy tu dla Ciebie',
      weAreHereDesc: 'Zamów świeży Kebab, wspaniałe Kacchi Biryani, Daal Makhni czy Chicken Tandoori z dostawą do domu lub odbiorem osobistym. Masz pytania? Nasz agent AI potrafi asystować w każdym kanale: na stronie, Whatsapp, Messenger, Instagramie i telefonicznie. Skorzystaj z opcji głosowej lub czatu w rogu ekranu!',
      menuEyebrow: 'Karta dań',
      menuTitle: 'Nasze Menu',
      menuDesc: 'Starannie przygotowane z autentycznych przypraw i najświeższych składników.',
      offersEyebrow: 'Warto skorzystać',
      specialOffers: 'Oferty Specjalne',
      discountTitle: '10% zniżki na pierwsze zamówienie',
      discountDesc: 'Złóż zamówienie online i ciesz się wyjątkowymi smakami u siebie w domu.',
      lunchTitle: 'Lunch dnia za 30 zł',
      lunchDesc: 'Od poniedziałku do piątku (11:00-16:00) dowolny kebab lub curry oraz napój w super cenie.',
      bookTitle: 'Zarezerwuj Stolik',
      bookDesc: 'Dołącz do nas i poczuj atmosferę kulinarną Orientu (Wersja DEMO).',
      date: 'Data',
      time: 'Godzina',
      guests: 'Liczba gości',
      name: 'Imię i nazwisko',
      confirm: 'Potwierdź Rezerwację',
      footerAbout: 'Prawdziwy Kebab, Biryani i wybitna kuchnia indyjska w samym sercu Polski. Poczuj tradycję smaku, otwarci do późna z dostawą do domu. Całe mięso ze sprawdzonym certyfikatem halal.',
      location: 'Lokalizacja',
      hours: 'Godziny otwarcia',
      rights: 'Wszelkie prawa zastrzeżone:',
      vegTag: 'roślinne',
    },
    en: {
      menu: 'Menu',
      offers: 'Offers',
      booking: 'Booking',
      contact: 'Contact',
      order: 'Order Online',
      heroTag: 'Delivering across all of Warsaw',
      heroTitle1: 'Vibrant Flavors of',
      heroTitle2: 'The East',
      heroDesc: 'Authentic Kebab, aromatic Biryani, and traditional Indian cuisine crafted with passion. Discover our chefs\' secrets.',
      exploreMenu: 'Explore Menu',
      bookTable: 'Book a Table',
      weAreHere: 'We Are Here For You',
      weAreHereDesc: 'Order fresh Kebab, Biryani, Daal Makhni, or Chicken Tandoori for delivery or pickup. Questions? Our AI agent assists across all channels: Web, WhatsApp, Messenger, Instagram, and by phone. Use the voice or chat widget!',
      menuEyebrow: 'The kitchen',
      menuTitle: 'Our Menu',
      menuDesc: 'Carefully prepared with authentic spices and the freshest ingredients.',
      offersEyebrow: 'Worth a taste',
      specialOffers: 'Special Offers',
      discountTitle: '10% off your first order',
      discountDesc: 'Order online and enjoy our unique flavors at home.',
      lunchTitle: 'Daily Lunch for 30 PLN',
      lunchDesc: 'Mon-Fri (11:00-16:00) choose any kebab or curry with a drink for a great price.',
      bookTitle: 'Reserve a Table',
      bookDesc: 'Join us and feel the culinary atmosphere of the Orient (DEMO Version).',
      date: 'Date',
      time: 'Time',
      guests: 'Number of guests',
      name: 'Full Name',
      confirm: 'Confirm Reservation',
      footerAbout: 'Authentic Kebab, Biryani, and outstanding Indian cuisine in the heart of Poland. Taste the tradition, open late with home delivery. All meat is certified Halal.',
      location: 'Location',
      hours: 'Opening Hours',
      rights: 'All rights reserved:',
      vegTag: 'plant-based',
    }
  };

  const curr = t[lang];

  const menuSections = [
    {
      title: lang === 'pl' ? 'Kebaby' : 'Kebabs',
      img: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=200&q=70',
      items: [
        { name: 'Kebab w picie', price: '22 zł' },
        { name: 'Kebab w tortilli (durum)', price: '25 zł' },
        { name: 'Kebab na talerzu', desc: lang === 'pl' ? 'z frytkami i surówką' : 'with fries and salad', price: '30 zł' },
        { name: 'Kebab box', desc: lang === 'pl' ? 'frytki z mięsem i sosem' : 'fries with meat and sauce', price: '28 zł' },
        { name: 'Kebab XL', price: '30 zł' },
        { name: 'Adana kebab', desc: lang === 'pl' ? 'grillowana mielona jagnięcina' : 'grilled minced lamb', price: '34 zł' },
        { name: 'Shawarma z kurczaka', price: '25 zł' },
        { name: 'Falafel wrap', desc: lang === 'pl' ? 'wegański' : 'vegan', price: '22 zł' },
        { name: 'Półmisek mix grill', price: '55 zł' },
      ]
    },
    {
      title: lang === 'pl' ? 'Dania Indyjskie' : 'Indian Dishes',
      img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200&q=70',
      items: [
        { name: 'Kurczak Tikka Masala', price: '42 zł' },
        { name: 'Butter Chicken', price: '44 zł' },
        { name: 'Jagnięcina Rogan Josh', price: '48 zł' },
        { name: 'Kacchi Biryani', desc: lang === 'pl' ? 'bangladeska biryani z jagnięciną' : 'Bangladeshi lamb biryani', price: '46 zł' },
        { name: 'Biryani z kurczakiem', price: '40 zł' },
        { name: 'Kurczak Tandoori (pół)', price: '39 zł' },
        { name: 'Paneer Tikka Masala', desc: lang === 'pl' ? 'wegetariańskie' : 'vegetarian', price: '38 zł' },
        { name: 'Curry warzywne', desc: lang === 'pl' ? 'wegańskie' : 'vegan', price: '34 zł' },
        { name: 'Dal Tadka', desc: lang === 'pl' ? 'soczewica, wegańskie' : 'lentils, vegan', price: '32 zł' },
      ]
    },
    {
      title: lang === 'pl' ? 'Przystawki' : 'Starters',
      img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=200&q=70',
      items: [
        { name: 'Samosa warzywna (2 szt.)', price: '18 zł' },
        { name: 'Onion Bhaji', desc: lang === 'pl' ? 'placki cebulowe' : 'onion fritters', price: '16 zł' },
        { name: 'Pakora z kurczaka', price: '24 zł' },
        { name: 'Hummus z pitą', price: '19 zł' },
        { name: 'Falafel (5 szt.)', price: '20 zł' },
      ]
    },
    {
      title: lang === 'pl' ? 'Pieczywo i Dodatki' : 'Breads & Sides',
      img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=70',
      items: [
        { name: 'Naan', price: '8 zł' },
        { name: 'Naan czosnkowy', price: '11 zł' },
        { name: 'Roti', price: '7 zł' },
        { name: 'Ryż basmati', price: '10 zł' },
        { name: 'Frytki', price: '10 zł' },
        { name: 'Surówka', price: '12 zł' },
        { name: 'Raita', price: '9 zł' },
      ]
    },
    {
      title: lang === 'pl' ? 'Desery i Napoje' : 'Desserts & Drinks',
      img: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=200&q=70',
      items: [
        { name: 'Baklava (2 szt.)', price: '18 zł' },
        { name: 'Gulab Jamun', price: '16 zł' },
        { name: 'Ayran', price: '8 zł' },
        { name: 'Lassi mango', price: '14 zł' },
        { name: 'Masala Chai', price: '10 zł' },
      ]
    }
  ];

  const isVeg = (desc?: string) =>
    !!desc && /wega|wege|vegan|vegetarian|roślin/i.test(desc);

  // Hero load sequence — orchestrated, not scattered.
  const heroStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-charcoal text-cream selection:bg-saffron selection:text-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-40 bg-charcoal/80 backdrop-blur-md border-b border-saffron/15">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-saffron to-paprika rounded-full flex items-center justify-center shadow-lg shadow-saffron/20">
                <ChefHat className="text-charcoal w-6 h-6" />
             </div>
             <span className="text-2xl font-heading font-semibold text-cream tracking-wide">Taj Mahal</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-cream/70">
             <a href="#menu" className="hover:text-saffron transition-colors">{curr.menu}</a>
             <a href="#oferty" className="hover:text-saffron transition-colors">{curr.offers}</a>
             <a href="#rezerwacja" className="hover:text-saffron transition-colors">{curr.booking}</a>
             <a href="#godziny" className="hover:text-saffron transition-colors">{curr.contact}</a>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-xs text-cream/80 hover:text-cream border border-saffron/25 hover:border-saffron/50 bg-saffron/5 py-1.5 px-3 rounded-full transition-all">
                <Globe className="w-3.5 h-3.5" />
                {lang.toUpperCase()}
             </button>
             <a href="#rezerwacja" className="hidden sm:flex bg-saffron hover:bg-saffron-soft text-charcoal px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105">
                {curr.order}
             </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1920&q=60"
            alt=""
            fill
            sizes="100vw"
            quality={60}
            className="object-cover brightness-[0.38]"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Warm legibility gradient + ember atmosphere (CSS-only, no extra images) */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal" />
          <div className="absolute inset-0 ember animate-ember-drift" />
          <div className="absolute inset-0 bg-jali opacity-40 mix-blend-soft-light" />
        </div>

        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-12"
        >
           <motion.div variants={heroItem} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/15 border border-saffron/30 text-saffron-soft text-sm font-medium mb-7 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              {curr.heroTag}
           </motion.div>
           <motion.h1 variants={heroItem} className="text-5xl md:text-7xl font-heading font-medium text-cream mb-6 leading-[1.05] tracking-tight">
             {curr.heroTitle1} <br/>
             <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-saffron-soft via-saffron to-paprika">
                {curr.heroTitle2}
             </span>
           </motion.h1>
           <motion.p variants={heroItem} className="text-lg md:text-xl text-cream/75 mb-10 max-w-2xl mx-auto leading-relaxed">
             {curr.heroDesc}
           </motion.p>
           <motion.div variants={heroItem} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#menu" className="group w-full sm:w-auto bg-saffron hover:bg-saffron-soft text-charcoal px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-saffron/25">
                 <UtensilsCrossed className="w-5 h-5 transition-transform group-hover:rotate-12" />
                 {curr.exploreMenu}
              </a>
              <a href="#rezerwacja" className="w-full sm:w-auto bg-cream/5 hover:bg-cream/10 backdrop-blur border border-cream/20 text-cream px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105">
                 <CalendarDays className="w-5 h-5" />
                 {curr.bookTable}
              </a>
           </motion.div>
        </motion.div>

        {!reduce && (
          <motion.a
            href="#menu"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-saffron/60"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.a>
        )}
      </section>

      {/* Intro & AI Mention */}
      <section className="bg-charcoal py-24 text-center px-6 relative">
         <div className="absolute inset-0 bg-jali opacity-30" />
         <Reveal className="max-w-4xl mx-auto relative z-10">
            <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{curr.menuEyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-cream mt-3 mb-6">{curr.weAreHere}</h2>
            <p className="text-cream/60 text-lg leading-relaxed">
              {curr.weAreHereDesc}
            </p>
         </Reveal>
      </section>

      {/* Full Menu Grid */}
      <section id="menu" className="py-24 bg-cocoa relative overflow-hidden">
        {/* Subtle food-image grid behind the menu (visible but kept readable) */}
        <div aria-hidden className="absolute inset-0 z-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 opacity-[0.22] pointer-events-none select-none">
          {MENU_BG_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ))}
        </div>
        {/* Overlay to guarantee foreground contrast over the imagery */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-cocoa/75 via-cocoa/55 to-cocoa/80" />
        <div className="absolute inset-0 z-0 bg-jali opacity-30" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] ember rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <Reveal className="text-center mb-16">
              <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase">{curr.menuEyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-heading font-medium text-cream mt-3 mb-4">{curr.menuTitle}</h2>
              <p className="text-cream/55 max-w-xl mx-auto">{curr.menuDesc}</p>
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
                             <Image
                               src={section.img}
                               alt={section.title}
                               fill
                               sizes="64px"
                               quality={60}
                               className="object-cover transition-transform duration-700 group-hover/panel:scale-110"
                               referrerPolicy="no-referrer"
                             />
                          </div>
                          <h3 className="text-2xl font-heading font-medium text-saffron">
                            {section.title}
                          </h3>
                       </div>
                       <div className="flex flex-col gap-5">
                          {section.items.map((item, i) => (
                             <div key={i} className="flex justify-between items-center group/item gap-4">
                                <div className="pr-2 min-w-0">
                                   <h4 className="font-semibold text-cream group-hover/item:text-saffron transition-colors flex items-center gap-2 flex-wrap">
                                     {item.name}
                                     {isVeg(item.desc) && (
                                       <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-cardamom border border-cardamom/40 bg-cardamom/10 px-1.5 py-0.5 rounded-full">
                                         <Leaf className="w-2.5 h-2.5" /> {curr.vegTag}
                                       </span>
                                     )}
                                   </h4>
                                   {item.desc && <p className="text-sm text-cream/45 mt-1">{item.desc}</p>}
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                   <div className="text-saffron/15 w-10 hidden sm:block border-b border-dotted" />
                                   <span className="font-bold text-charcoal bg-saffron px-3 py-1 rounded-full shadow-md text-sm">
                                     {item.price}
                                   </span>
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

      {/* Offers & Booking */}
      <section id="oferty" className="py-24 bg-charcoal relative overflow-hidden">
         <div className="absolute inset-0 bg-jali opacity-25" />
         <div className="absolute bottom-0 right-0 w-[36rem] h-[36rem] ember rounded-full blur-[120px] pointer-events-none" />

         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 relative z-10">
            <Reveal className="flex flex-col justify-center">
               <span className="text-saffron/80 text-sm font-medium tracking-[0.25em] uppercase mb-3">{curr.offersEyebrow}</span>
               <h2 className="text-4xl md:text-5xl font-heading font-medium text-cream mb-8">{curr.specialOffers}</h2>
               <div className="space-y-6">
                 <div className="bg-cocoa-light/60 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] border border-saffron/15 flex items-start gap-4 group hover:border-saffron/35 transition-colors">
                   <div className="w-14 h-14 bg-gradient-to-br from-saffron to-paprika rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-saffron/20">
                     <span className="font-bold text-charcoal text-xl">%</span>
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-saffron mb-2 font-heading">{curr.discountTitle}</h4>
                     <p className="text-cream/65 leading-relaxed">{curr.discountDesc}</p>
                   </div>
                 </div>
                 <div className="bg-cocoa-light/60 backdrop-blur-md p-6 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] border border-saffron/15 flex items-start gap-4 group hover:border-saffron/35 transition-colors">
                   <div className="w-14 h-14 bg-gradient-to-br from-saffron to-paprika rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-saffron/20">
                     <Flame className="w-6 h-6 text-charcoal" />
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-saffron mb-2 font-heading">{curr.lunchTitle}</h4>
                     <p className="text-cream/65 leading-relaxed">{curr.lunchDesc}</p>
                   </div>
                 </div>
               </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div id="rezerwacja" className="bg-cocoa-light/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-saffron/20 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/20 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                 <div className="relative z-10">
                   <h3 className="text-3xl font-heading font-medium text-cream mb-2">{curr.bookTitle}</h3>
                   <p className="text-cream/55 mb-8">{curr.bookDesc}</p>

                   <form className="space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-cream/80 mb-1.5">{curr.date}</label>
                          <input title="Date" type="date" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner [color-scheme:dark]" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-cream/80 mb-1.5">{curr.time}</label>
                          <input title="Time" type="time" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner [color-scheme:dark]" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cream/80 mb-1.5">{curr.guests}</label>
                        <select title="Guests" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner [&>option]:bg-cocoa">
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cream/80 mb-1.5">{curr.name}</label>
                        <input title="Name" type="text" placeholder="Jan Kowalski" className="w-full px-5 py-3.5 bg-black/25 text-cream backdrop-blur-md border border-saffron/15 rounded-2xl outline-none focus:ring-2 focus:ring-saffron/50 shadow-inner placeholder:text-cream/25" />
                      </div>
                      <button type="button" className="w-full bg-gradient-to-r from-saffron to-paprika hover:from-saffron-soft hover:to-paprika text-charcoal shadow-lg shadow-saffron/25 font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] mt-4">
                        {curr.confirm}
                      </button>
                   </form>
                 </div>
              </div>
            </Reveal>
         </div>
      </section>

      {/* Footer / Info */}
      <footer id="godziny" className="bg-[#0a0a0b] pt-24 pb-40 border-t border-white/10 text-gray-300 relative overflow-hidden">
         <div className="absolute inset-0 bg-jali opacity-10" />
         {/* Giant brand watermark */}
         <span
           aria-hidden
           className="pointer-events-none select-none absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 z-0 font-heading font-black tracking-tight text-white/[0.035] leading-none whitespace-nowrap text-[6rem] sm:text-[10rem] lg:text-[16rem]"
         >
           JOTILABS
         </span>
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16 relative z-10">
            <div className="col-span-2">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-gradient-to-br from-saffron to-paprika rounded-full flex items-center justify-center shadow-lg shadow-saffron/20">
                    <ChefHat className="text-charcoal w-6 h-6" />
                 </div>
                 <span className="text-2xl font-heading font-semibold text-cream tracking-wide">Taj Mahal</span>
               </div>
               <p className="max-w-md leading-relaxed text-sm">
                 {curr.footerAbout}
               </p>
            </div>

            <div>
               <h4 className="text-cream font-semibold mb-6 flex items-center gap-2">
                 <MapPin className="w-4 h-4 text-saffron" /> {curr.location}
               </h4>
               <ul className="space-y-3 text-sm">
                 <li>ul. Piękna 24</li>
                 <li>00-549 Warszawa</li>
                 <li>Polska</li>
                 <li className="pt-2">
                   <a href="tel:+48221002030" className="flex items-center hover:text-saffron transition-colors">
                     <Phone className="w-3 h-3 mr-1.5" /> +48 22 100 20 30
                   </a>
                 </li>
               </ul>
            </div>

            <div>
               <h4 className="text-cream font-semibold mb-6 flex items-center gap-2">
                 <Clock className="w-4 h-4 text-saffron" /> {curr.hours}
               </h4>
               <ul className="space-y-3 text-sm">
                 <li className="flex justify-between"><span>Pon - Czw</span> <span className="text-cream">11:00 - 00:00</span></li>
                 <li className="flex justify-between"><span>Pt - Sob</span> <span className="text-cream">11:00 - 03:00</span></li>
                 <li className="flex justify-between"><span>Niedziela</span> <span className="text-cream">12:00 - 00:00</span></li>
               </ul>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm relative z-10">
           <p className="text-gray-400 text-center md:text-left">
             {curr.rights}{' '}
             <a
               href="https://jotillabs.com"
               target="_blank"
               rel="noopener noreferrer"
               className="text-saffron font-medium hover:text-saffron-soft underline underline-offset-4 transition-colors"
             >
               jotilabs
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
      </footer>

      {/* Floating Widgets */}
      <VoiceWidget />
      <ChatWidget />
    </main>
  );
}
