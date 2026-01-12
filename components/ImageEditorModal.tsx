import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';

interface ImageEditorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (imageDataUrl: string) => void;
    initialImageSrc: string;
}

// Função auxiliar para criar o recorte centrado
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}


const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ isOpen, onClose, onSave, initialImageSrc }) => {
    const [imgSrc, setImgSrc] = useState(initialImageSrc);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop>();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const aspect = 16 / 9;

    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
    }

    useEffect(() => {
        if (completedCrop && previewCanvasRef.current && imgRef.current) {
            const image = imgRef.current;
            const canvas = previewCanvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const pixelRatio = window.devicePixelRatio;

            canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
            canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

            ctx.scale(pixelRatio, pixelRatio);
            ctx.imageSmoothingQuality = 'high';

            const cropX = completedCrop.x * scaleX;
            const cropY = completedCrop.y * scaleY;

            const centerX = image.naturalWidth / 2;
            const centerY = image.naturalHeight / 2;

            // Limpar o canvas antes de desenhar para garantir transparência
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(-cropX, -cropY);
            ctx.translate(centerX, centerY);
            ctx.rotate((rotate * Math.PI) / 180);
            ctx.scale(scale, scale);
            ctx.translate(-centerX, -centerY);
            ctx.drawImage(
                image,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
            );

            ctx.restore();
        }
    }, [completedCrop, scale, rotate]);
    
    const handleSaveClick = () => {
        if (!previewCanvasRef.current) {
            return;
        }
        // Alterado para image/png para suportar transparência
        const dataUrl = previewCanvasRef.current.toDataURL('image/png');
        onSave(dataUrl);
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.size > 4 * 1024 * 1024) {
                alert('A imagem é muito grande! Por favor, escolha um arquivo menor que 4MB.');
                return;
            }

            setCrop(undefined); 
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
            reader.readAsDataURL(file);
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
            <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">Editar Imagem</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                
                <div className="p-6 flex-grow overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 space-y-6">
                             <div>
                                <input type="file" accept="image/*" onChange={handleFileSelect} ref={fileInputRef} className="hidden" />
                                <button onClick={() => fileInputRef.current?.click()} className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                                    Carregar Nova Imagem
                                </button>
                                <p className="text-xs text-gray-400 mt-2 text-center">Para logos, use imagens PNG com fundo transparente.</p>
                             </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Zoom</label>
                                <input
                                    type="range"
                                    value={scale}
                                    min="0.1"
                                    max="2"
                                    step="0.01"
                                    aria-labelledby="scale"
                                    onChange={(e) => setScale(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Girar: {rotate}°</label>
                                <input
                                    type="range"
                                    value={rotate}
                                    min="-180"
                                    max="180"
                                    aria-labelledby="rotate"
                                    onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                             <div className="hidden md:block">
                                <h3 className="text-lg font-bold text-white mb-2">Pré-visualização</h3>
                                <div className="bg-slate-900 rounded-lg p-4 flex items-center justify-center border border-slate-700 pattern-grid">
                                    <canvas
                                        ref={previewCanvasRef}
                                        className="w-full"
                                        style={{
                                            objectFit: 'contain',
                                            width: completedCrop ? `${completedCrop.width}px` : 'auto',
                                            height: completedCrop ? `${completedCrop.height}px` : 'auto',
                                            maxWidth: '100%',
                                            maxHeight: '200px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 bg-slate-900 p-2 rounded-lg flex items-center justify-center">
                           {imgSrc ? (
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    aspect={aspect}
                                    minHeight={100}
                                >
                                    <img
                                        ref={imgRef}
                                        alt="Crop me"
                                        src={imgSrc}
                                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                        onLoad={onImageLoad}
                                    />
                                </ReactCrop>
                            ) : (
                                <div className="text-gray-400">Por favor, carregue uma imagem.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center p-4 border-t border-slate-700 space-x-4">
                    <button onClick={onClose} className="bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors">Cancelar</button>
                    <button onClick={handleSaveClick} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Salvar Alterações</button>
                </div>
            </div>
            <style>{`
                .pattern-grid {
                    background-image: radial-gradient(#334155 1px, transparent 1px);
                    background-size: 10px 10px;
                }
            `}</style>
        </div>
    );
};

export default ImageEditorModal;