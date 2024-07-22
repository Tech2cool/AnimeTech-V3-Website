import VideoInfoLayer from './VideoInfoLayer';
import { FaAngleLeft } from 'react-icons/fa';
import { useVideoState } from '../../context/VideoStateContext';

const VideoQuality = ({handleChangeQuality}:{handleChangeQuality: (level:{videoHeight:string, name:string,height:string}, index:number) => void}) => {
    const { videoState, setVideoState } = useVideoState();

    const handleCloseQuality = ()=>{
        setVideoState((prev) => ({
            ...prev,
            showQuality: !prev.showQuality,
        }));
    }
    return (
        <VideoInfoLayer disabled={!videoState.showQuality}>
            <span className="video-info-layer-heading" onClick={handleCloseQuality}>
                <FaAngleLeft /> Video Quality
            </span>
            {videoState.levels.map((lvl, i) => (
                <div
                    className={`quality-li ${
                        lvl.height === videoState.quality ? 'active' : ''
                    }`}
                    key={lvl?.name}
                    onClick={() => handleChangeQuality(lvl, i)}
                >
                    {lvl?.name}
                </div>
            ))}
        </VideoInfoLayer>
    );
};

export default VideoQuality;
