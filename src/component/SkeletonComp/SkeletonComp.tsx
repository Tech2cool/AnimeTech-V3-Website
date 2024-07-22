import { CSSProperties, ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkType {
    style?: CSSProperties;
    highlightColor?: string;
    baseColor?: string;
    count?: number;
    children?: ReactNode;
    className?:string
}
const SkeletonComp = ({
    style,
    highlightColor,
    baseColor,
    count = 1,
    children,
    className
}: SkType) => {
    return (
        <>
            <Skeleton
                className={className}
                baseColor={baseColor || 'var(--clr-bg-2)'}
                style={{
                    width: '100vw',
                    height: '40vh',
                    ...style,
                }}
                highlightColor={highlightColor || 'var(--clr-bg-1)'}
                count={count}
            />
            {children}
        </>
    );
};

export default SkeletonComp;
