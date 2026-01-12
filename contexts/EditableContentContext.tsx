import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { initialContent } from '../assets/initialContent';

// Usamos um caminho relativo para maior compatibilidade.
// No servidor (Hostinger), este arquivo deve estar na mesma pasta que o index.html.
const CONTENT_FILE_URL = 'content.json';

interface EditableContentContextType {
    isEditMode: boolean;
    content: typeof initialContent | null;
    setContent: React.Dispatch<React.SetStateAction<typeof initialContent | null>>;
    loading: boolean;
}

const EditableContentContext = createContext<EditableContentContextType | undefined>(undefined);

export const useEditableContent = () => {
    const context = useContext(EditableContentContext);
    if (!context) {
        throw new Error('useEditableContent must be used within an EditableContentProvider');
    }
    return context;
};

export const EditableContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [content, setContent] = useState<typeof initialContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('edit') === 'true') {
            setIsEditMode(true);
        }

        const loadContent = async () => {
            const cacheBuster = `v=${new Date().getTime()}`;
            const fetchOptions: RequestInit = {
                cache: 'no-store',
                headers: {
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-store, no-cache, must-revalidate',
                },
            };

            try {
                // Primeira tentativa: Raiz do servidor (onde index.html reside)
                let response = await fetch(`${CONTENT_FILE_URL}?${cacheBuster}`, fetchOptions);

                if (!response.ok) {
                    // Segunda tentativa: Pasta public (comum em ambiente de desenvolvimento local)
                    response = await fetch(`public/${CONTENT_FILE_URL}?${cacheBuster}`, fetchOptions);
                }

                if (response.ok) {
                    const data = await response.json();
                    setContent(data);
                } else {
                    console.warn("Arquivo content.json não encontrado nas rotas esperadas. Usando conteúdo inicial.");
                    setContent(initialContent);
                }
            } catch (error) {
                console.warn("Erro ao tentar carregar content.json, usando padrão do sistema.", error);
                setContent(initialContent);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    return (
        <EditableContentContext.Provider value={{ isEditMode, content, setContent, loading }}>
            {children}
        </EditableContentContext.Provider>
    );
};