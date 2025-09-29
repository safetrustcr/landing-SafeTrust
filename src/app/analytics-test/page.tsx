"use client";

import { useTracker } from "@/hooks/use-analytics";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function AnalyticsTest() {
  const { logEvent, buttonClick, visitPage } = useTracker();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const handleAnalyticsEvent = (event: any) => {
      setEvents(prev => [...prev, event.detail]);
    };

    window.addEventListener('analytics-event', handleAnalyticsEvent);
    return () => window.removeEventListener('analytics-event', handleAnalyticsEvent);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Test Buttons</h2>
            
            <Button 
              onClick={() => buttonClick('test_button', { button_type: 'primary' })}
              className="w-full"
            >
              Test Button Click
            </Button>
            
            <Button 
              onClick={() => logEvent('custom_event', { action: 'form_submit', form_name: 'newsletter' })}
              variant="outline"
              className="w-full"
            >
              Test Custom Event
            </Button>
            
            <Button 
              onClick={() => visitPage('/custom-page')}
              variant="secondary" 
              className="w-full"
            >
              Test Page View
            </Button>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Analytics Events</h2>
            <div className="bg-slate-800 p-4 rounded-lg max-h-96 overflow-y-auto">
              {events.length === 0 ? (
                <p className="text-gray-400">No events yet. Click a button to test!</p>
              ) : (
                events.map((event, index) => (
                  <div key={index} className="mb-2 p-2 bg-slate-700 rounded text-xs">
                    <pre>{JSON.stringify(event, null, 2)}</pre>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}