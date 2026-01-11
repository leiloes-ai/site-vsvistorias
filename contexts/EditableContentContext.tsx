import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { initialContent } from '../assets/initialContent';

// This is the "database" of the website.
// To publish changes, the user will download the updated state and replace this file on their server.
const CONTENT_FILE_URL = '/content.json';

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

        fetch(CONTENT_FILE_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setContent(data);
            })
            .catch(error => {
                console.error("Failed to load content from server, falling back to initial content.", error);
                setContent(initialContent);
            })
            .finally(() => {
                setLoading(false);
            });
            
    }, []);

    return (
        <EditableContentContext.Provider value={{ isEditMode, content, setContent, loading }}>
            {children}
        </EditableContentContext.Provider>
    );
};
