import { ReactNode } from 'react';

const VideoInfoLayer = ({
  disabled,
    children,
}: {
    children: ReactNode;
    disabled: boolean;
}) => {
    if (disabled) return;
    return <div className="videoInfo-layer-wrapper">{children}</div>;
};

export default VideoInfoLayer;
