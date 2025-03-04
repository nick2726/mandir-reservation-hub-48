
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, RefreshCw } from 'lucide-react';

interface NoPassesFoundProps {
  onClearFilters: () => void;
}

const NoPassesFound: React.FC<NoPassesFoundProps> = ({ onClearFilters }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 bg-gradient-to-b from-amber-50/50 to-transparent rounded-xl border border-amber-100/50"
    >
      <div className="bg-amber-100/50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar className="h-10 w-10 text-amber-500" />
      </div>
      <h3 className="text-xl font-medium mb-2">No passes available for the selected filters</h3>
      <p className="text-muted-foreground mb-6">Try selecting a different date or pass type</p>
      <Button 
        onClick={onClearFilters} 
        className="gap-2 bg-amber-500 hover:bg-amber-600 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Clear Filters
      </Button>
    </motion.div>
  );
};

export default NoPassesFound;
