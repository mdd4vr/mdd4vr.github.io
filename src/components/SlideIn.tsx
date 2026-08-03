import React from 'react';

interface SlideInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade-scale';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

