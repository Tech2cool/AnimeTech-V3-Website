import React, { useMemo } from 'react';
import { Item } from '../../utils/contstant';
import { useSetting } from '../../context/SettingContext';

const WatchDescription = ({ item, dataReaction }: { item: Item }) => {
    const list = dataReaction?.reactions?.sort((a, b) => a?.order - b?.order);
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
        if (item?.episodeNum) {
            return `Episode ${item?.episodeNum}`;
        }
    }, [item?.episodeNum]);

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
        <div className="watch-desc-container">
            <div className="watch-desc-title">{memoizedTitle}</div>
            <div className="watch-desc-bottom">
                <div className="watch-reactions-container">
                    {list?.map((item, index) => (
                        <div key={index} className="watch-reaction">
                            <img src={`https:${item?.imageUrl}`} alt="" />
                            <span>{item?.votes}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchDescription;
