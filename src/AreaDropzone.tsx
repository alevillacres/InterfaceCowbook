import {useCallback} from 'react';
import { useDropzone } from 'react-dropzone'; // Assumo tu usi questa libreria

interface Props {
    currentVideo: File | null,
    addVideoSelected: (video: File) => void;
}

export function AreaDropzone({ currentVideo, addVideoSelected }: Props) {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Appena l'utente lascia i file, li mandiamo su ad VideoInterface.tsx
        addVideoSelected( acceptedFiles[0]);
    }, [addVideoSelected]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.avi', '.mov']
        },
        maxFiles: 1,
        multiple: false,
    });
    const getBorderColor = () => {
        if (isDragActive) return "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200";
        if (currentVideo) return "border-emerald-500 bg-emerald-50";
        return "border-slate-300 hover:border-indigo-400 hover:bg-slate-50";
    };
    return (
        <div {...getRootProps()} className={`
                h-full w-full rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out cursor-pointer
                flex flex-col items-center justify-center p-4 text-center overflow-hidden
                ${getBorderColor()}
            `}>
            <input {...getInputProps()} />
            {currentVideo ? (
                <div className="flex flex-col items-center animate-fade-in">
                    {/* Icona File Video Successo */}
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <p className="text-sm font-semibold text-slate-700 truncate max-w-[200px]">
                        {currentVideo.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                        {(currentVideo.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <span className="text-xs text-indigo-500 mt-2 hover:underline">
                        Clicca per cambiare
                    </span>
                </div>
            ) : (
                <div className="flex flex-col items-center text-slate-400">
                    {/* Icona Upload/Cloud */}
                    {isDragActive ? (
                        <svg className="w-10 h-10 mb-3 text-indigo-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                        </svg>
                    ) : (
                        <svg className="w-10 h-10 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    )}

                    <p className="text-sm font-medium text-slate-600">
                        {isDragActive ? "Rilascia il video qui" : "Carica Video"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                        MP4
                    </p>
                </div>
            )}
        </div>

    );
};

export default AreaDropzone;