import { useQuery } from '@tanstack/react-query';
import { fetchTopAiring } from '../../query/v1.ts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './index.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Item } from '../../utils/contstant.ts';
import { useCallback, useRef } from 'react';
import { useSetting } from '../../context/SettingContext.tsx';
import { FaAngleLeft, FaAngleRight, FaRegPlayCircle } from 'react-icons/fa';
import { TbInfoOctagon } from 'react-icons/tb';
import { PiFilmSlate, PiTelevision } from 'react-icons/pi';
import { LuClock } from 'react-icons/lu';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

interface DataAiring {
    code: number;
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    message: string;
    totalPages: number;
    pages: {
        is_current: boolean;
        name: string;
        page: number;
        page_link: string;
    }[];
    list: Item[];
}

const BigSlider = () => {
    const { setting } = useSetting();
    const swiperRef = useRef(null);
    const navigate = useNavigate();
    const { data, error, isLoading } = useQuery<DataAiring, Error>({
        queryKey: ['top-airing', 1],
        queryFn: () => fetchTopAiring({ page: 1 }),
    });

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

    const memoizedDesc = useCallback((item: Item) => {
        if (item?.description) {
            return item?.description;
        }
    }, []);

    const memoizedStatus = useCallback((item: Item) => {
        if (item?.status === 'RELEASING') {
            return 'Ongoing';
        } else if (item?.status === 'NOT_YET_RELEASED') {
            return 'Unreleased';
        } else if (item?.status) {
            return item?.status;
        }
    }, []);

    const onClickWatch = (id: string) => {
        navigate(`/watch/${id.slice(0, -1) + '1'}`);
    };

    const onClickInfo = (id: string) => {
        navigate(`/info/${id}`);
    };
    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current?.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current?.swiper.slideNext();
    }, []);

    return (
        <div className="big-slider-container">
            {isLoading
                ? [1, 2, 3, 4, 5, 6].map((num) => (
                      <div
                        key={num}
                          style={{
                              width: "100vw",
                              height:'65vh',
                              backgroundColor: 'gray',
                              margin: '4px 2px',
                          }}
                      ></div>
                  ))
                : ''}
            <Swiper
                ref={swiperRef}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                modules={[Autoplay, Navigation, Pagination]}
            >
                {data?.list?.map((item: Item, index: number) => (
                    <SwiperSlide key={item?.animeId || index}>
                        <div className="swiper-big-slide">
                            <img
                                className="swiper-big-img"
                                src={
                                    item?.bannerImage?.url ||
                                    (item?.coverImage?.length > 0 &&
                                        item?.coverImage[0]?.extraLarge) ||
                                    item?.animeImg
                                }
                                alt={item?.animeId}
                            />
                            <div className="swiper-info">
                                <div className="swiper-rank">#{index + 1}</div>
                                <div className="swiper-name-container">
                                    <div className="swiper-rank small">
                                        #{index + 1}
                                    </div>

                                    <div className="swiper-name">
                                        {memoizedTitle(item) || '.'}
                                    </div>
                                </div>
                                <div className="swiper-info-btns">
                                    <div className="swiper-icn-text">
                                        <PiTelevision
                                            color={'var(--clr-text)'}
                                            size={25}
                                        />
                                        <p>{item?.type || '.'}</p>
                                    </div>
                                    <div className="swiper-icn-text">
                                        <LuClock
                                            color={'var(--clr-text)'}
                                            size={25}
                                        />
                                        <p>{item?.released || '.'}</p>
                                    </div>
                                    <div className="swiper-icn-text">
                                        <PiFilmSlate
                                            color={'var(--clr-text)'}
                                            size={25}
                                        />
                                        <p>{memoizedStatus(item) || '.'}</p>
                                    </div>
                                    <div className="swiper-icn-text">
                                        <TiWeatherPartlySunny
                                            color={'var(--clr-text)'}
                                            size={25}
                                        />
                                        <p>{item?.season || ' .'}</p>
                                    </div>
                                </div>
                                <div className="swiper-desc">
                                    {memoizedDesc(item)}
                                </div>
                                <div className="swiper-info-btns">
                                    <button
                                        className="swiper-btn swiper-watch-now"
                                        onClick={() =>
                                            onClickWatch(item?.episodeId)
                                        }
                                    >
                                        <FaRegPlayCircle
                                            className="swiper-play-btn"
                                            color={'var(--clr-text)'}
                                        />
                                        Watch Now
                                    </button>
                                    <button
                                        className="swiper-btn swiper-info-btn"
                                        onClick={() =>
                                            onClickInfo(item?.animeId)
                                        }
                                    >
                                        <TbInfoOctagon
                                            color={'var(--clr-text)'}
                                            size={25}
                                        />
                                        Info
                                    </button>
                                </div>
                            </div>
                            <div className="swiper-btns">
                                <div
                                    className="swiper-btn swiper-prev"
                                    onClick={handlePrev}
                                >
                                    <FaAngleLeft
                                        color={'var(--clr-text)'}
                                        size={25}
                                    />
                                </div>
                                <div
                                    className="swiper-btn swiper-next"
                                    onClick={handleNext}
                                >
                                    <FaAngleRight
                                        color={'var(--clr-text)'}
                                        size={25}
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BigSlider;
