import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse bg-gray-200 rounded-md", className)}
      {...props}
    />
  );
};

export default Skeleton;
