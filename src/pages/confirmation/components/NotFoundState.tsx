
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const NotFoundState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="text-center">
        <p className="text-xl font-semibold">Booking not found</p>
        <Button onClick={() => navigate('/passes')} className="mt-4">Browse Passes</Button>
      </div>
    </div>
  );
};
