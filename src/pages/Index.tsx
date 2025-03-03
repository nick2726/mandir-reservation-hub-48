
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, CreditCard, FileText, Shield, Clock, Heart, Globe, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843')] bg-cover bg-center opacity-20 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/10 z-0"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent sm:text-5xl"
          >
            Baba Baidyanath Dham
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-foreground mb-8 max-w-2xl mx-auto"
          >
            Experience the divine presence at one of India's most sacred Jyotirlingas. Book your temple pass today for a blessed darshan.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8"
              onClick={() => {
                toast({
                  title: "Pass Booking",
                  description: "Redirecting you to our secure pass booking page.",
                  duration: 3000,
                });
              }}
            >
              <Link to="/passes">Book Temple Pass</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8"
              onClick={() => {
                toast({
                  title: "Live Darshan",
                  description: "Connecting you to live darshan stream...",
                  duration: 3000,
                });
              }}
            >
              <a href="#live-darshan">Live Darshan</a>
            </Button>
          </motion.div>
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
              <h2 className="text-3xl font-bold mb-6">About Baba Baidyanath Dham</h2>
              <p className="text-muted-foreground mb-4">
                Baba Baidyanath Dham, located in Deoghar, Jharkhand, is one of the 12 Jyotirlingas in India. 
                The temple is dedicated to Lord Shiva and is known for its spiritual significance and ancient history.
              </p>
              <p className="text-muted-foreground mb-6">
                According to legend, Ravana performed severe penance to please Lord Shiva and was rewarded with the sacred Shivalinga. 
                The temple complex includes 22 temples and is visited by millions of devotees, especially during the auspicious month of Shravan.
              </p>
              <Button asChild variant="outline">
                <a href="#about">Learn More</a>
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                alt="Baba Baidyanath Temple" 
                className="w-full h-auto object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Darshan Section */}
      <section id="live-darshan" className="py-16 my-8 bg-secondary/30 rounded-3xl">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Live Darshan</h2>
          <div className="max-w-4xl mx-auto bg-card rounded-xl overflow-hidden shadow-md">
            <div className="aspect-w-16 aspect-h-9 relative bg-muted">
              <div className="w-full h-[400px] flex items-center justify-center bg-muted">
                <div className="text-center">
                  <Video className="h-20 w-20 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Live stream will appear here during temple hours</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">9:00 AM - 7:00 PM IST</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
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
          <h2 className="text-3xl font-bold text-center mb-12">Temple Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Aarti & Puja Timings"
              description="View the schedule of daily rituals and special ceremonies performed at the temple."
              link="#schedule"
              delay={0}
            />
            <ServiceCard 
              icon={<Heart className="h-10 w-10 text-primary" />}
              title="Online Donations"
              description="Contribute to the temple's activities and maintenance through secure online donations."
              link="#donate"
              delay={0.1}
            />
            <ServiceCard 
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Events & Festivals"
              description="Stay updated with upcoming festivals, events, and special occasions at the temple."
              link="#events"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="py-16 bg-secondary/30 rounded-3xl my-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How to Book Your Pass</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Choose Your Date"
              description="Browse available dates and select the one that works best for your pilgrimage."
              delay={0}
            />
            <FeatureCard 
              icon={<CreditCard className="h-10 w-10 text-primary" />}
              title="Secure Payment"
              description="Pay securely online with multiple payment options available."
              delay={0.1}
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Instant Pass"
              description="Receive your digital pass instantly via email and in the app."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Safe Visit"
              description="Entry management ensures a safe and organized visiting experience."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 my-16">
        <div className="container mx-auto">
          <div className="bg-primary/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to plan your spiritual journey?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Book your Babadham Mandir pass today and ensure a smooth, hassle-free visit to this sacred place.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="rounded-full px-8"
                onClick={() => {
                  toast({
                    title: "Let's Start Your Spiritual Journey",
                    description: "Taking you to our booking page...",
                    duration: 3000,
                  });
                }}
              >
                <Link to="/passes">Book Now</Link>
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
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
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
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="mb-2">{icon}</div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" size="sm">
            <a href={link}>Learn More</a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Index;
