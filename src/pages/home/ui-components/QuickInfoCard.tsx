
import React from 'react';
import { motion } from 'framer-motion';

interface QuickInfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export const QuickInfoCard: React.FC<QuickInfoCardProps> = ({ icon, title, description, delay }) => {
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
