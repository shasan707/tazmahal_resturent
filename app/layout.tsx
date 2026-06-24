import type {Metadata} from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../components/LanguageProvider';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import VoiceWidget from '../components/VoiceWidget';
import ChatWidget from '../components/ChatWidget';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Taj Mahal | Kebab, Biryani & Indian Dining in Warsaw',
  description: 'Authentic Kebab, aromatic Biryani, and traditional Indian & Bangladeshi cuisine in the heart of Warsaw. Order online, book a table, or ask our AI assistant — on web, WhatsApp, Messenger, Instagram, and by phone.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl" className={inter.variable + ' ' + fraunces.variable}>
      <body className="font-sans antialiased text-cream bg-charcoal selection:bg-saffron selection:text-charcoal" suppressHydrationWarning>
        <LanguageProvider>
          <Nav />
          <main className="min-h-screen overflow-hidden">{children}</main>
          <Footer />
          <VoiceWidget />
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
