import React from 'react';

// FIX: Add the `disabled` prop to the component's interface to allow it to be passed from parent components.
interface CTAButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ onClick, children, className = '', type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      // FIX: Apply conditional styling to visually indicate when the button is disabled and prevent hover effects.
      className={`bg-gradient-to-br from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:shadow-lg hover:shadow-red-500/30 hover:brightness-110 hover:-translate-y-0.5'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default CTAButton;
