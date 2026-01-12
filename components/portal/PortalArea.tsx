import React, { useState } from 'react';
import { useEditableContent } from '../../contexts/EditableContentContext';
import CTAButton from '../CTAButton';
import IntegratedApp from './IntegratedApp';

interface PortalAreaProps {
    onExit: () => void;
}

type ViewType = 'dashboard' | 'app-vistoria' | 'ai-studio-project';

const PortalArea: React.FC<PortalAreaProps> = ({ onExit }) => {
    const { content } = useEditableContent();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [currentView, setCurrentView] = useState<ViewType>('dashboard');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
        }, 800);
    };

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950 font-sans">
                <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-8">
                    <div className="flex flex-col items-center mb-10">
                        {content?.logo && (
                            <img src={content.logo.src} alt="Logo" className="h-20 w-auto mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.2)]" />
                        )}
                        <h2 className="text-2xl font-bold text-white tracking-tight">Portal V.S Vistorias</h2>
                        <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-black">Acesso Restrito</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Identificação</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder-gray-600 shadow-inner"
                                placeholder="E-mail ou Usuário"
                                value={loginData.email}
                                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Senha</label>
                            <input 
                                type="password" 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all placeholder-gray-600 shadow-inner"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            />
                        </div>
                        <CTAButton 
                            type="submit" 
                            onClick={() => {}} 
                            className="w-full py-5 text-sm uppercase tracking-widest shadow-2xl shadow-red-900/40 rounded-2xl"
                        >
                            {isLoading ? 'Autenticando...' : 'Entrar no Sistema'}
                        </CTAButton>
                    </form>
                    
                    <button onClick={onExit} className="mt-10 w-full text-slate-500 hover:text-red-500 text-xs transition-colors font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                        Voltar ao Site Institucional
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans text-gray-200">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800/50 flex-shrink-0">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-red-900/20">VS</div>
                        <div>
                            <h2 className="text-white font-bold leading-none text-sm">V.S Vistorias</h2>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Enterprise Hub</span>
                        </div>
                    </div>
                </div>
                
                <nav className="flex-grow px-4 space-y-1">
                    <p className="text-[10px] font-black text-gray-600 uppercase px-4 py-3 tracking-[0.2em]">Dashboard</p>
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>} 
                        label="Painel de Controle" 
                        active={currentView === 'dashboard'} 
                        onClick={() => setCurrentView('dashboard')}
                    />
                    
                    <p className="text-[10px] font-black text-gray-600 uppercase px-4 py-3 pt-8 tracking-[0.2em]">Sistemas</p>
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>} 
                        label="Meu App Integrado" 
                        active={currentView === 'ai-studio-project'}
                        onClick={() => setCurrentView('ai-studio-project')}
                    />
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>} 
                        label="Vistoria Digital" 
                        active={currentView === 'app-vistoria'}
                        onClick={() => setCurrentView('app-vistoria')}
                    />
                </nav>

                <div className="p-4 space-y-2">
                    <button 
                        onClick={onExit}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-gray-500 hover:text-white hover:bg-slate-800 transition-all font-bold text-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                        Voltar ao Site
                    </button>
                    <div className="bg-slate-800/50 rounded-3xl p-5 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                                {loginData.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs text-white font-bold truncate">{loginData.email || 'Admin'}</p>
                                <p className="text-[10px] text-gray-500 font-black uppercase">Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsLoggedIn(false)} className="w-full text-center text-[10px] text-red-500 font-black uppercase hover:bg-red-500 hover:text-white py-3 rounded-xl border border-red-500/20 transition-all">
                            Sair do Painel
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-slate-900 border-b border-slate-800/50 flex items-center justify-between px-10 flex-shrink-0 z-10">
                    <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                        {currentView === 'dashboard' && 'Visão Estratégica'}
                        {currentView === 'ai-studio-project' && 'Sistema Integrado'}
                        {currentView === 'app-vistoria' && 'Checklist Digital'}
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center bg-slate-800 rounded-full px-4 py-1.5 border border-slate-700">
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sincronizado: Agora</span>
                        </div>
                        <button className="p-2.5 text-gray-500 hover:text-white transition-colors bg-slate-800 rounded-xl border border-slate-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        </button>
                    </div>
                </header>

                <div className="flex-grow relative overflow-hidden">
                    {currentView === 'dashboard' && (
                        <div className="p-10 space-y-10 h-full overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard label="Vistorias Realizadas" value="4.821" icon="🚗" trend="+12.5%" />
                                <StatCard label="SLA de Entrega" value="98.4%" icon="⚡" trend="Meta Atingida" />
                                <StatCard label="Laudos Pendentes" value="08" icon="📄" trend="-2 hoje" />
                                <StatCard label="Status API" value="100%" icon="🌐" color="text-green-500" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-slate-900 border border-slate-800/50 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
                                    </div>
                                    <h3 className="font-bold text-white mb-8 text-xl flex items-center gap-3">
                                        Monitoramento de Operações
                                        <span className="text-[10px] font-black bg-slate-800 px-3 py-1 rounded-full text-gray-500">REAL-TIME</span>
                                    </h3>
                                    <div className="space-y-5">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="flex items-center justify-between p-6 bg-slate-950/50 rounded-3xl border border-slate-800/30 hover:border-red-600/50 transition-all group cursor-default">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">📋</div>
                                                    <div>
                                                        <p className="text-sm font-black text-white group-hover:text-red-500 transition-colors tracking-tight">Vistoria Cautelar Premium #902{i}</p>
                                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.1em]">VW Golf GTI - PRV-442{i} • Goiânia</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-gray-400 font-bold mb-1.5">há {i * 12} min</p>
                                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-wider border border-green-500/20">Aprovado</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-red-600 to-red-800 p-10 rounded-[2.5rem] shadow-2xl shadow-red-900/40 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 bg-white/20 rounded-2xl mb-6 flex items-center justify-center text-2xl">✨</div>
                                            <h3 className="text-white font-black text-2xl mb-3">Novo Checklist</h3>
                                            <p className="text-red-100 text-sm mb-10 leading-relaxed font-medium">Inicie uma inspeção digital agora com sincronização automática na nuvem.</p>
                                            <button className="w-full bg-white text-red-700 font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest">
                                                Abrir Câmera
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800/50 p-10 rounded-[2.5rem] relative group">
                                        <h4 className="text-white font-bold mb-4 text-lg">Central de Inteligência</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-8 font-medium">O seu aplicativo integrado do AI Studio processa dados em tempo real para gerar relatórios preditivos.</p>
                                        <button 
                                            onClick={() => setCurrentView('ai-studio-project')}
                                            className="text-red-500 font-black text-[10px] uppercase tracking-[0.2em] hover:text-red-400 transition-colors flex items-center gap-2 group-hover:gap-3 transition-all"
                                        >
                                            Ver Aplicação AI
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* RENDERIZAÇÃO DO APP INTEGRADO */}
                    {currentView === 'ai-studio-project' && (
                        <div className="w-full h-full bg-slate-950">
                            <IntegratedApp />
                        </div>
                    )}

                    {/* Placeholder para outros apps */}
                    {currentView === 'app-vistoria' && (
                        <div className="flex flex-col items-center justify-center h-full p-20 text-center bg-slate-950">
                            <div className="w-28 h-28 bg-slate-900 rounded-[2rem] flex items-center justify-center text-5xl mb-10 border border-slate-800 shadow-2xl relative">
                                🛠️
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full border-4 border-slate-950"></span>
                            </div>
                            <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Módulo de Checklist</h2>
                            <p className="text-gray-500 max-w-sm mb-12 leading-relaxed font-medium">A interface de vistoria nativa está em fase final de homologação técnica.</p>
                            <button onClick={() => setCurrentView('dashboard')} className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all border border-slate-700">
                                Voltar ao Início
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
            `}</style>
        </div>
    );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-5 py-4.5 rounded-[1.25rem] transition-all duration-300 group ${active ? 'bg-red-600 text-white shadow-2xl shadow-red-900/40 translate-x-1' : 'text-gray-500 hover:text-white hover:bg-slate-800/50'}`}
    >
        <span className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-red-500 transition-colors'}`}>{icon}</span>
        <span className={`text-sm font-black tracking-tight ${active ? 'text-white' : 'text-gray-400'}`}>{label}</span>
    </button>
);

const StatCard = ({ label, value, icon, trend, color = "text-white" }: { label: string, value: string, icon: string, trend?: string, color?: string }) => (
    <div className="bg-slate-900 border border-slate-800/50 p-8 rounded-[2rem] hover:bg-slate-800/40 transition-all duration-500 group relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shadow-inner">
                {icon}
            </div>
            {trend && <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-tighter border border-green-500/10">{trend}</span>}
        </div>
        <div className="relative z-10">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{label}</p>
            <p className={`text-3xl font-black ${color} tracking-tighter`}>{value}</p>
        </div>
    </div>
);

export default PortalArea;