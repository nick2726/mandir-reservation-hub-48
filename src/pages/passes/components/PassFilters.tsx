
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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
    <Card className="p-4 mb-8 border-amber-200/30 bg-gradient-to-r from-white to-amber-50/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-amber-500" />
          <h3 className="font-medium">Filter Passes</h3>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs flex items-center gap-1 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <p className="text-xs text-muted-foreground mb-2">Select Date</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={`flex items-center gap-2 border-amber-200/50 hover:border-amber-300/70 hover:bg-amber-50/50 transition-colors ${selectedDate ? 'bg-amber-50/50 text-amber-800' : ''}`}
              >
                <CalendarIcon className="h-4 w-4 text-amber-500" />
                {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                {selectedDate && (
                  <X 
                    className="h-3 w-3 ml-1 opacity-70 hover:opacity-100" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(undefined);
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="border rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-2">Pass Type</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedType === null ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
              className={`${selectedType === null ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'hover:bg-amber-50/50'} transition-colors`}
            >
              All Types
            </Button>
            <Button
              variant={selectedType === "Standard" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedType("Standard")}
              className={`${selectedType === "Standard" ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'hover:bg-amber-50/50'} transition-colors`}
            >
              Standard
            </Button>
            <Button
              variant={selectedType === "Premium" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedType("Premium")}
              className={`${selectedType === "Premium" ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'hover:bg-amber-50/50'} transition-colors`}
            >
              Premium
            </Button>
          </div>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <p className="text-xs text-muted-foreground mr-2">Active filters:</p>
          {selectedDate && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-amber-50 text-amber-800 border-amber-200"
            >
              Date: {format(selectedDate, 'PPP')}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setSelectedDate(undefined)}
              />
            </Badge>
          )}
          {selectedType && (
            <Badge 
              variant="outline" 
              className="flex items-center gap-1 bg-amber-50 text-amber-800 border-amber-200"
            >
              Type: {selectedType}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => setSelectedType(null)}
              />
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
};

export default PassFilters;
