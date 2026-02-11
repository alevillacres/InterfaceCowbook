import AreaDropzone from "./AreaDropzone.tsx";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function VideoInterface(props: { isActive: boolean }) {
    const [videos, setVideos] = useState<(File | null)[]>([null, null, null, null]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    if (props.isActive) {
        return null;
    }


    function updateVideos(index: number, video: File) {
        setVideos(prev => prev.map((item, i) => (i === index ? video : item)));
    }

    const handleAnalysisVideo= async() => {
        if (!videos.length) {
            alert("No videos found.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        const videoUrls = videos.map(v => v ? URL.createObjectURL(v) : null);

        videos.forEach((video, i) => {
            if(video !== null) {
                formData.append('videos', video);
                formData.append('indices', i.toString());
            }
        })
        try{
            const response = await axios.post('http://localhost:8000/', formData)
            console.log(`stato della risposta: ${response.data.status}`);
            console.log("numero Dati ricevuti dal server: ", response.data.results.length);
            navigate('/results-video', {
                state: {
                    analysisResult: response.data.results,
                    videoSources: videoUrls
                }
            });

        }catch(error: unknown){
            console.error('connessione al server di inferenza non completata.');
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-6 animate-fade-in">
            {/* Header della sezione */}
            <div className="text-center">
                <h4 className="text-lg font-semibold text-slate-700">Caricamento Sorgenti Video</h4>
                <p className="text-sm text-slate-500">Carica fino a 4 angolazioni della stalla per l'analisi</p>
            </div>

            {/* GRIGLIA 2x2: La parte più importante visivamente */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {videos.map((video, index) => (
                    <div key={index} className="relative">

                        <span className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                            CAM {index + 1}
                        </span>

                        <div className="h-48 w-full">
                            <AreaDropzone
                                currentVideo={video}
                                addVideoSelected={(f: File) => updateVideos(index, f)}
                            />
                        </div>
                    </div>
                ))}
            </div>


            <div className="flex justify-center mt-4">
                <button
                    onClick={handleAnalysisVideo}
                    disabled={loading || !videos.some(v => v !== null)}
                    className={`
                        w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all transform active:scale-95
                        ${loading || !videos.some(v => v !== null)
                        ? 'bg-slate-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30'}
                    `}

                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analisi in corso...
                        </span>
                    ) : (
                        "Avvia Analisi Multi-Camera"
                    )}
                </button>
            </div>
        </div>
    );
}