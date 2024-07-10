import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { Item, QueryResp } from '../../utils/contstant';
import { fetchTrending } from '../../query/v1';
import Switch from '../Switch/Switch';
import './Top10List.css';
import { useSetting } from '../../context/SettingContext';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
const weeksList = [
    {
        name: 'Today',
        id: 1,
    },
    {
        name: 'Week',
        id: 2,
    },
    {
        name: 'Month',
        id: 3,
    },
];
const Top10List = () => {
    const [typeNum, setTypeNum] = useState<number>(1);

    const { data, error, isLoading } = useQuery<QueryResp, Error>({
        queryKey: ['top-10', typeNum],
        queryFn: () => fetchTrending({ id: typeNum }),
    });
    const { setting } = useSetting();
    const memoizedTitle = useCallback(
        (item: Item) => {
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
                }
                if (item?.title?.english_jp) {
                    return item?.title?.english_jp;
                } else if (item?.title?.english) {
                    return item?.title?.english;
                } else if (item?.animeTitle?.english) {
                    return item?.animeTitle?.english;
                }
            }
        },
        [setting.language],
    );
    const memoizedPoster = useCallback((item: Item) => {
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
    }, []);

    const handleActive = (state: number) => {
        setTypeNum(state);
    };

    return (
        <div className="t10-container">
            <div className="t10-header">
                <p className="t10-title">Top 10</p>
                <Switch
                    list={weeksList}
                    active={typeNum}
                    setActive={handleActive}
                />
            </div>
            <div className="t10-cards">
                {data?.list?.map((item: Item, index: number) => (
                    <div className="t10-card" key={item.animeId}>
                        <div className="t10-rank-poster">
                            <div className="t10-rank">{index + 1}</div>
                        </div>
                        <div className="t10-info">
                            <div className="t10-poster">
                                <img src={memoizedPoster(item)} alt="" />
                            </div>
                            <div className="t10-info-vert">
                                <div className="t10-name">
                                    {memoizedTitle(item)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Top10List;
