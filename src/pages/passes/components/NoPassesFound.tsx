
import React from 'react';
import { Button } from '@/components/ui/button';

interface NoPassesFoundProps {
  onClearFilters: () => void;
}

const NoPassesFound: React.FC<NoPassesFoundProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-16">
      <h3 className="text-xl font-medium mb-2">No passes available for the selected filters</h3>
      <p className="text-muted-foreground mb-4">Try selecting a different date or pass type</p>
      <Button onClick={onClearFilters}>Clear Filters</Button>
    </div>
  );
};

export default NoPassesFound;
