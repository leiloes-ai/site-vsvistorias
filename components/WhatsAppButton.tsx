import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5562995543173" // Replace with actual WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-40"
      aria-label="Contact us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12 2.04C6.48 2.04 2 6.52 2 12.06c0 1.68.42 3.3 1.21 4.74L2 22l5.3-1.38c1.39.71 2.94 1.12 4.56 1.12h.14c5.52 0 10-4.48 10-10.02S17.66 2.04 12 2.04zm4.84 11.28c-.28.5-1.03.92-1.4.98-0.37.06-0.89.04-1.37-.15-0.48-.19-1.12-.4-1.7-0.78-1.4-0.9-2.32-2.1-2.48-2.38s-.16-.38 0-.58.26-.3.38-.42.22-.2.33-.34.11-.2.05-.36-.48-1.15-0.66-1.56c-.18-.41-.36-.35-.5-.35s-.28-.02-.42-.02-0.38.06-.58.3c-.2.24-.76.74-.98 1.78s-.22 2.04.06 2.74c.28.7 1.24 1.8 2.78 3.2s2.82 2.1 3.28 2.26c.46.16 0.88.13 1.22.08.34-.05.98-.4 1.12-.78s.14-.72.1-0.9c-.04-.18-.14-.28-.28-.4z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;