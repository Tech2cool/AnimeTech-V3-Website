import React, { memo, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import './VideoPlayer.css';
import VideoControls from './VideoControls';
import { useVideoState } from '../../context/VideoStateContext';
import { OnProgressProps } from 'react-player/base';
import screenfull from 'screenfull';

const VideoPlayer = (props: ReactPlayerProps) => {
    const { videoState, setVideoState } = useVideoState();

    const playerRef = useRef<ReactPlayer>(null);
    const playerWrapperRef = useRef(null);
    const handleMouseEnter = (e: React.MouseEvent) => {
        setVideoState((prev) => ({
            ...prev,
            showControls: true,
        }));
    };
    const handleMouseLeave = (e: React.MouseEvent) => {
        setVideoState((prev) => ({
            ...prev,
            showControls: false,
        }));
    };

    const handleOnDuration = (duration: number) => {
        setVideoState((prev) => ({
            ...prev,
            duration: Math.floor(duration),
        }));
    };
    const handleOnReady = (player: ReactPlayer) => {
        console.log(player);
        // setVideoState((prev) => ({
        //     ...prev,
        //     duration: Math.floor(duration),
        // }));
    };
    const handleOnProgress = (state: OnProgressProps) => {
        setVideoState((prev) => ({
            ...prev,
            currentTime: Math.floor(state.playedSeconds),
            loadedTime: Math.floor(state.loadedSeconds),
        }));
    };
    const handleSliderChange = (value:number[]) => {
        playerRef.current?.seekTo(parseInt(value[1]), 'seconds');
        setVideoState((prev) => ({
            ...prev,
            currentTime: parseInt(value[1]),
        }));
    };

    const handleSliderVolumeChange = (value) => {
        setVideoState((prev) => ({
            ...prev,
            volume: parseFloat(value[1]),
        }));
    };

    const handleVumeMute = () => {
        setVideoState((prev) => ({
            ...prev,
            volume: prev.volume > 0.1 ? 0: 1,
        }));
    };

    const handlePlayPause = () => {
        setVideoState((prev) => ({
            ...prev,
            playing: !prev.playing,
        }));
    };

    const handleFullscreen = () => {
        setVideoState((prev) => ({
            ...prev,
            fullscreen: !prev.fullscreen,
        }));
        screenfull.toggle(playerWrapperRef.current!);
        // screenfull.request(playerWrapperRef.current);
    };

    const handlePipChange = () => {
        setVideoState((prev) => ({
            ...prev,
            pip: !prev.pip,
        }));
    };

    return (
        <div
            className="player-wrapper"
            ref={playerWrapperRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <ReactPlayer
                ref={playerRef}
                {...props}
                {...videoState}
                onDuration={handleOnDuration}
                onReady={handleOnReady}
                onProgress={handleOnProgress}
            />
            <VideoControls
                handleSliderChange={handleSliderChange}
                handleVumeMute={handleVumeMute}
                handleSliderVolumeChange={handleSliderVolumeChange}
                handlePlayPause={handlePlayPause}
                handlePipChange={handlePipChange}
                handleFullscreen={handleFullscreen}
                videoState={videoState}
                setVideoState={setVideoState}
            />
        </div>
    );
};

export default memo(VideoPlayer);
