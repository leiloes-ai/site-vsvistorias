import React from 'react';
import { useEditableContent } from '../contexts/EditableContentContext';

const AdminPanel: React.FC = () => {
    const { content } = useEditableContent();

    const handlePublish = () => {
        if (!content) {
            alert('Nenhum conteúdo para publicar.');
            return;
        }

        const contentString = JSON.stringify(content, null, 2);
        const blob = new Blob([contentString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'content.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('O arquivo content.json foi baixado!\n\nAgora, acesse seu hPanel na Hostinger, abra o Gerenciador de Arquivos e envie este arquivo para a pasta `public_html`, substituindo o antigo, para publicar as alterações.');
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 bg-gray-900 text-white p-4 rounded-lg shadow-2xl border border-red-500">
            <h3 className="font-bold text-lg mb-2">Modo de Edição</h3>
            <p className="text-sm text-gray-300 mb-4">Suas alterações são salvas aqui. Clique em publicar para baixar o arquivo de conteúdo atualizado.</p>
            <button
                onClick={handlePublish}
                className="w-full bg-red-600 font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
                Publicar Alterações
            </button>
        </div>
    );
};

export default AdminPanel;