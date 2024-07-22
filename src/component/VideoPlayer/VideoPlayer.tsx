import React, { useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import './VideoPlayer.css';
import VideoControls from './VideoControls';
import { useVideoState } from '../../context/VideoStateContext';
import { OnProgressProps } from 'react-player/base';
import screenfull from 'screenfull';

const VideoPlayer = (props: ReactPlayerProps) => {
    const { videoState, setVideoState } = useVideoState();
    const playerRef = useRef<ReactPlayer>(null);
    const controlsTimeoutRef = useRef<number | undefined>(undefined);
    const playerWrapperRef = useRef<HTMLDivElement>(null);
    const storageKey = `videoPlaybackTime_${videoState.url}`;

    const handleUserInteraction = () => {
        setVideoState((prev) => ({ ...prev, showControls: true }));

        // if(videoState.showSettings) return
        // if(videoState.showPlayBackSpeeds) return
        // if(videoState.showQuality) return

        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            setVideoState((prev) => ({
                ...prev,
                showControls: false,
                showSettings: false,
                showQuality: false,
                showPlayBackSpeeds: false,
            }));
        }, 2000); // Hide controls after 2 seconds of inactivity
    };

    const handleMouseMove = () => {
        handleUserInteraction();
    };
    const handleTouchStart = () => {
        handleUserInteraction();
    };

    const handleMouseLeave = () => {
        setVideoState((prev) => ({
            ...prev,
            showControls: false,
            showSettings: false,
            showQuality: false,
            showPlayBackSpeeds: false,
        }));
    };

    const handleOnDuration = (duration: number) => {
        setVideoState((prev) => ({
            ...prev,
            duration: Math.floor(duration),
        }));
    };
    const handleOnReady = (player: ReactPlayer) => {
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');

        if (internalPlayer) {

            console.log(internalPlayer)

            console.log({ levels: internalPlayer.levels });
            setVideoState((prev) => ({
                ...prev,
                levels: internalPlayer.levels,
            }));

            const storedTime = localStorage.getItem(storageKey);
            if (storedTime) {
                player.seekTo(parseFloat(storedTime), 'seconds');
            }
        } else {
            const playerr = playerRef.current?.getInternalPlayer();
            console.log({playerr:playerr})
            if (playerr) {
                setVideoState((prev) => ({
                    ...prev,
                    quality: playerr?.videoHeight,
                }));
            }
            const storedTime = localStorage.getItem(storageKey);
            if (storedTime) {
                player.seekTo(parseFloat(storedTime), 'seconds');
            }
        }
    };
    const handleOnProgress = (state: OnProgressProps) => {
        setVideoState((prev) => ({
            ...prev,
            currentTime: Math.floor(state.playedSeconds),
            loadedTime: Math.floor(state.loadedSeconds),
        }));

        const internalPlayer = playerRef.current?.getInternalPlayer('hls');

        if (internalPlayer) {
            const newLevel = internalPlayer.currentLevel;
            const initialHeight = internalPlayer.levels[newLevel]?.height;
            if (initialHeight !== videoState.quality) {
                setVideoState((prev) => ({
                    ...prev,
                    quality: initialHeight,
                }));
            }
        } else {
            const player = playerRef.current?.getInternalPlayer();
            if (player) {
                player.videoHeight !== videoState.quality &&
                    setVideoState((prev) => ({
                        ...prev,
                        quality: player.videoHeight,
                    }));
            }
        }
        localStorage.setItem(storageKey, `${state.playedSeconds}`);
    };
    const onChangeQualityLevels = (level:{videoHeight:string, name:string,height:string}, index:number) => {
        const internalPlayer = playerRef.current?.getInternalPlayer('hls');
        if (internalPlayer) {
            // currentLevel expects to receive an index of the levels array
            internalPlayer.currentLevel = index
            // console.log(target.dataset.id);
            setVideoState((prev) => ({
                ...prev,
                quality: level.videoHeight,
            }));
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        playerRef.current?.seekTo(parseInt(e.target.value), 'seconds');
        setVideoState((prev) => ({
            ...prev,
            currentTime: parseInt(e.target.value),
        }));
    };

    const handleSliderVolumeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setVideoState((prev) => ({
            ...prev,
            volume: parseFloat(e.target.value),
        }));
    };

    const handleVumeMute = () => {
        setVideoState((prev) => ({
            ...prev,
            volume: prev.volume > 0.1 ? 0 : 1,
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
        if (playerWrapperRef.current) {
            // screenfull.request(playerWrapperRef.current);
            // Check if screen.orientation.lock is supported before using it
            window?.screen?.orientation?.lock('landscape')
            .then(()=>{ })
            .catch(()=>{})
            playerWrapperRef.current.focus()
          }
  
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
            // onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchStart}
        >
            <ReactPlayer
                ref={playerRef}
                {...props}
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
                handleChangeQuality={onChangeQualityLevels}
            />
        </div>
    );
};

export default VideoPlayer;
