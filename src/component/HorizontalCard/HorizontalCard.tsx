import React, { useMemo } from 'react';
import './HorizontalCard.css';
import { Item } from '../../utils/contstant';
import { useSetting } from '../../context/SettingContext';
import { PiTelevision } from 'react-icons/pi';
import { LuClock } from 'react-icons/lu';
import { BiCalendar } from 'react-icons/bi';
import { TiWeatherPartlySunny } from 'react-icons/ti';
interface hItem {
    item: Item;
}
const HorizontalCard = ({ item }: hItem) => {
    const { setting } = useSetting();
    const memoizedPoster = useMemo(() => {
        if (item?.coverImage?.length > 0 && item?.coverImage[0]?.extraLarge) {
            return item?.coverImage[0]?.large;
        } else if (item?.coverImage?.length > 0 && item?.coverImage[0]?.large) {
            return item?.coverImage[0]?.large;
        } else if (
            item?.coverImage?.length > 0 &&
            item?.coverImage[0]?.medium
        ) {
            return item?.coverImage[0]?.medium;
        } else if (item?.animeImg) {
            return item.animeImg;
        }
    }, [item?.animeImg, item?.coverImage]);

    const memoizedTitle = useMemo(() => {
        if (setting.language === 'en') {
            if (item?.animeTitle?.english) {
                return item?.animeTitle?.english;
            } else if (item?.title?.english) {
                return item?.title?.english;
            } else if (item?.animeTitle?.english_jp) {
                return item?.animeTitle?.english_jp;
            } else if (item?.title?.english_jp) {
                return item?.title?.english_jp;
            }
        } else {
            if (item?.animeTitle?.english_jp) {
                return item?.animeTitle?.english_jp;
            } else if (item?.title?.english_jp) {
                return item?.title?.english_jp;
            } else if (item?.animeTitle?.english) {
                return item?.animeTitle?.english;
            } else if (item?.title?.english) {
                return item?.title?.english;
            }
        }
    }, [
        item?.animeTitle?.english,
        item?.title?.english,
        item?.title?.english_jp,
        item?.animeTitle?.english_jp,
        setting?.language,
    ]);

    const memoizedStatus = useMemo(() => {
        if (item?.status === 'RELEASING') {
            return 'Ongoing';
        } else if (item?.status === 'NOT_YET_RELEASED') {
            return 'Unreleased';
        } else if (item?.status) {
            return item?.status;
        } else if (item?.req_status) {
            return item?.req_status;
        }
        return 'Unknown';
    }, [item?.status]);

    const memoizedIsDub = useMemo(() => {
        if (item?.isDub) {
            return 'Dub';
        } else if (!item?.isDub) {
            return 'Sub';
        }
    }, [item?.isDub]);

    return (
        <div className="hs-card-container">
            <div className="hs-card-poster">
                <img src={memoizedPoster} alt={memoizedTitle} />
            </div>
            <div className="hs-card-info">
                <div className="hs-card-name">{memoizedTitle}</div>
                <div className="hs-card-tags">
                    <div className="hs-card-tag">
                        <PiTelevision color={'var(--clr-text)'} size={25} />
                        <p>{item?.type || '.'}</p>
                    </div>
                    <div className="hs-card-tag">
                        <BiCalendar color={'var(--clr-text)'} size={20} />
                        <p>{item?.released || item?.releasedDate || '.'}</p>
                    </div>
                    <div className="hs-card-tag">
                        <TiWeatherPartlySunny
                            color={'var(--clr-text)'}
                            size={25}
                        />
                        <p>{item?.season || ' .'}</p>
                    </div>
                </div>
                <div className="hs-card-tags" style={{ padding: '4px 4px' }}>
                    <div className="hs-card-status">
                        Status: {memoizedStatus}
                    </div>
                    <p className="t10-c-tag">{memoizedIsDub}</p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCard;
