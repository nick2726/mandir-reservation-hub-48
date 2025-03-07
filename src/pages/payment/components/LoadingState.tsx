
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-muted-foreground">Loading booking details...</p>
      </div>
    </div>
  );
};

export default LoadingState;
