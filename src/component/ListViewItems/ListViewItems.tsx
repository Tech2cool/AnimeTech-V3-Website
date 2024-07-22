import { useRef } from 'react';
import { Item } from '../../utils/contstant';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VerticalCard from '../VerticalCard/VerticalCard';
import './ListViewItems.css';
import { FaAngleRight } from 'react-icons/fa';
import SkeletonComp from '../SkeletonComp/SkeletonComp';
import { useSetting } from '../../context/SettingContext';

interface pageType{
    page: number;
    is_current: boolean;
    page_link: string;
    name: string;
}
interface listViewItems {
    title: string | undefined;
    list: Item[] | undefined;
    seeAllLocation?: string;
    isLoading?: boolean;
    pagination?: boolean;
    pages?: {
        page: number;
        is_current: boolean;
        page_link: string;
        name: string;
    }[];
    currentPage?: number;
}
const ListViewItems = ({
    title,
    list,
    isLoading,
    seeAllLocation,
    pagination = false,
    pages = [],
    currentPage,
}: listViewItems) => {
    const navigate = useNavigate();
    const { setting } = useSetting();
    const { pathname } = useLocation();
    const goToSeeAll = () => {
        if(seeAllLocation){
            navigate(seeAllLocation);
        }
    };

    const dummyRef = useRef<HTMLDivElement>(null);
    // console.log(pathname.split('/')[1])
    const handleClickBtn = (item:pageType) => {
        if (currentPage === item?.page) return;
        if (pathname.startsWith('/search')) {
            navigate(`/search/${setting.query}/${item?.page}`);
        }else{
            navigate(`/${pathname.split('/')[1]}/${item?.page}`);
        }
        dummyRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="list-view-container" ref={dummyRef}>
            <div className="lv-title-see-more">
                <p className="lv-title">{title}</p>

                <div
                    style={{
                        display: pagination ? 'none' : 'flex',
                    }}
                    className="lv-view-more"
                    onClick={goToSeeAll}
                >
                    <p>View More</p>
                    <FaAngleRight color={'var(--clr-text)'} size={25} />
                </div>
            </div>
            <div className="lv-cards">
                {isLoading
                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                          <SkeletonComp
                              key={num}
                              style={{
                                  width: '200px',
                                  height: '260px',
                                  margin: '5px 2px',
                              }}
                          />
                      ))
                    : list?.map((item: Item) => (
                          <Link key={item.animeId} to={`/info/${item.animeId}`}>
                              <VerticalCard item={item} showEpisode={false} />
                          </Link>
                      ))}

                {!isLoading && list && list?.length <= 0 && <p>No Result Found</p>}
            </div>
            {pagination && (
                <div className="list-view-paginations">
                    {pages?.map((item) => (
                        <div
                            onClick={() => handleClickBtn(item)}
                            className={`list-view-page-btn ${
                                currentPage === item.page ? 'active' : ''
                            }`}
                            key={item?.name}
                        >
                            {item?.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListViewItems;
