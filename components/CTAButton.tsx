import React from 'react';

interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default CTAButton;
