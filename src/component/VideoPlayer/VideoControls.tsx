import React, { useMemo } from 'react';
import { useVideoState } from '../../context/VideoStateContext';
import {
    FaPlay,
    FaPause,
    FaVolumeDown,
    FaVolumeMute,
    FaVolumeOff,
    FaVolumeUp,
} from 'react-icons/fa';

import {
    IoVolumeHigh,
    IoVolumeHighSharp,
    IoVolumeLow,
    IoVolumeLowSharp,
    IoVolumeMedium,
    IoVolumeMediumSharp,
    IoVolumeMute,
    IoVolumeMuteSharp,
} from 'react-icons/io5';

import { VideoDuration } from '../../utils/HelperFunctions';
import { IoMdSettings } from 'react-icons/io';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import {
    MdOutlineFullscreen,
    MdOutlineFullscreenExit,
    MdPictureInPicture,
    MdPictureInPictureAlt,
} from 'react-icons/md';
import { FaVolumeHigh, FaVolumeLow } from 'react-icons/fa6';

const VideoControls = ({
    handlePlayPause,
    handlePipChange,
    handleSliderChange,
    handleFullscreen,
    handleSliderVolumeChange,
    handleVumeMute,
    videoState, setVideoState
}) => {
    // const { videoState, setVideoState } = useVideoState();

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
    }, [videoState.volume]);

    
    return (
        <div
            className="video-controls-wrapper"
            style={{
                opacity: videoState.showControls ? '1' : '0',
            }}
        >
            <div className="control-top"></div>
            <div className="control-middle"></div>
            <div className="control-bottom">
                <div className="slider-container">
                    <RangeSlider
                        className="slider"
                        min={0}
                        defaultValue={[0, 0]}
                        max={videoState.duration || 0}
                        value={videoState.currentTime || 0}
                        id="sliderRange"
                        thumbsDisabled={[true, false]}
                        onInput={handleSliderChange}
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
                            <RangeSlider
                                className="slider-volume-slider"
                                min={0}
                                defaultValue={[0, 0.5]}
                                max={1}
                                step={0.1}
                                value={videoState.volume}
                                id="sliderRangeVolume"
                                thumbsDisabled={[true, false]}
                                onInput={handleSliderVolumeChange}
                            />
                        </div>
                    </div>
                    <div className="control-btns-container">
                        <IoMdSettings className="control-btn btn-setting" />
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
        </div>
    );
};

export default VideoControls;
