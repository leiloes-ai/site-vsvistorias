import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '5562995543173';
  const message = encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços de vistoria.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-40 animate-pulse-whatsapp"
      aria-label="Contact us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.433-9.89-9.889-9.89-5.452 0-9.887 4.434-9.889 9.89.002 2.024.603 3.965 1.742 5.688l.278.473-.951 3.465 3.53-1.011.451.276zm9.356-5.807c-.196-.1-1.157-.568-1.338-.63-.182-.062-.315-.1-.449.1-.133.197-.507.63-.624.757-.117.127-.233.148-.43.049-.197-.1-.836-.307-1.594-.984-.577-.521-.968-.924-1.084-1.084-.117-.16-.012-.244.088-.344.091-.091.197-.232.296-.346.1-.114.133-.197.197-.331.065-.134.034-.248-.015-.347-.05-.1-.449-1.076-.616-1.475-.164-.389-.328-.335-.449-.34-.117-.005-.248-.005-.38-.005-.133 0-.347.049-.528.248-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.392 2.132 3.38 2.992.472.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.157-.473 1.324-.92.164-.447.164-.83.117-.92-.048-.09-.182-.148-.38-.248z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;