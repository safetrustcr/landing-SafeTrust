"use client";

import { MessageCircle } from 'lucide-react';

export function ContactBubble() {
  return (
    <a
      href="https://t.me/safetrustcr"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 bg-blue-500 hover:bg-blue-600 active:scale-95 hover:scale-110 text-white rounded-full shadow-lg transition-all cursor-pointer group hover:shadow-xl"
      aria-label="Contact us on Telegram"
    >
      <MessageCircle className="w-6 h-6" />
      {/* Tooltip on hover */}
      <span className="absolute -top-10 right-0 w-max px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat on Telegram
      </span>
    </a>
  );
}
