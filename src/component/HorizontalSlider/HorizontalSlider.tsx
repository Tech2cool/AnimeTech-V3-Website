import React from 'react';
import { Item } from '../../utils/contstant';
import { Link, useNavigate } from 'react-router-dom';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
import './HorizontalSlider.css';
import { FaAngleRight } from 'react-icons/fa';

interface VSlider {
    title: string;
    list: Item[] | undefined;
    seeAllLocation: string;
    isLoading?:boolean
}

const HorizontalSlider = ({ title, list, seeAllLocation,isLoading=false }: VSlider) => {
    const navigate = useNavigate();

    const goToSeeAll = () => {
        navigate(seeAllLocation);
    };

    return (
        <div className="hs-container">
            <div className="hs-title">{title}</div>
            <div className="hs-cards">
                {
                    isLoading? (
                        [1, 2, 3, 4, 5, 6].map((num) => (
                            <div
                            key={num}

                                style={{
                                    width: "450px",
                                    height: "120px",
                                    backgroundColor: 'gray',
                                    margin:"4px 2px"
                                }}
                            >
                            </div>
                        ))
                    ):""
                }
                {list?.map((item: Item) => (
                    <Link key={item?.animeId} to={`/info/${item?.animeId}`}>
                        <HorizontalCard item={item} />
                    </Link>
                ))}
            </div>
            <div className="hs-view-more" onClick={goToSeeAll}>
                View More
                <FaAngleRight color={'var(--clr-text)'} size={25} />
            </div>
        </div>
    );
};

export default HorizontalSlider;
