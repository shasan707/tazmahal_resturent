'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import { RetellWebClient } from 'retell-client-js-sdk';

const PHONE_NUMBER = process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER ?? '';

export default function VoiceWidget() {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const clientRef = useRef<RetellWebClient | null>(null);

  // Create the Retell web client once and wire up its events.
  useEffect(() => {
    const client = new RetellWebClient();
    clientRef.current = client;

    client.on('call_started', () => {
      setIsConnecting(false);
      setIsActive(true);
    });

    client.on('call_ended', () => {
      setIsActive(false);
      setIsConnecting(false);
    });

    client.on('error', (err: unknown) => {
      console.error('Retell call error:', err);
      setError('Connection error');
      client.stopCall();
      setIsActive(false);
      setIsConnecting(false);
    });

    return () => {
      client.stopCall();
      clientRef.current = null;
    };
  }, []);

  const startVoice = async () => {
    setIsConnecting(true);
    setError('');

    try {
      const res = await fetch('/api/retell/web-call', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create web call');
      }
      const { accessToken } = await res.json();

      await clientRef.current?.startCall({ accessToken });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Microphone access denied or error connecting.');
      setIsConnecting(false);
      setIsActive(false);
    }
  };

  const stopVoice = () => {
    clientRef.current?.stopCall();
    setIsActive(false);
    setIsConnecting(false);
  };

  const toggleVoice = () => {
    if (isActive || isConnecting) {
      stopVoice();
    } else {
      startVoice();
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-3">
       {error && (
         <div className="max-w-xs bg-red-500/90 text-white text-xs px-3 py-2 rounded-xl shadow-lg backdrop-blur-md border border-red-400/30">
           {error}
         </div>
       )}

       {/* Mic button — sits directly ABOVE the phone number, with a gentle float */}
       <div className={isActive ? '' : 'animate-float'}>
         <button
           onClick={toggleVoice}
           aria-label={isActive ? 'Zakończ rozmowę' : 'Porozmawiaj z asystentką'}
           className={'relative flex items-center justify-center w-14 h-14 rounded-full ' + (isActive ? 'bg-red-500 hover:bg-red-600 shadow-xl' : 'bg-gradient-to-br from-amber-400 via-orange-500 to-amber-500 animate-vibrant text-white')}
         >
            {isActive && (
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full border border-red-400"
              />
            )}

            {isConnecting ? (
               <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isActive ? (
               <MicOff className="w-6 h-6 text-white" />
            ) : (
               <Mic className="w-6 h-6 text-white" />
            )}
         </button>
       </div>

       {/* Voice status indicator (label + phone number) */}
       <div className="bg-white/10 text-white backdrop-blur-xl px-4 py-2 rounded-full shadow-2xl border border-white/20 flex items-center gap-3">
          <div className="flex flex-col">
             <span className="text-sm font-semibold tracking-wide">Porozmawiaj z Asystentką</span>
             {PHONE_NUMBER && (
               <a
                 href={`tel:${PHONE_NUMBER.replace(/[^+\d]/g, '')}`}
                 className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
               >
                 <PhoneCall className="w-3 h-3" />
                 <span>{PHONE_NUMBER}</span>
               </a>
             )}
          </div>
       </div>
    </div>
  );
}
