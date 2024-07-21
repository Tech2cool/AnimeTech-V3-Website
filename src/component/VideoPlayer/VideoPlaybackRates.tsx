import VideoInfoLayer from './VideoInfoLayer';
import { FaAngleLeft } from 'react-icons/fa';
import { useVideoState } from '../../context/VideoStateContext';
const playbackRatesList = [
    {
        name: '0.25x',
        value: 0.5,
    },
    {
        name: '0.5x',
        value: 0.5,
    },
    {
        name: '0.75x',
        value: 0.5,
    },
    {
        name: 'Normal',
        value: 1,
    },
    {
        name: '1.25x',
        value: 1.25,
    },

    {
        name: '1.5x',
        value: 1.5,
    },
    {
        name: '1.75x',
        value: 1.75,
    },
    {
        name: '2x',
        value: 2,
    },
    {
        name: '2.5x',
        value: 2.5,
    },
    {
        name: '2.75x',
        value: 2.75,
    },
    {
        name: '3x',
        value: 3,
    },
];
const VideoPlaybackRates = () => {
    const { videoState, setVideoState } = useVideoState();

    const handleClick = (name: string, value?: number) => {
        if (!name) return;

        if (name === 'Playback Speed') {
            setVideoState((prev) => ({
                ...prev,
                playbackRate: value,
            }));
        } else if (name === 'Back') {
            setVideoState((prev) => ({
                ...prev,
                showPlayBackSpeeds: false,
                showSettings: !prev.showSettings,
            }));
        }
    };
    return (
        <VideoInfoLayer disabled={!videoState.showPlayBackSpeeds}>
            <span
                className="video-info-layer-heading"
                onClick={() => handleClick('Back')}
            >
                <FaAngleLeft /> Playback Rates
            </span>

            {playbackRatesList.map((item) => (
                <div
                    key={item.name}
                    className={`settings-li ${videoState.playbackRate === item.value ?'active':''}`}
                    onClick={() => handleClick('Playback Speed', item.value)}
                >
                    <span>{item.name}</span>
                </div>
            ))}
        </VideoInfoLayer>
    );
};

export default VideoPlaybackRates;
