import Layout from '../../Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { fetchSeasonalAnime } from '../../api/v1';
import ListViewItems from '../../component/ListViewItems/ListViewItems';
import './Search.css';
import Top10List from '../../component/Top10List/Top10List';
import GenreList from '../../component/GenreList/GenreList';
import { toast } from 'react-toastify';
import { Item } from '../../utils/contstant';
import RandomColorText from '../../component/GenreList/RandomColorText';
import { Helmet } from 'react-helmet-async';

interface searchQuery {
    list: Item[];
    pages: {
        page: number;
        is_current: boolean;
        page_link: string;
        name: string;
    }[];
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    totalPages: number;
    tags?: {
        id: string;
        title: string;
    }[];
}
interface tagsType {
    id: string;
    title: string;
}
const Season = () => {
    const { season = 'summer-2024-anime', page = 1 } = useParams();

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const deboucePage = useDebounce(page, 500);
    const {
        data: dataSearch,
        error: errorSearch,
        isLoading: isLoadingSearch,
    } = useQuery<searchQuery, Error>({
        queryKey: ['Season', deboucePage, season],
        queryFn: () => fetchSeasonalAnime({ season: season, page: page }),
    });
    const handleClickBtn = (item: tagsType) => {
        navigate(`/${pathname.split('/')[1]}/${item?.id}/${page}`);
    };

    if (errorSearch) {
        toast(errorSearch?.message);
    }
    return (
        <Layout>
            <Helmet>
                <title>Seasonal Animes Winter/Summer/Fall/Spring</title>
                <meta name="description" content="Seasonal Animes Winter/Summer/Fall/Spring." />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className="search-list-container">
                <div className="search-list-left">
                    <div className="tags-flex" style={{ display: 'flex' }}>
                        {dataSearch?.tags?.map((item: tagsType) => (
                            <div
                                onClick={() => handleClickBtn(item)}
                                key={item?.id}
                            >
                                <RandomColorText title={`${item?.title}`} />
                            </div>
                        ))}
                    </div>

                    <ListViewItems
                        title={`${season?.replace(/-/g, ' ')}`}
                        list={dataSearch?.list}
                        pagination={true}
                        isLoading={isLoadingSearch}
                        pages={dataSearch?.pages}
                        currentPage={dataSearch?.currentPage}
                    />
                </div>
                <div className="search-list-right">
                    <GenreList />
                    <Top10List />
                </div>
            </div>
        </Layout>
    );
};

export default Season;
