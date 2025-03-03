
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface PassFiltersProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const PassFilters: React.FC<PassFiltersProps> = ({
  selectedDate,
  setSelectedDate,
  selectedType,
  setSelectedType,
  clearFilters,
  hasActiveFilters
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedType === null ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedType(null)}
        >
          All Types
        </Button>
        <Button
          variant={selectedType === "Standard" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedType("Standard")}
        >
          Standard
        </Button>
        <Button
          variant={selectedType === "Premium" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedType("Premium")}
        >
          Premium
        </Button>
      </div>
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default PassFilters;
