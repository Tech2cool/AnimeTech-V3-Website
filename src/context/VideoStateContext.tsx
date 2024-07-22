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
    buffering: boolean;
    quality: string;
    levels: {
        name: string;
        height: string;
        videoHeight: string;
    }[];
    showSettings:boolean,
    showPlayBackSpeeds:boolean,
    showQuality:boolean,
}
interface VideoStateContextType {
    videoState: VideoStateType;
    setVideoState: React.Dispatch<React.SetStateAction<VideoStateType>>;
}

const VideoStateContext = createContext<VideoStateContextType>(
    {} as VideoStateContextType,
);

export const VideoStateProvider = ({ children }: ChildrenProps) => {
    const [videoState, setVideoState] = useState<VideoStateType>({
        url: '',
        playing: true,
        loop: false,
        controls: false,
        light: false,
        volume: 0.5,
        muted: false,
        playbackRate: 1.0,
        width: '100%',
        height: '100%',
        style: {},
        progressInterval: 1000,
        playsinline: true,
        pip: false,
        stopOnUnmount: true,
        previewTabIndex: 0,
        showControls: true,
        currentTime: 0,
        loadedTime: 0,
        duration: 1,
        fullscreen: false,
        buffering: false,
        showPlayBackSpeeds: false,
        showQuality: false,
        showSettings: false,
        quality: '',
        levels: [],
    });
    return (
        <VideoStateContext.Provider value={{ videoState, setVideoState }}>
            {children}
        </VideoStateContext.Provider>
    );
};

export const useVideoState = () => {
    return useContext<VideoStateContextType>(VideoStateContext);
};
