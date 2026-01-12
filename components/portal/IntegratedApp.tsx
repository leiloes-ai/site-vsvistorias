import React from 'react';

const IntegratedApp: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-20 text-center bg-slate-950">
            <div className="w-28 h-28 bg-slate-900 rounded-[2rem] flex items-center justify-center text-5xl mb-10 border border-slate-800 shadow-2xl relative">
                🧩
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-slate-950"></span>
            </div>
            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Sistema Integrado</h2>
            <p className="text-gray-500 max-w-sm mb-12 leading-relaxed font-medium">
                Esta é a área designada para a sua aplicação customizada. A integração futura será exibida aqui.
            </p>
        </div>
    );
};

export default IntegratedApp;