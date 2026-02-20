import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { VideoPlayerWithBox } from "./VideoPlayerWithBox";

// --- INTERFACCE ---

interface LabelInfo {
    class_id: number;
    id: number;
}

interface DetectionData {
    xyxy: [number, number, number, number][];
    centroids: [number, number][];
    projected_centroids: [number, number, number][];
}

interface Frame {
    frame_id: number;
    detections: DetectionData;
    labels: LabelInfo[];
}

interface TrackingData {
    frames: Frame[];
}

interface ResponseData {
    filename: string;
    is_merged: boolean;
    cam_id: number | null;

    data: TrackingData;
}

interface ProcessedCamera extends ResponseData {
    videoUrl: string;
}

export function ResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Estrazione dati "puri" dallo state
    const rawAnalysisResult = location.state?.analysisResult;
    const rawVideoSources = location.state?.videoSources;

    // 2. Trasformazione dati con useMemo
    const camerasData = useMemo(() => {
        const resultsArray = (rawAnalysisResult as ResponseData[]) || [];
        const videoSources = (rawVideoSources as (string | null)[]) || [];

        if (resultsArray.length === 0) return [];

        const CAMERA_MAPPING = [1, 4, 6, 8];

        return resultsArray
            .filter((item) => !item.is_merged && item.cam_id !== null)
            .map((camera) => {
                const validCamId = camera.cam_id as number;
                const videoIndex = CAMERA_MAPPING.indexOf(validCamId);

                return {
                    ...camera,
                    videoUrl: videoSources[videoIndex] || "",
                } as ProcessedCamera;
            });
    }, [rawAnalysisResult, rawVideoSources]);

    // 3. FIX: Controllo se ci sono dati usando rawAnalysisResult invece di resultsArray
    if (!rawAnalysisResult || (rawAnalysisResult as ResponseData[]).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <p className="text-slate-500 mb-4 font-medium">Nessun dato di analisi disponibile.</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
                >
                    Torna alla Home
                </button>
            </div>
        );
    }

    return (
        <div className="p-5 bg-gray-50 min-h-screen animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">Analisi Video Completata</h2>

            {/* Griglia Video 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {camerasData.map((cam) => (
                    <div key={cam.cam_id} className="group shadow-sm hover:shadow-xl rounded-xl p-3 bg-white border border-slate-200 transition-all duration-300">
                        <div className="overflow-hidden rounded-lg bg-slate-100">
                            <VideoPlayerWithBox
                                videoUrl={cam.videoUrl}
                                trackingData={cam.data}
                                cameraName={`Camera ${cam.cam_id}`}
                            />
                        </div>
                        <div className="p-3 text-sm flex justify-between items-center">
                            <div className="truncate mr-4">
                                <p className="font-bold text-slate-700 truncate">{cam.filename}</p>
                                <p className="text-xs text-slate-400">{cam.data.frames.length} frames processati</p>
                            </div>
                            <span className="shrink-0 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black border border-slate-200">
                                CAM {cam.cam_id}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="my-10 border-slate-200" />

            {/* Sezione Console JSON Debug */}
            <div className="mt-10 max-w-4xl mx-auto">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-slate-500 uppercase tracking-widest">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Raw Analysis Logs
                </h3>
                <div className="bg-slate-900 ring-1 ring-slate-800 text-green-400 p-6 rounded-xl shadow-2xl max-h-[500px] overflow-auto font-mono text-[11px] leading-relaxed">
                    <pre className="selection:bg-indigo-500 selection:text-white">
                        {JSON.stringify(rawAnalysisResult, null, 2)}
                    </pre>
                </div>
            </div>

            <div className="flex justify-center mt-12 mb-10">
                <button
                    onClick={() => navigate("/")}
                    className="px-10 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-black hover:-translate-y-1 transition-all shadow-lg active:scale-95"
                >
                    Avvia Nuova Sessione
                </button>
            </div>
        </div>
    );
}