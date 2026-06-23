'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin, Phone, ChefHat, UtensilsCrossed, CalendarDays, Globe, Leaf, Flame, ArrowDown } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import VoiceWidget from '../components/VoiceWidget';
import ChatWidget from '../components/ChatWidget';
import { Reveal } from '../components/Reveal';

type Language = 'pl' | 'en';

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
      rights: 'Wszelkie prawa zastrzeżone: jotilabs: Jotillabs.com',
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
      rights: 'All rights reserved: jotilabs: Jotillabs.com',
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
        <div className="absolute inset-0 bg-jali opacity-30" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] ember rounded-full blur-[120px] pointer-events-none" />
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
      <footer id="godziny" className="bg-cocoa pt-24 pb-12 border-t border-saffron/15 text-cream/55 relative overflow-hidden">
         <div className="absolute inset-0 bg-jali opacity-20" />
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

         <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-saffron/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm relative z-10">
           <p>{curr.rights}</p>
           <div className="flex items-center gap-4 text-saffron font-medium">
             <span className="cursor-pointer hover:text-saffron-soft transition-colors">Strona www</span>
             <span className="cursor-pointer hover:text-saffron-soft transition-colors">Whatsapp</span>
             <span className="cursor-pointer hover:text-saffron-soft transition-colors">Messenger</span>
             <span className="cursor-pointer hover:text-saffron-soft transition-colors">Instagram</span>
           </div>
         </div>
      </footer>

      {/* Floating Widgets */}
      <VoiceWidget />
      <ChatWidget />
    </main>
  );
}
