'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/cn';
import { vi } from 'date-fns/locale';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
  value?: Date;
  onChange: (date?: Date) => void;
  className?: string;
};

export function DatePicker({ value, onChange, className }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          'w-full justify-start text-left font-normal',
          !value && 'text-muted-foreground',
          className,
        )}
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, 'PPP', { locale: vi }) : <span>Pick a date</span>}
      </Button>
      {open && (
        <div className="absolute z-50 mt-1 bg-popover rounded-md border shadow-md p-2">
          <DatePicker
            selected={value || null}
            onChange={(date) => {
              onChange(date as Date | undefined);
              setOpen(false);
            }}
            inline
            locale={vi}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
      )}
    </div>
  );
}
