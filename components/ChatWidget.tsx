'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Taj Mahal, dzień dobry! W czym mogę pomóc?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages.slice(1), // excluding initial greeting
          message: userMessage
        })
      });

      const data = await response.json().catch(() => ({}));
      if (response.ok && data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        const detail = data.error ? ` (${data.error})` : '';
        setMessages(prev => [...prev, { role: 'model', text: `Przepraszam, wystąpił błąd.${detail}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Przepraszam, wystąpił błąd sieci.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-zinc-950/60 backdrop-blur-2xl w-80 sm:w-[400px] rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden mb-4 flex flex-col h-[540px] max-h-[calc(100dvh-6rem)]"
          >
            <div className="shrink-0 bg-gradient-to-r from-amber-500/80 to-orange-600/80 backdrop-blur-xl text-white px-5 py-4 flex items-center justify-between border-b border-white/20">
              <div>
                <h3 className="font-semibold text-white drop-shadow-md">Taj Mahal Chat</h3>
                <p className="text-xs text-amber-50/90 leading-tight">Zawsze gotowi do pomocy</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-4 bg-zinc-900/40">
              {messages.map((msg, i) => (
                <div key={i} className={'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg ' + (msg.role === 'user' ? 'bg-amber-500/90 backdrop-blur-md text-white self-end rounded-tr-sm border border-amber-400/30' : 'bg-white/10 backdrop-blur-xl border border-white/10 text-slate-100 self-start rounded-tl-sm')}>
                   {msg.role === 'user' ? (
                      msg.text
                   ) : (
                      <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-p:my-1 prose-headings:my-2 prose-headings:text-amber-400 prose-ul:my-1 prose-strong:text-amber-300 prose-li:my-0">
                         <Markdown>{msg.text}</Markdown>
                      </div>
                   )}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 text-slate-400 self-start rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="shrink-0 p-3 bg-zinc-950/60 backdrop-blur-xl border-t border-white/10 flex items-center gap-2">
              <input
                title="Wpisz wiadomość"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Napisz do nas..."
                className="flex-1 px-4 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm outline-none focus:ring-2 focus:ring-amber-500/40 text-white placeholder:text-white/40 shadow-inner"
              />
              <button 
                type="button"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-amber-500 to-orange-600 w-10 h-10 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-all hover:scale-105 shadow-xl border border-white/20"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>

            {/* White-label branding */}
            <div className="shrink-0 px-4 py-2 bg-zinc-950/60 backdrop-blur-xl text-center border-t border-white/5">
              <span className="text-[11px] text-white/40">
                Powered by{' '}
                <a
                  href="https://jotillabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  jotilabs
                </a>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        // Wrapper carries the float so the button's hover:scale stays independent
        <div className="animate-float-slow">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Otwórz czat"
            className="w-14 h-14 bg-amber-600 hover:bg-amber-700 rounded-full shadow-xl flex items-center justify-center text-white transition-transform hover:scale-105"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
