"use client";

import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnalyticsLogger() {
  const [events, setEvents] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const addEvent = (event: any) => {
      const newEvent = {
        id: Math.random().toString(36).slice(2, 11),
        timestamp: Date.now(),
        data: event.detail
      };
      
      setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
    };

    window.addEventListener('analytics-event', addEvent);
    return () => window.removeEventListener('analytics-event', addEvent);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl">
        <div className="flex items-center justify-between p-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Events</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-slate-700 rounded text-gray-400 hover:text-white transition-colors"
            >
              {isMinimized ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-slate-700 rounded text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 max-h-80 overflow-y-auto">
                {events.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">
                    Click around to see events
                  </p>
                ) : (
                  <div className="space-y-2">
                    {events.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-800 rounded p-2 text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-blue-400 font-medium">
                            {event.data.type || 'event'}
                          </span>
                          <span className="text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-gray-300">
                          {event.data.element && (
                            <div><span className="text-yellow-400">element:</span> {event.data.element}</div>
                          )}
                          {event.data.event && (
                            <div><span className="text-yellow-400">event:</span> {event.data.event}</div>
                          )}
                          {event.data.plan_name && (
                            <div><span className="text-green-400">plan:</span> {event.data.plan_name}</div>
                          )}
                          {event.data.location && (
                            <div><span className="text-purple-400">location:</span> {event.data.location}</div>
                          )}
                          {event.data.path && (
                            <div><span className="text-cyan-400">path:</span> {event.data.path}</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}