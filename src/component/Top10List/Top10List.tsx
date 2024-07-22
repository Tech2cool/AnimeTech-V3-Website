import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Item, QueryResp } from '../../utils/contstant';
import { fetchTrending } from '../../api/v1';
import Switch from '../Switch/Switch';
import './Top10List.css';
import { useSetting } from '../../context/SettingContext';
import { Link } from 'react-router-dom';
import { PiTelevision } from 'react-icons/pi';
import { BiCalendar } from 'react-icons/bi';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import SkeletonComp from '../SkeletonComp/SkeletonComp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';

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
    const memoizedStatus = useCallback((item:Item) => {
        if (item?.status === 'RELEASING') {
            return 'Ongoing';
        } else if (item?.status === 'NOT_YET_RELEASED') {
            return 'Unreleased';
        } else if (item?.status) {
            return item?.status;
        }
        else if (item?.req_status) {
            return item?.req_status;
        }
        return "Unknown"
    }, []);

    const memoizedIsDub = useCallback((item:Item) => {
        if (item?.isDub) {
            return 'Dub';
        } else if (!item?.isDub) {
            return 'Sub';
        }
    }, []);

    const handleActive = (state: number) => {
        setTypeNum(state);
    };
    if(error){
        toast(error?.message)
    }

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
                {
                    isLoading?[1, 2, 3, 4, 5, 6,7,8,9,10].map((num) => (
                        <SkeletonComp
                            key={num}
                            style={{
                                width: '100%',
                                height: '100px',
                                margin: '4px 2px',
                            }}
                            highlightColor='var(--clr-bg-2)'
                            baseColor='var(--clr-bg-1)'
                        />
                    )):(
                        data?.list?.map((item: Item, index: number) => (
                            <Link to={`/info/${item.animeId}`} key={item.animeId}>
                                <div className="t10-card">
                                    <div className="t10-rank-poster">
                                        <div className="t10-rank">{index + 1}</div>
                                    </div>
                                    <div className="t10-info">
                                        <div className="t10-poster">
                                        <LazyLoadImage src={memoizedPoster(item)} alt={memoizedTitle(item)}/>

                                            {/* <img src={memoizedPoster(item)} alt="" /> */}
                                        </div>
                                        <div className="t10-info-vert">
                                            <div className="t10-name">
                                                {memoizedTitle(item)}
                                            </div>
                                            <div className="t10-card-tags">
                                                <div className="t10-card-tag">
                                                    <PiTelevision
                                                        color={'var(--clr-text)'}
                                                        size={25}
                                                    />
                                                    <p>{item?.type || '.'}</p>
                                                </div>
                                                <div className="t10-card-tag">
                                                    <BiCalendar
                                                        color={'var(--clr-text)'}
                                                        size={20}
                                                    />
                                                    <p>
                                                        {item?.released ||
                                                            item?.releasedDate ||
                                                            '.'}
                                                    </p>
                                                </div>
                                                <div className="t10-card-tag">
                                                    <TiWeatherPartlySunny
                                                        color={'var(--clr-text)'}
                                                        size={25}
                                                    />
                                                    <p>{item?.season || ' .'}</p>
                                                </div>
                                                
                                            </div>
                                            <div className="t10-card-tags" style={{padding:'4px 4px'}}>
                                            <div className="t10-card-status">Status: {memoizedStatus(item)}</div>
                                                <p className='t10-c-tag'>{memoizedIsDub(item)}</p>
                                            </div>
        
        
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Top10List;
