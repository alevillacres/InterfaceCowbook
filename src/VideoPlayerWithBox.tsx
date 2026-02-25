import { useRef, useEffect, useState, useMemo } from 'react';

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

interface Props {
    videoUrl: string;
    trackingData: TrackingData;
    cameraName: string;
    isPlaying: boolean;
    currentTime: number;
    isLeader?: boolean; 
    onTimeUpdate?: (time: number) => void;
    onMetadataLoaded?: (duration: number) => void;
}

export function VideoPlayerWithBox({ videoUrl, trackingData, cameraName, isPlaying, currentTime, isLeader, onTimeUpdate, onMetadataLoaded }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [layout, setLayout] = useState({ width: 0, height: 0, top: 0, left: 0 });

    const FPS = 6;
    const BOX_COLOR = '#062678';

    // Mappa per accesso rapido ai frame
    const frameMap = useMemo(() =>
            new Map(trackingData.frames.map(f => [f.frame_id, f])),
        [trackingData]);

    // Sicronizzare Play/pause
    useEffect(() => {
        if(!videoRef.current) return
        if (isPlaying) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        if (!videoRef.current) return;
        
        // Se è un follower o se il video è in pausa (stiamo usando lo slider), sincronizza
        // Usiamo una soglia di tolleranza per evitare loop infiniti
        const diff = Math.abs(videoRef.current.currentTime - currentTime);
        if (diff > 0.15) { 
            videoRef.current.currentTime = currentTime;
        }
    }, [currentTime])


    const updateLayout = () => {
        if (videoRef.current && containerRef.current) {
            const videoRect = videoRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            // Calcolo della posizione del video rispetto al suo contenitore relativo
            setLayout({
                width: videoRect.width,
                height: videoRect.height,
                top: videoRect.top - containerRect.top,
                left: videoRect.left - containerRect.left
            });
        }
    };

    // Gestione ridimensionamento finestra
    useEffect(() => {
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    // Disegno dei box sul Canvas
    const drawBoxes = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.videoWidth === 0 || layout.width === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;

        // Sincronizzazione risoluzione interna canvas con DPR per nitidezza
        canvas.width = layout.width * dpr;
        canvas.height = layout.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, layout.width, layout.height);

        // Calcolo del frame attuale in base al tempo del video
        const currentFrameIdx = Math.floor(currentTime * FPS);
        const frameData = frameMap.get(currentFrameIdx);

        if (!frameData) return;

        // Fattori di scala: dimensione visualizzata / dimensione nativa (pixel del server)
        const scaleX = layout.width / video.videoWidth;
        const scaleY = layout.height / video.videoHeight;

        ctx.strokeStyle = BOX_COLOR;
        ctx.lineWidth = 2;
        ctx.font = ' 8px Inter, Arial, sans-serif';

        frameData.detections.xyxy.forEach((box, index) => {
            const [x1, y1, x2, y2] = box;

            // Trasformazione coordinate da nativo server a pixel browser
            const rx = x1 * scaleX;
            const ry = y1 * scaleY;
            const rw = (x2 - x1) * scaleX;
            const rh = (y2 - y1) * scaleY;

            ctx.strokeRect(rx, ry, rw, rh);

            // Disegno etichetta Cow ID
            const cowId = frameData.labels[index].id;
            if (cowId !== undefined) {
                const text = `Cow #${cowId}`;
                const textWidth = ctx.measureText(text).width;

                ctx.fillStyle = BOX_COLOR;
                ctx.fillRect(rx, ry - 15, textWidth + 8, 15);

                ctx.fillStyle = '#ffffff';
                ctx.fillText(text, rx + 4, ry - 4);
            }
        });
    };

    // Trigger del disegno sugli eventi del video
    useEffect(() => {
        drawBoxes();
    }, [currentTime, layout, frameMap]);

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center"
        >
            {/* Etichetta Camera */}
            <div className="absolute top-3 left-3 z-30 pointer-events-none">
                <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                    {cameraName}
                </span>
            </div>

            <video
                ref={videoRef}
                src={videoUrl}
                muted
                loop
                playsInline
                className="w-full h-auto block"
                onLoadedMetadata={(e) => {
                    updateLayout();
                    onMetadataLoaded?.(e.currentTarget.duration);
                }}
                onTimeUpdate={(e) => {
                    if (isLeader && isPlaying) {
                        onTimeUpdate?.(e.currentTarget.currentTime);
                    }
                }}
            />

            {/* Canvas sovrapposto con posizione dinamica basata sul layout del video */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: layout.top,
                    left: layout.left,
                    width: layout.width,
                    height: layout.height,
                    pointerEvents: 'none',
                    zIndex: 20
                }}
            />
        </div>
    );
}