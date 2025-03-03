
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';
import { CalendarIcon, FilterIcon, Users } from 'lucide-react';
import { format } from 'date-fns';

// Mock data for passes
const mockPasses = [
  {
    id: 1,
    type: "Standard",
    date: new Date('2023-08-05'),
    price: 500,
    availableSlots: 45,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
  },
  {
    id: 2,
    type: "Premium",
    date: new Date('2023-08-05'),
    price: 1000,
    availableSlots: 15,
    totalSlots: 30,
    description: "Premium pass with priority entry and special darshan. Valid for the selected date only.",
  },
  {
    id: 3,
    type: "Standard",
    date: new Date('2023-08-06'),
    price: 500,
    availableSlots: 60,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
  },
  {
    id: 4,
    type: "Premium",
    date: new Date('2023-08-06'),
    price: 1000,
    availableSlots: 20,
    totalSlots: 30,
    description: "Premium pass with priority entry and special darshan. Valid for the selected date only.",
  },
  {
    id: 5,
    type: "Standard",
    date: new Date('2023-08-07'),
    price: 500,
    availableSlots: 75,
    totalSlots: 100,
    description: "Standard entry pass for Babadham Mandir. Valid for the selected date only.",
  },
  {
    id: 6,
    type: "Premium",
    date: new Date('2023-08-07'),
    price: 1000,
    availableSlots: 25,
    totalSlots: 30,
    description: "Premium pass with priority entry and special darshan. Valid for the selected date only.",
  },
];

interface Pass {
  id: number;
  type: string;
  date: Date;
  price: number;
  availableSlots: number;
  totalSlots: number;
  description: string;
}

const PassesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [passes, setPasses] = useState<Pass[]>([]);
  const [filteredPasses, setFilteredPasses] = useState<Pass[]>([]);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPasses(mockPasses);
      setFilteredPasses(mockPasses);
      setIsLoading(false);
    }, 1000);
  }, []);
  
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
          
          {/* Filters */}
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
            
            {(selectedDate || selectedType) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {/* Passes Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Skeleton className="h-40 w-full rounded-none" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {filteredPasses.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No passes available for the selected filters</h3>
                  <p className="text-muted-foreground mb-4">Try selecting a different date or pass type</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPasses.map((pass, index) => (
                    <motion.div
                      key={pass.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <PassCard pass={pass} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

interface PassCardProps {
  pass: Pass;
}

const PassCard: React.FC<PassCardProps> = ({ pass }) => {
  const availability = (pass.availableSlots / pass.totalSlots) * 100;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pass.type} Pass</CardTitle>
            <CardDescription>{format(pass.date, 'EEEE, MMMM d, yyyy')}</CardDescription>
          </div>
          <Badge variant={pass.type === "Premium" ? "default" : "secondary"}>
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
          
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                availability > 50 ? 'bg-green-500' : availability > 20 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${availability}%` }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/booking/${pass.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PassesPage;
