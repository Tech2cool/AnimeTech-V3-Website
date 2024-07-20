import React, {
    createContext,
    CSSProperties,
    useContext,
    useState,
} from 'react';

interface ChildrenProps {
    children: React.ReactNode;
}

interface VideoStateType {
    url: string;
    playing: boolean;
    loop: boolean;
    controls: boolean;
    light: boolean;
    volume: number;
    muted: boolean;
    playbackRate: number;
    width: string;
    height: string;
    style: CSSProperties;
    progressInterval: number;
    playsinline: boolean;
    pip: boolean;
    stopOnUnmount: boolean;
    previewTabIndex: number;
    showControls: boolean;
    currentTime: number;
    loadedTime: number;
    duration: number;
    fullscreen: boolean;
}
interface VideoStateContextType {
    videoState: VideoStateType;
    setVideoState: React.Dispatch<React.SetStateAction<VideoStateType>>;
}

const VideoStateContext = createContext<VideoStateContextType>(
    {} as VideoStateContextType,
);

export const VideoStateProvider = ({ children }: ChildrenProps) => {
    const [videoState, setVideoState] = useState<VideoStateType>(
        {playing:true, duration:1, currentTime:0} as VideoStateType,
    );
    return (
        <VideoStateContext.Provider value={{ videoState, setVideoState }}>
            {children}
        </VideoStateContext.Provider>
    );
};

export const useVideoState = () => {
    return useContext<VideoStateContextType>(VideoStateContext);
};
