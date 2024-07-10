import React, { useCallback, useRef } from 'react';
import { Item, QueryResp } from '../../utils/contstant';
import { useQuery } from '@tanstack/react-query';
import { fetchRecentRelease } from '../../query/v1';
import VerticalCard from '../VerticalCard/VerticalCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import 'swiper/css';
import './VerticalSlider.css';

interface VSlider {
    title: string;
    list: Item[] | undefined;
    seeAllLocation: string;
    isVideo?: boolean;
    isLoading?: boolean;
}
const VerticalSlider = ({
    title,
    list,
    seeAllLocation,
    isVideo = false,
    isLoading = false,
}: VSlider) => {
    const swiperRef = useRef(null);
    const navigate = useNavigate();
    const handlePrev = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current?.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current?.swiper.slideNext();
    }, []);

    const goToSeeAll = () => {
        navigate(seeAllLocation);
    };
    return (
        <div className="vs-container">
            <div className="vs-title">
                <p>{title}</p>
                <p onClick={goToSeeAll}>See all</p>
            </div>
            <div className="vs-cards">
                {isLoading
                    ? [1, 2, 3, 4, 5, 6,7,8,9].map((num) => (
                          <div
                            key={num}
                              style={{
                                  width: "200px",
                                  height: "260px",
                                  backgroundColor: 'gray',
                                  margin:"5px 10px"
                              }}
                          >
                          </div>
                      ))
                    : ''}
                <Swiper
                    ref={swiperRef}
                    slidesPerView={7}
                    modules={[Navigation, Pagination]}
                    breakpoints={{
                        200: {
                            slidesPerView: 2,
                            spaceBetween: 2,
                        },
                        300: {
                            slidesPerView: 2,
                            spaceBetween: 2,
                        },
                        700: {
                            slidesPerView: 3,
                            spaceBetween: 4,
                        },
                        900: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1100: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1300: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },

                        1600: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        1800: {
                            slidesPerView: 7,
                            spaceBetween: 10,
                        },
                        2000: {
                            slidesPerView: 8,
                            spaceBetween: 10,
                        },
                        default: {
                            slidesPerView: 8,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <div className="vr-cards-2">
                        {list?.map((item: Item, index: number) => (
                            <SwiperSlide key={item?.animeId || index}>
                                <Link
                                    to={
                                        isVideo
                                            ? `/watch/${item?.episodeId}`
                                            : `/info/${item?.animeId}`
                                    }
                                    className="swiper-slide-slider"
                                >
                                    <VerticalCard
                                        item={item}
                                        showEpisode={true}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
                <div className="swiper-btns-slider">
                    <div
                        className="swiper-btn swiper-prev slider-prev"
                        onClick={handlePrev}
                    >
                        <FaAngleLeft color={'var(--clr-text)'} size={25} />
                    </div>
                    <div
                        className="swiper-btn swiper-next slider-next"
                        onClick={handleNext}
                    >
                        <FaAngleRight color={'var(--clr-text)'} size={25} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalSlider;
