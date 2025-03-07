
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pass } from '@/hooks/usePassData';
import { Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PassCardProps {
  pass: Pass;
}

const PassCard: React.FC<PassCardProps> = ({ pass }) => {
  const availability = (pass.availableSlots / pass.totalSlots) * 100;
  const { toast } = useToast();
  
  // Show notification when availability changes
  useEffect(() => {
    if (pass.lastUpdated && (Date.now() - pass.lastUpdated.getTime() < 2000)) {
      if (pass.availableSlots === 0) {
        toast({
          title: `${pass.type} Pass sold out!`,
          description: `For ${format(pass.date, 'MMMM d, yyyy')}`,
          variant: "destructive",
        });
      } else if (pass.availableSlots <= 5) {
        toast({
          title: `${pass.type} Pass almost sold out!`,
          description: `Only ${pass.availableSlots} slots left for ${format(pass.date, 'MMMM d, yyyy')}`,
          variant: "destructive",
        });
      }
    }
  }, [pass, toast]);
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pass.type} Pass</CardTitle>
            <CardDescription>{format(pass.date, 'EEEE, MMMM d, yyyy')}</CardDescription>
          </div>
          <Badge variant={pass.type === "VIP" ? "default" : "secondary"}>
            {pass.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold">₹{pass.price}</p>
            <p className="text-sm text-muted-foreground">per person</p>
          </div>
          
          <p className="text-sm">{pass.description}</p>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {pass.availableSlots} available / {pass.totalSlots} total
            </span>
          </div>
          
          {/* Real-time status indicator */}
          {pass.lastUpdated && (Date.now() - pass.lastUpdated.getTime() < 5000) && (
            <div className="flex items-center text-xs text-amber-600 animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              <span>Recently updated</span>
            </div>
          )}
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                availability > 50 ? 'bg-green-500' : availability > 20 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${availability}%` }}
            />
          </div>
          
          {/* Status badges */}
          {pass.status === 'limited' && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
              Limited Availability
            </Badge>
          )}
          
          {pass.status === 'sold_out' && (
            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
              Sold Out
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          className="w-full" 
          disabled={pass.availableSlots === 0}
        >
          <Link to={`/booking/${pass.id}`}>
            {pass.availableSlots === 0 ? 'Sold Out' : 'Book Now'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PassCard;
