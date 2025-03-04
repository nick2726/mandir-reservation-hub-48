
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pass, usePassData } from '@/hooks/usePassData';
import PassFilters from './components/PassFilters';
import PassesList from './components/PassesList';
import NoPassesFound from './components/NoPassesFound';
import PassesLoading from './components/PassesLoading';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <Badge className="mb-4">Temple Access</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Available Passes</h1>
              <p className="text-muted-foreground">Browse and book your Babadham Mandir passes</p>
            </div>
            
            {/* Real-time indicator */}
            <div className="flex items-center mt-4 md:mt-0 text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Showing real-time availability</span>
            </div>
          </div>
          
          <Alert className="mb-6 border-amber-200 bg-amber-50/50">
            <Info className="h-4 w-4 text-amber-500" />
            <AlertTitle className="text-amber-700 font-medium">Plan Your Visit</AlertTitle>
            <AlertDescription className="text-amber-600">
              For a smoother experience, we recommend booking passes at least 3 days in advance. Premium passes include priority darshan access.
            </AlertDescription>
          </Alert>
          
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
