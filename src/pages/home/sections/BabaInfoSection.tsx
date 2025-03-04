
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const BabaInfoSection: React.FC = () => {
  return (
    <section className="py-16 my-12">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <Badge className="mb-4">Sacred Legacy</Badge>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">The Divine Abode of Lord Shiva</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">Discover the rich heritage and spiritual significance of Baba Baidyanath Dham, one of the twelve Jyotirlingas of Lord Shiva</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d" 
              alt="Baba Baidyanath Temple" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Ancient Temple of Healing</h3>
            <p className="text-muted-foreground">
              Baidyanath Dham, also known as Baba Dham, is revered as one of the most sacred abodes of Lord Shiva. The name 'Baidyanath' translates to 'The Lord of Physicians,' signifying Lord Shiva's healing powers. Located in Deoghar, Jharkhand, this temple houses one of the 12 Jyotirlingas and is a crucial pilgrimage site for Hindus.
            </p>
            <p className="text-muted-foreground">
              According to mythology, demon king Ravana performed intense penance and offered his ten heads one after another to Lord Shiva. Pleased with his devotion, Lord Shiva restored Ravana's heads and bestowed upon him the divine Shivalinga, which later became established at this holy site.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden h-full border border-amber-200/20 hover:shadow-md transition-all hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1600000000000-000000000000" 
                alt="Shivling at Baba Baidyanath Temple" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1572767162983-1c2ec8721a14";
                }}
              />
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">The Sacred Shivling</h4>
                <p className="text-muted-foreground">
                  The main sanctum houses an ancient Jyotirlinga. Unlike other Shivlings, the Baidyanath Jyotirlinga is not very high, standing at about 5 feet tall. It embodies the manifestation of Lord Shiva in his cosmic light form.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden h-full border border-amber-200/20 hover:shadow-md transition-all hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1600000000000-000000000001" 
                alt="Temple Architecture" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1621507492972-0c4a7a33debd";
                }}
              />
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">Temple Architecture</h4>
                <p className="text-muted-foreground">
                  The temple complex features 22 temples dedicated to various deities. The main temple structure is built in the Nagara style with intricate carvings and sculptures depicting scenes from Hindu mythology and the various forms of Lord Shiva.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden h-full border border-amber-200/20 hover:shadow-md transition-all hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1600000000000-000000000002" 
                alt="Kanwar Yatra to Baba Dham" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088";
                }}
              />
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-2">Kanwar Yatra</h4>
                <p className="text-muted-foreground">
                  During the holy month of Shravan (July-August), millions of devotees undertake the Kanwar Yatra, carrying sacred water from the Ganges to offer to the Shivling at Baba Baidyanath Dham, walking hundreds of kilometers in a display of devotion.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-primary/5 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Spiritual Significance</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-2"></span>
                  <p className="text-muted-foreground">It is believed that sincere prayers offered at this Jyotirlinga can cure ailments and fulfill wishes.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-2"></span>
                  <p className="text-muted-foreground">The temple is mentioned in ancient texts including the Shiva Purana and is considered one of the most powerful manifestations of Lord Shiva.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-2"></span>
                  <p className="text-muted-foreground">According to legend, offering prayers at Baidyanath Dham frees one from the cycle of birth and death, granting moksha (liberation).</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-amber-500 h-2 w-2 rounded-full mt-2"></span>
                  <p className="text-muted-foreground">The water offered to the Shivling is believed to have medicinal properties, reflecting Lord Shiva's aspect as the divine healer.</p>
                </li>
              </ul>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1600000000000-000000000003" 
                alt="Divine Aura of Baba Baidyanath" 
                className="w-full h-auto rounded-xl shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1643822264111-c924e213ed33";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end">
                <p className="text-white p-6 font-medium">The divine aura of this sacred site attracts millions of devotees yearly seeking blessings and spiritual fulfillment.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BabaInfoSection;
