import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface EditModeContextType {
    isEditMode: boolean;
}

const EditModeContext = createContext<EditModeContextType>({
    isEditMode: false,
});

export const useEditMode = () => useContext(EditModeContext);

interface EditModeProviderProps {
    children: ReactNode;
}

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('edit') === 'true') {
            setIsEditMode(true);
            console.log("Modo de Edição Ativado. Adicione '?edit=true' na sua URL para habilitar as funcionalidades de edição.");
        }
    }, []);

    return (
        <EditModeContext.Provider value={{ isEditMode }}>
            {children}
        </EditModeContext.Provider>
    );
};
