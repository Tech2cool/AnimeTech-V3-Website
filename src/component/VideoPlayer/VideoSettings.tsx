import VideoInfoLayer from './VideoInfoLayer';
import { FaAngleLeft } from 'react-icons/fa';
import { useVideoState } from '../../context/VideoStateContext';
import { IoMdOptions } from 'react-icons/io';
import { IoPlayCircleOutline } from 'react-icons/io5';
const settingList = [
    {
        name: 'Playback Speed',
        icon: IoPlayCircleOutline,
    },
    {
        name: 'Quality',
        icon: IoMdOptions,
    },
];
const VideoSettings = () => {
    const { videoState, setVideoState } = useVideoState();

    const handleClick = (name: string) => {
        if (!name) return;
        if (name === 'Quality') {
            setVideoState((prev) => ({
                ...prev,
                showQuality: !prev.showQuality,
                showSettings: !prev.showSettings,
            }));
        } else if (name === 'Playback Speed') {
            setVideoState((prev) => ({
                ...prev,
                showPlayBackSpeeds: !prev.showPlayBackSpeeds,
                showSettings: !prev.showSettings,
            }));
        } else if (name === 'Back') {
            setVideoState((prev) => ({
                ...prev,
                showPlayBackSpeeds: false,
                showQuality: false,
                showSettings: !prev.showSettings,
            }));
        }
    };
    return (
        <VideoInfoLayer disabled={!videoState.showSettings}>
            <span
                className="video-info-layer-heading"
                onClick={() => handleClick('Back')}
            >
                <FaAngleLeft /> Settings
            </span>

            {settingList.map((item) => (
                <div
                    key={item.name}
                    className="settings-li"
                    onClick={() => handleClick(item.name)}
                >
                    <span>
                        <item.icon /> {item.name}
                    </span>
                    <span>
                        {item.name === 'Quality'
                            ? videoState.quality + 'p'
                            : videoState.playbackRate + 'x'}
                    </span>
                </div>
            ))}
        </VideoInfoLayer>
    );
};

export default VideoSettings;
