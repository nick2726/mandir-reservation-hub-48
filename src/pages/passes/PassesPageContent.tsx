
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pass, usePassData } from '@/hooks/usePassData';
import PassFilters from './components/PassFilters';
import PassesList from './components/PassesList';
import NoPassesFound from './components/NoPassesFound';
import PassesLoading from './components/PassesLoading';

const PassesPageContent = () => {
  const { passes, isLoading } = usePassData();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredPasses, setFilteredPasses] = useState<Pass[]>([]);
  
  useEffect(() => {
    // Filter passes based on selected date and type
    let filtered = [...passes];
    
    if (selectedDate) {
      filtered = filtered.filter((pass) => 
        pass.date.getDate() === selectedDate.getDate() &&
        pass.date.getMonth() === selectedDate.getMonth() &&
        pass.date.getFullYear() === selectedDate.getFullYear()
      );
    }
    
    if (selectedType) {
      filtered = filtered.filter((pass) => pass.type === selectedType);
    }
    
    setFilteredPasses(filtered);
  }, [selectedDate, selectedType, passes]);
  
  const clearFilters = () => {
    setSelectedDate(undefined);
    setSelectedType(null);
  };
  
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Available Passes</h1>
          <p className="text-muted-foreground mb-8">Browse and book your Babadham Mandir passes</p>
          
          {/* Real-time indicator */}
          <div className="flex items-center mb-4 text-sm text-muted-foreground">
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Showing real-time availability</span>
          </div>
          
          <PassFilters 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            clearFilters={clearFilters}
            hasActiveFilters={!!(selectedDate || selectedType)}
          />
          
          {/* Passes Content */}
          {isLoading ? (
            <PassesLoading />
          ) : (
            <>
              {filteredPasses.length === 0 ? (
                <NoPassesFound onClearFilters={clearFilters} />
              ) : (
                <PassesList passes={filteredPasses} />
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PassesPageContent;
