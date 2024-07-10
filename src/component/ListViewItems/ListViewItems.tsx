import React from 'react';
import { Item } from '../../utils/contstant';
import { Link, useNavigate } from 'react-router-dom';
import VerticalCard from '../VerticalCard/VerticalCard';
import './ListViewItems.css';
import { FaAngleRight } from 'react-icons/fa';
interface listViewItems {
    title: string | undefined;
    list: Item[] | undefined;
    seeAllLocation: string;
    isLoading?: boolean;
    pagination?: boolean;
}
const ListViewItems = ({
    title,
    list,
    isLoading,
    seeAllLocation,
    pagination = false,
}: listViewItems) => {
    const navigate = useNavigate();

    const goToSeeAll = () => {
        navigate(seeAllLocation);
    };

    return (
        <div className="list-view-container">
            <div className="lv-title-see-more">
                <p className='lv-title'>{title}</p>

                <div className="lv-view-more" onClick={goToSeeAll}>
                    <p>View More</p>
                    <FaAngleRight color={'var(--clr-text)'} size={25} />
                </div>
            </div>
            <div className="lv-cards">
                {list?.map((item: Item) => (
                    <Link
                    key={item.animeId}
                    to={`/info/${item.animeId}`}
                    >
                    <VerticalCard
                        item={item}
                        showEpisode={false}
                    />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListViewItems;
