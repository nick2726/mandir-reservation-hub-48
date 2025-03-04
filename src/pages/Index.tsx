
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CreditCard, 
  FileText, 
  Shield, 
  Clock, 
  Heart, 
  Video, 
  ArrowRight,
  Info,
  MapPin,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const { toast } = useToast();

  const showWelcomeToast = () => {
    toast({
      title: "Welcome to Baba Baidyanath Dham",
      description: "Explore our temple services and book your temple pass for a divine experience.",
      duration: 5000,
    });
  };

  React.useEffect(() => {
    // Show welcome toast when page loads
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        showWelcomeToast();
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 1500);
    }
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section with Shiv and Parvati Background */}
      <section className="py-16 md:py-24 relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544006659-f0b21884ce1d')] bg-cover bg-center opacity-25 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/10 z-0"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <Badge variant="outline" className="bg-white/80 text-primary px-3 py-1 mb-4 backdrop-blur-sm">
              Sacred Journey Awaits
            </Badge>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent sm:text-5xl"
          >
            Baba Baidyanath Dham
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-foreground mb-8 max-w-2xl mx-auto"
          >
            Experience the divine presence at one of India's most sacred Jyotirlingas. Book your temple pass today for a blessed darshan.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8 group relative overflow-hidden"
              onClick={() => {
                toast({
                  title: "Pass Booking",
                  description: "Redirecting you to our secure pass booking page.",
                  duration: 3000,
                });
              }}
            >
              <Link to="/passes" className="flex items-center gap-2">
                <span>Book Temple Pass</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 overflow-hidden group relative"
              onClick={() => {
                toast({
                  title: "Live Darshan",
                  description: "Connecting you to live darshan stream...",
                  duration: 3000,
                });
              }}
            >
              <a href="#live-darshan" className="flex items-center gap-2">
                <Video className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Live Darshan</span>
                <span className="absolute inset-0 w-full h-full bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Cards Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <QuickInfoCard 
              icon={<Clock className="h-10 w-10 text-amber-500" />}
              title="Temple Timings"
              description="4:00 AM - 11:00 PM daily"
              delay={0}
            />
            <QuickInfoCard 
              icon={<MapPin className="h-10 w-10 text-amber-500" />}
              title="Location"
              description="Deoghar, Jharkhand, India"
              delay={0.1}
            />
            <QuickInfoCard 
              icon={<Users className="h-10 w-10 text-amber-500" />}
              title="Daily Visitors"
              description="10,000+ devotees"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 my-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <Badge className="mb-4">About The Temple</Badge>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                About Baba Baidyanath Dham
              </h2>
              <p className="text-muted-foreground mb-4">
                Baba Baidyanath Dham, located in Deoghar, Jharkhand, is one of the 12 Jyotirlingas in India. 
                The temple is dedicated to Lord Shiva and is known for its spiritual significance and ancient history.
              </p>
              <p className="text-muted-foreground mb-6">
                According to legend, Ravana performed severe penance to please Lord Shiva and was rewarded with the sacred Shivalinga. 
                The temple complex includes 22 temples and is visited by millions of devotees, especially during the auspicious month of Shravan.
              </p>
              <Button asChild variant="outline" className="group relative overflow-hidden">
                <a href="#about" className="flex items-center gap-2">
                  <Info className="h-4 w-4 group-hover:text-primary transition-colors" />
                  <span>Learn More</span>
                  <span className="absolute inset-0 w-full h-full bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
                </a>
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg group"
            >
              <img 
                src="https://images.unsplash.com/photo-1572767162983-1c2ec8721a14" 
                alt="Baba Baidyanath Temple" 
                className="w-full h-auto object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Darshan Section */}
      <section id="live-darshan" className="py-16 my-8 bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-3xl">
        <div className="container mx-auto text-center">
          <Badge className="mb-4">Virtual Experience</Badge>
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Live Darshan</h2>
          <div className="max-w-4xl mx-auto bg-card rounded-xl overflow-hidden shadow-md border border-amber-200/20">
            <div className="aspect-w-16 aspect-h-9 relative bg-muted">
              <div className="w-full h-[400px] flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="text-center">
                  <Video className="h-20 w-20 text-amber-500/50 mx-auto mb-4" />
                  <p className="text-white">Live stream will appear here during temple hours</p>
                  <p className="text-sm text-gray-400 mt-2">9:00 AM - 7:00 PM IST</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                    onClick={() => {
                      toast({
                        title: "Live Darshan Alert",
                        description: "We'll notify you when the live stream begins.",
                        duration: 3000,
                      });
                    }}
                  >
                    Notify Me When Live
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Daily Live Streaming</h3>
              <p className="text-muted-foreground">Experience the divine darshan of Baba Baidyanath from anywhere in the world through our live streaming service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Services Section */}
      <section className="py-16 my-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Services</Badge>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Temple Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need for a blessed and comfortable visit to Baba Baidyanath Dham</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Clock className="h-12 w-12 text-amber-500 group-hover:text-primary transition-colors duration-300" />}
              title="Aarti & Puja Timings"
              description="View the schedule of daily rituals and special ceremonies performed at the temple."
              link="#schedule"
              delay={0}
            />
            <ServiceCard 
              icon={<Heart className="h-12 w-12 text-amber-500 group-hover:text-primary transition-colors duration-300" />}
              title="Online Donations"
              description="Contribute to the temple's activities and maintenance through secure online donations."
              link="#donate"
              delay={0.1}
            />
            <ServiceCard 
              icon={<Calendar className="h-12 w-12 text-amber-500 group-hover:text-primary transition-colors duration-300" />}
              title="Events & Festivals"
              description="Stay updated with upcoming festivals, events, and special occasions at the temple."
              link="#events"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-3xl my-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Booking Process</Badge>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">How to Book Your Pass</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Simple steps to secure your visit to Baba Baidyanath Dham</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-amber-500" />}
              title="Choose Your Date"
              description="Browse available dates and select the one that works best for your pilgrimage."
              delay={0}
              stepNumber={1}
            />
            <FeatureCard 
              icon={<CreditCard className="h-10 w-10 text-amber-500" />}
              title="Secure Payment"
              description="Pay securely online with multiple payment options available."
              delay={0.1}
              stepNumber={2}
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-amber-500" />}
              title="Instant Pass"
              description="Receive your digital pass instantly via email and in the app."
              delay={0.2}
              stepNumber={3}
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-amber-500" />}
              title="Safe Visit"
              description="Entry management ensures a safe and organized visiting experience."
              delay={0.3}
              stepNumber={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 my-16">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-amber-500/10 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-amber-200/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-32 -mt-32 z-0"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32 z-0"></div>
            <div className="relative z-10 max-w-3xl">
              <Badge className="mb-4">Ready to Visit?</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">Ready to plan your spiritual journey?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Book your Babadham Mandir pass today and ensure a smooth, hassle-free visit to this sacred place.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-8 group relative overflow-hidden"
                onClick={() => {
                  toast({
                    title: "Let's Start Your Spiritual Journey",
                    description: "Taking you to our booking page...",
                    duration: 3000,
                  });
                }}
              >
                <Link to="/passes" className="flex items-center gap-2">
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-[-1]"></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  stepNumber: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, stepNumber }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px] border border-amber-200/20 relative"
    >
      <div className="absolute -top-3 -left-3 bg-amber-500 text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
        {stepNumber}
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-md transition-all hover:translate-y-[-5px] group border-amber-200/20">
        <CardHeader>
          <div className="mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" size="sm" className="group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
            <a href={link} className="flex items-center gap-2">
              <span>Learn More</span>
              <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

interface QuickInfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const QuickInfoCard: React.FC<QuickInfoCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card rounded-xl p-4 shadow-sm flex items-center gap-4 border border-amber-200/20 hover:shadow-md transition-all hover:translate-y-[-2px]"
    >
      <div className="bg-amber-500/10 p-3 rounded-full">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

export default Index;
