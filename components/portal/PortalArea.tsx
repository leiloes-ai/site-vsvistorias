import React, { useState, useEffect } from 'react';
import { useEditableContent } from '../../contexts/EditableContentContext';
import CTAButton from '../CTAButton';

interface PortalAreaProps {
    onExit: () => void;
}

type ViewType = 'dashboard' | 'app-vistoria' | 'ai-studio-project' | 'app-financeiro';

const PortalArea: React.FC<PortalAreaProps> = ({ onExit }) => {
    const { content } = useEditableContent();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [currentView, setCurrentView] = useState<ViewType>('dashboard');
    const [iframeLoading, setIframeLoading] = useState(true);

    // URL do seu outro projeto - você pode alterar esta URL conforme necessário
    const EXTERNAL_PROJECT_URL = "https://www.google.com/search?q=google+ai+studio&igu=1"; 

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoggedIn(true);
            setIsLoading(false);
        }, 1000);
    };

    const handleViewChange = (view: ViewType) => {
        setIframeLoading(true);
        setCurrentView(view);
    };

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-950">
                <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-8">
                    <div className="flex flex-col items-center mb-8">
                        {content?.logo && (
                            <img src={content.logo.src} alt="Logo" className="h-16 w-auto mb-4" />
                        )}
                        <h2 className="text-2xl font-bold text-white tracking-tight">Portal Interno</h2>
                        <p className="text-gray-500 text-xs mt-1">V.S Vistorias & Sistemas Integrados</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Acesso</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                placeholder="E-mail ou Usuário"
                                value={loginData.email}
                                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Senha</label>
                            <input 
                                type="password" 
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            />
                        </div>
                        <CTAButton 
                            type="submit" 
                            onClick={() => {}} 
                            className="w-full py-4 text-sm uppercase tracking-widest"
                        >
                            {isLoading ? 'Conectando...' : 'Entrar no Sistema'}
                        </CTAButton>
                    </form>
                    
                    <button onClick={onExit} className="mt-8 w-full text-slate-600 hover:text-red-500 text-xs transition-colors font-medium">
                        ← Sair e voltar ao site
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            {/* Sidebar Otimizada */}
            <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800/50">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl">VS</div>
                        <div>
                            <h2 className="text-white font-bold leading-none">V.S Vistorias</h2>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Enterprise Hub</span>
                        </div>
                    </div>
                </div>
                
                <nav className="flex-grow px-4 space-y-1">
                    <p className="text-[10px] font-bold text-gray-600 uppercase px-4 py-2 tracking-[0.2em]">Dashboard</p>
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>} 
                        label="Início" 
                        active={currentView === 'dashboard'} 
                        onClick={() => handleViewChange('dashboard')}
                    />
                    
                    <p className="text-[10px] font-bold text-gray-600 uppercase px-4 py-2 pt-6 tracking-[0.2em]">Integrações</p>
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>} 
                        label="Projeto AI Studio" 
                        active={currentView === 'ai-studio-project'}
                        onClick={() => handleViewChange('ai-studio-project')}
                    />
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>} 
                        label="Vistoria Digital" 
                        active={currentView === 'app-vistoria'}
                        onClick={() => handleViewChange('app-vistoria')}
                    />
                </nav>

                <div className="p-4 bg-slate-900/50 m-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                            {loginData.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs text-white font-bold truncate">{loginData.email}</p>
                            <p className="text-[10px] text-gray-500">Colaborador</p>
                        </div>
                    </div>
                    <button onClick={() => setIsLoggedIn(false)} className="w-full text-left text-[10px] text-red-500 font-bold uppercase hover:bg-red-500/10 p-2 rounded transition-all">
                        Encerrar Sessão
                    </button>
                </div>
            </aside>

            {/* Conteúdo Principal */}
            <main className="flex-grow flex flex-col h-screen overflow-hidden relative">
                <header className="h-20 bg-slate-900 border-b border-slate-800/50 flex items-center justify-between px-10 flex-shrink-0">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            {currentView === 'dashboard' && 'Painel Geral'}
                            {currentView === 'ai-studio-project' && 'Sistema AI Studio Integrado'}
                            {currentView === 'app-vistoria' && 'Vistoria Digital'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                             <span className="text-[10px] text-gray-400 font-bold uppercase">Sistemas Online</span>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        </button>
                    </div>
                </header>

                <div className="flex-grow relative">
                    {currentView === 'dashboard' && (
                        <div className="p-10 space-y-10 h-full overflow-y-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard label="Vistorias Totais" value="4.821" icon="🚗" color="bg-red-600" />
                                <StatCard label="Aguardando" value="12" icon="⏳" color="bg-slate-800" />
                                <StatCard label="Finalizados" value="4.809" icon="✅" color="bg-slate-800" />
                                <StatCard label="Suporte" value="Ativo" icon="🎧" color="bg-slate-800" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-white">Atividades Recentes</h3>
                                        <button className="text-xs font-bold text-red-500 uppercase">Exportar PDF</button>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800/30">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-lg">📄</div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Laudo Cautelar #0023{i}</p>
                                                        <p className="text-[10px] text-gray-500">Toyota Corolla - ABC-1234</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold text-green-500 uppercase">Finalizado</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-red-600 p-8 rounded-2xl shadow-xl shadow-red-900/20">
                                        <h3 className="text-white font-bold text-xl mb-2">Novo Agendamento</h3>
                                        <p className="text-red-100 text-sm mb-6">Inicie uma nova vistoria diretamente do seu painel.</p>
                                        <button className="w-full bg-white text-red-600 font-bold py-3 rounded-xl shadow-lg hover:bg-gray-100 transition-all">
                                            Iniciar Agora
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Área de Integração do Projeto Externo (AI Studio) */}
                    {currentView === 'ai-studio-project' && (
                        <div className="w-full h-full bg-slate-950 flex flex-col">
                            {iframeLoading && (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                                    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p className="text-white font-bold animate-pulse">Sincronizando Projeto AI Studio...</p>
                                </div>
                            )}
                            <iframe 
                                src={EXTERNAL_PROJECT_URL} 
                                className="w-full h-full border-none shadow-inner"
                                title="Integração Projeto Externo"
                                onLoad={() => setIframeLoading(false)}
                            />
                        </div>
                    )}

                    {/* Placeholder para outros apps */}
                    {currentView === 'app-vistoria' && (
                        <div className="flex flex-col items-center justify-center h-full p-20 text-center">
                            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-slate-800">🏗️</div>
                            <h2 className="text-2xl font-bold text-white mb-2">Módulo em Desenvolvimento</h2>
                            <p className="text-gray-500 max-w-sm">Esta funcionalidade está sendo preparada para integrar o seu sistema de checklist digital nativo.</p>
                            <button onClick={() => setCurrentView('dashboard')} className="mt-8 text-red-500 font-bold uppercase text-xs">Voltar ao início</button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${active ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-gray-500 hover:text-white hover:bg-slate-800'}`}
    >
        <span className={active ? 'text-white' : 'text-gray-500'}>{icon}</span>
        <span className={`text-sm font-bold ${active ? 'text-white' : 'text-gray-400'}`}>{label}</span>
    </button>
);

const StatCard = ({ label, value, icon, color }: { label: string, value: string, icon: string, color: string }) => (
    <div className="bg-slate-900/50 border border-slate-800/50 p-6 rounded-2xl flex items-center gap-6">
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-2xl shadow-lg`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
            <p className="text-2xl font-bold text-white mt-1 leading-none">{value}</p>
        </div>
    </div>
);

export default PortalArea;