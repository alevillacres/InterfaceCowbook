import {useState} from "react";
import {VideoInterface} from "./VideoInterface.tsx";
import {LiveInterface} from "./LiveInterface.tsx";



export function CowbookApp() {
    const [isLive, setIsLive] = useState<boolean>(false);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
            <h3 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight ">
                Cowbook <span className={`text-4xl font-extrabold tracking-tight ${isLive ? 'text-green-700' : 'text-blue-600'}`}>App</span>
            </h3>
            <div className="flex items-center gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <span className={`text-sm font font-medium ${isLive ? 'text-slate-400' : 'text-blue-600'}`}>
                    Modalità video
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isLive}
                        onChange={(e) =>
                            setIsLive(e.target.checked)}
                    />
                    <div className="w-14 h-7 bg-blue-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
                <span className={`text-sm font-medium ${isLive ? 'text-green-700' : 'text-slate-400'}`}>
                    Modalità Live
                </span>
            </div>
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-slate-100 p-6 min-h-[300px]">
                {!isLive? <VideoInterface isActive={isLive} /> : <LiveInterface isActive={isLive}/>}

            </div>
        </div>
    );
}