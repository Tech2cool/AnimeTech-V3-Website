import React, { useMemo, useRef } from 'react';
import { useVideoState } from '../../context/VideoStateContext';
import './VideoPlayer.css';
import { FaPlay, FaPause } from 'react-icons/fa';

import {
    IoVolumeHighSharp,
    IoVolumeLowSharp,
    IoVolumeMediumSharp,
    IoVolumeMuteSharp,
} from 'react-icons/io5';

import { VideoDuration } from '../../utils/HelperFunctions';
import { IoMdSettings } from 'react-icons/io';

import {
    MdOutlineFullscreen,
    MdOutlineFullscreenExit,
    MdPictureInPicture,
    MdPictureInPictureAlt,
} from 'react-icons/md';
import VideoQuality from './VideoQuality';
import VideoSettings from './VideoSettings';
import VideoPlaybackRates from './VideoPlaybackRates';

interface controlTypes {
    handlePlayPause: () => void;
    handlePipChange: () => void;
    handleFullscreen: () => void;
    handleVumeMute: () => void;
    handleChangeQuality: (level:{videoHeight:string, name:string,height:string}, index:number) => void;
    handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSliderVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const VideoControls = ({
    handlePlayPause,
    handlePipChange,
    handleSliderChange,
    handleFullscreen,
    handleSliderVolumeChange,
    handleVumeMute,
    handleChangeQuality,
}: controlTypes) => {
    const { videoState, setVideoState } = useVideoState();

    const refQuality = useRef(null);
    const memozedVolumeIcon = useMemo(() => {
        if (videoState.volume <= 0) {
            return (
                <IoVolumeMuteSharp
                    className="control-btn"
                    onClick={handleVumeMute}
                />
            );
        } else if (videoState.volume <= 0.3) {
            return (
                <IoVolumeLowSharp
                    className="control-btn"
                    onClick={handleVumeMute}
                />
            );
        } else if (videoState.volume <= 0.6) {
            return (
                <IoVolumeMediumSharp
                    className="control-btn"
                    onClick={handleVumeMute}
                />
            );
        } else if (videoState.volume <= 1) {
            return (
                <IoVolumeHighSharp
                    className="control-btn"
                    onClick={handleVumeMute}
                />
            );
        }
        return (
            <IoVolumeHighSharp
                className="control-btn"
                onClick={handleVumeMute}
            />
        );
    }, [videoState.volume, handleVumeMute]);

    const handlePlayPauseWhileTouch = () => {
        if (!videoState.showControls) return;
        handlePlayPause();
    };
    const handleSettingClick = () => {
        setVideoState((prev) => ({
            ...prev,
            showSettings: !prev.showSettings,
        }));
    };
    return (
        <div
            className="video-controls-wrapper"
            style={{
                opacity: videoState.showControls ? '1' : '0',
            }}
        >
            <div
                className="control-middle"
                onClick={handlePlayPauseWhileTouch}
                onDoubleClick={handleFullscreen}
                ref={refQuality}
            ></div>
            <div className="control-bottom">
                <div className="slider-container">
                    <input
                        type="range"
                        min={0}
                        step={1}
                        max={videoState.duration}
                        value={videoState.currentTime}
                        onChange={handleSliderChange}
                        className="slider"
                        id="sliderRange"
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="control-bottom-btns">
                    <div className="control-btns-container">
                        {videoState.playing ? (
                            <FaPause
                                className="control-btn"
                                onClick={handlePlayPause}
                            />
                        ) : (
                            <FaPlay
                                className="control-btn"
                                onClick={handlePlayPause}
                            />
                        )}
                        <div className="control-time">
                            <span>{VideoDuration(videoState.currentTime)}</span>
                            <span>/</span>
                            <span>{VideoDuration(videoState.duration)}</span>
                        </div>
                        <div className="slider-volume">
                            {memozedVolumeIcon}

                            <input
                                type="range"
                                min={0}
                                max={1}
                                value={videoState.volume}
                                onChange={handleSliderVolumeChange}
                                className="slider-volume-slider"
                                id="sliderRangeVolume"
                                step={0.1}
                            />
                        </div>
                    </div>
                    <div className="control-btns-container">
                        <IoMdSettings
                            className="control-btn btn-setting"
                            onClick={handleSettingClick}
                        />
                        {videoState.pip ? (
                            <MdPictureInPicture
                                className="control-btn btn-setting"
                                onClick={handlePipChange}
                            />
                        ) : (
                            <MdPictureInPictureAlt
                                className="control-btn btn-setting"
                                onClick={handlePipChange}
                            />
                        )}
                        {videoState.fullscreen ? (
                            <MdOutlineFullscreenExit
                                className="control-btn btn-fullscreen"
                                onClick={handleFullscreen}
                            />
                        ) : (
                            <MdOutlineFullscreen
                                className="control-btn btn-fullscreen"
                                onClick={handleFullscreen}
                            />
                        )}
                    </div>
                </div>
            </div>
            <VideoSettings />
            <VideoQuality handleChangeQuality={handleChangeQuality} />
            <VideoPlaybackRates />
        </div>
    );
};

export default VideoControls;
