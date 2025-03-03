
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pass } from '@/hooks/usePassData';
import PassCard from './PassCard';

interface PassesListProps {
  passes: Pass[];
}

const PassesList: React.FC<PassesListProps> = ({ passes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {passes.map((pass, index) => (
          <motion.div
            key={pass.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={pass.status === 'sold_out' ? 'opacity-70' : ''}
          >
            <PassCard pass={pass} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PassesList;
