
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Landmark, Smartphone, Banknote } from 'lucide-react';

interface PaymentMethodSelectorProps {
  activeMethod: string;
  onChange: (method: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ activeMethod, onChange }) => {
  return (
    <Tabs defaultValue={activeMethod} onValueChange={onChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="card" className="flex flex-col items-center py-2 px-1 h-auto">
          <CreditCard className="h-4 w-4 mb-1" />
          <span className="text-xs">Card</span>
        </TabsTrigger>
        <TabsTrigger value="upi" className="flex flex-col items-center py-2 px-1 h-auto">
          <Smartphone className="h-4 w-4 mb-1" />
          <span className="text-xs">UPI</span>
        </TabsTrigger>
        <TabsTrigger value="netbanking" className="flex flex-col items-center py-2 px-1 h-auto">
          <Landmark className="h-4 w-4 mb-1" />
          <span className="text-xs">Net Banking</span>
        </TabsTrigger>
        <TabsTrigger value="cash" className="flex flex-col items-center py-2 px-1 h-auto">
          <Banknote className="h-4 w-4 mb-1" />
          <span className="text-xs">Cash</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
