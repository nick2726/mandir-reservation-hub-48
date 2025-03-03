
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

// Mock data for user's bookings
const mockBookings = [
  {
    id: "booking-001",
    passId: "pass-001",
    passType: "VIP Darshan",
    date: new Date(2023, 6, 15),
    time: "10:00 AM",
    persons: 2,
    amount: 1200,
    status: "confirmed",
  },
  {
    id: "booking-002",
    passId: "pass-002",
    passType: "Regular Darshan",
    date: new Date(2023, 8, 22),
    time: "11:30 AM",
    persons: 4,
    amount: 1600,
    status: "confirmed",
  },
  {
    id: "booking-003",
    passId: "pass-003",
    passType: "Special Darshan",
    date: new Date(2023, 9, 5),
    time: "9:00 AM",
    persons: 1,
    amount: 800,
    status: "pending",
  }
];

// Mock user profile data
const userProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "+91 98765 43210",
  address: "123, Sector 7, Dwarka, New Delhi - 110075",
};

const ProfilePage = () => {
  const [bookings, setBookings] = useState(mockBookings);
  
  const handleDownloadPass = (bookingId: string) => {
    toast({
      title: "Pass Downloaded",
      description: `Your pass for booking ID ${bookingId} has been downloaded.`,
    });
  };
  
  const handleViewDetails = (bookingId: string) => {
    // Navigate to confirmation page with booking details
    window.location.href = `/confirmation/${bookingId}`;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your profile and bookings</p>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Personal Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{booking.passType}</CardTitle>
                        <CardDescription>Booking ID: {booking.id}</CardDescription>
                      </div>
                      <Badge variant={booking.status === "confirmed" ? "default" : "outline"}>
                        {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{format(booking.date, "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{booking.time} • {booking.persons} {booking.persons > 1 ? "Persons" : "Person"}</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount</span>
                      <span className="font-bold">₹{booking.amount}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => handleViewDetails(booking.id)}>
                      View Details
                    </Button>
                    {booking.status === "confirmed" && (
                      <Button onClick={() => handleDownloadPass(booking.id)} className="gap-1">
                        <Download className="h-4 w-4" /> Download Pass
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You have no bookings yet.</p>
                  <Button className="mt-4" asChild>
                    <a href="/passes">Book a Pass</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                      <p>{userProfile.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                      <p>{userProfile.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                      <p>{userProfile.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                      <p>{userProfile.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">Edit Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
