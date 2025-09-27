import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dateRangePresets } from '@/lib/chart-utils';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangePickerProps {
  value: DateRange | null;
  onChange: (range: DateRange | null) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handlePresetSelect = (days: number, label: string) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    onChange({ start, end });
    setSelectedPreset(label);
    setIsOpen(false);
  };

  const handleCustomDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (!value) {
      // First date selected
      onChange({ start: date, end: date });
      setSelectedPreset(null);
    } else if (value.start && !value.end) {
      // Second date selected
      const start = value.start < date ? value.start : date;
      const end = value.start < date ? date : value.start;
      onChange({ start, end });
      setSelectedPreset(null);
      setIsOpen(false);
    } else {
      // Reset selection
      onChange({ start: date, end: date });
      setSelectedPreset(null);
    }
  };

  const formatDateRange = (range: DateRange | null) => {
    if (!range) return 'Select date range';
    
    if (range.start.getTime() === range.end.getTime()) {
      return format(range.start, 'MMM dd, yyyy');
    }
    
    return `${format(range.start, 'MMM dd')} - ${format(range.end, 'MMM dd, yyyy')}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-between text-white min-w-[280px] bg-slate-800/50 border-slate-700",
            "hover:bg-slate-800 hover:border-blue-500/30",
            "transition-all duration-300",
            !value && "",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDateRange(value)}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-auto p-0 bg-slate-800 border-slate-700" 
        align="start"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {/* Presets sidebar */}
          <div className="p-3 border-r border-slate-700 bg-slate-800/30">
            <h4 className="text-sm font-medium mb-3 text-white">Quick Select</h4>
            <div className="space-y-1">
              {dateRangePresets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start text-white text-left font-normal",
                    "hover:bg-blue-500/10 hover:text-blue-400",
                    selectedPreset === preset.label && "bg-blue-500/20 text-blue-400"
                  )}
                  onClick={() => handlePresetSelect(preset.days, preset.label)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="p-3">
            <Calendar
              mode="single"
              selected={value?.start}
              onSelect={handleCustomDateSelect}
              initialFocus
              className="pointer-events-auto text-white"
            />
            
            {value && (
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-sm text-white mb-2">Selected Range:</p>
                <p className="text-sm font-medium text-white">{formatDateRange(value)}</p>
                
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onChange(null)}
                    className="flex-1"
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};