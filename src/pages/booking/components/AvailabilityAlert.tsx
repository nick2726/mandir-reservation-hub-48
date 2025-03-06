
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Pass } from '@/hooks/usePassData';

interface AvailabilityAlertProps {
  pass: Pass;
}

const AvailabilityAlert: React.FC<AvailabilityAlertProps> = ({ pass }) => {
  if (pass.availableSlots > 5) return null;
  
  return (
    <div className="mb-6 p-3 border border-amber-200 bg-amber-50 rounded-md flex items-center text-amber-800">
      <AlertTriangle className="h-5 w-5 mr-2" />
      <div>
        <p className="font-medium">Limited availability!</p>
        <p className="text-sm">Only {pass.availableSlots} slots left for this pass</p>
      </div>
    </div>
  );
};

export default AvailabilityAlert;
