import React, { useMemo } from 'react';
import './VerticalCard.css';
import { Item } from '../../utils/contstant';
import { useSetting } from '../../context/SettingContext';
interface VertCard {
    item: Item;
    showEpisode: boolean;
}
const VerticalCard = ({ item, showEpisode = false }: VertCard) => {
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

    const memoizedEpisodeNum = useMemo(() => {
        if (showEpisode && item?.episodeNum) {
            if (item?.episodeNum) {
                return `Episode ${item?.episodeNum}`;
            }
        }
    }, [item?.episodeNum, showEpisode]);

    const memoizedStatus = useMemo(() => {
        if (item?.status === 'RELEASING') {
            return 'Ongoing';
        } else if (item?.status === 'NOT_YET_RELEASED') {
            return 'Unreleased';
        } else if (item?.status) {
            return item?.status;
        }
    }, [item?.status]);

    const memoizedIsDub = useMemo(() => {
        if (item?.isDub) {
            return 'Dub';
        } else if (!item?.isDub) {
            return 'Sub';
        }
    }, [item?.isDub]);


    return (
        <div className="vert-container">
            <div className="vert-poster-container">
                <img src={memoizedPoster} alt={memoizedTitle} />
            </div>
            <div className="vert-info-container">
                <div className="vert-name">{memoizedTitle}</div>
                <div className="vert-episode">{memoizedEpisodeNum}</div>
                <div className={`vert-status ${item?.released ?'':'disable'}`}>
                    Released: {item?.released}
                </div>

            </div>

            <div className="vert-tags-container">
                <div className={`vert-tag ${item?.type ?'':'disable'}`}>
                    {item?.type}
                </div>
                <div className={`vert-tag ${item?.status ?'':'disable'}`}>
                    {memoizedIsDub}
                </div>

                <div className={`vert-tag ${item?.status ?'':'disable'}`}>
                    {memoizedStatus}
                </div>

            </div>
        </div>
    );
};

export default VerticalCard;
