import React, { CSSProperties } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkType{
    style?: CSSProperties;
    highlightColor?: string;
    baseColor?: string;
    count?:number
}
const SkeletonComp = ({ style, highlightColor, baseColor,count=1 }: SkType) => {
    return (
        <Skeleton
            baseColor={baseColor || "var(--clr-bg-2)"}
            style={{
                width: '100vw',
                height: '40vh',
                ...style,
            }}
            highlightColor={highlightColor || "var(--clr-bg-1)"}
            count={count}
        />
    );
};

export default SkeletonComp;
