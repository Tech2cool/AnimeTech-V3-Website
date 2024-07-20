import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';
import BarLoader from 'react-spinners/BarLoader';
import BeatLoader from 'react-spinners/BeatLoader';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import HashLoader from 'react-spinners/HashLoader';
import PuffLoader from 'react-spinners/PuffLoader';
import RotateLoader from 'react-spinners/RotateLoader';
import ClockLoader from 'react-spinners/ClockLoader';

interface LoadingTypes {
    LoadingType:
        | 'ClipLoader'
        | 'ScaleLoader'
        | 'BarLoader'
        | 'BeatLoader'
        | 'ClimbingBoxLoader'
        | 'HashLoader'
        | 'PuffLoader'
        | 'RotateLoader'
        | 'ClockLoader';
    color: string;
}
const Loading = ({ LoadingType = 'ClipLoader', color }: LoadingTypes) => {
    let content;
    if (LoadingType) {
        if (LoadingType === 'ClipLoader') {
            content = <ClipLoader color={color} size={60} />;
        } else if (LoadingType === 'ScaleLoader') {
            content = <ScaleLoader color={color} width={6} />;
        } else if (LoadingType === 'BarLoader') {
            content = <BarLoader color={color} />;
        } else if (LoadingType === 'BeatLoader') {
            content = <BeatLoader color={color} />;
        } else if (LoadingType === 'ClimbingBoxLoader') {
            content = <ClimbingBoxLoader color={color} />;
        } else if (LoadingType === 'HashLoader') {
            content = <HashLoader color={color} />;
        } else if (LoadingType === 'PuffLoader') {
            content = <PuffLoader color={color} />;
        } else if (LoadingType === 'RotateLoader') {
            content = <RotateLoader color={color} />;
        } else if (LoadingType === 'ClockLoader') {
            content = <ClockLoader color={color} />;
        } else {
            content = <ClipLoader color="#f20101" size={60} />;
        }
    } else {
        content = <ClipLoader color="#f20101" size={60} />;
    }
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {content}
        </div>
    );
};

export default Loading;
