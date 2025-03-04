
import React from 'react';
import { motion } from 'framer-motion';

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

export default FeatureCard;
