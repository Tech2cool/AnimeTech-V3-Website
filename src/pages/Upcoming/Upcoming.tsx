import Layout from '../../Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { fetchUpcoming } from '../../api/v1';
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
    tv_series?: Item[];
    movies?: Item[];
    ona?: Item[];
    ova?: Item[];
    special?: Item[];
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
const Upcoming = () => {
    const { type, page = 1 } = useParams();

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const deboucePage = useDebounce(page, 500);
    const {
        data: dataSearch,
        error: errorSearch,
        isLoading: isLoadingUpcoming,
    } = useQuery<searchQuery, Error>({
        queryKey: ['Upcoming', deboucePage, type],
        queryFn: () => fetchUpcoming({ type: type, page: page }),
    });
    const handleClickBtn = (item: tagsType) => {
        navigate(`/${pathname.split('/')[1]}/${item?.id || type}/${page}`);
    };

    if (errorSearch) {
        toast(errorSearch?.message);
    }
    return (
        <Layout>
            <Helmet>
                <title>Upcoming Animes</title>
                <meta
                    name="description"
                    content="All Types of Upcoming Animes."
                />
                <link rel="canonical" href="/upcoming-anime" />
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

                    {dataSearch?.tv_series &&
                        dataSearch?.tv_series?.length > 0 && (
                            <ListViewItems
                                title={`TV Series`}
                                list={dataSearch?.tv_series}
                                pagination={true}
                                isLoading={isLoadingUpcoming}
                                pages={dataSearch?.pages}
                                currentPage={dataSearch?.currentPage}
                            />
                        )}

                    {dataSearch?.movies && dataSearch?.movies?.length > 0 && (
                        <ListViewItems
                            title={`Movies`}
                            list={dataSearch?.movies}
                            pagination={true}
                            isLoading={isLoadingUpcoming}
                            pages={dataSearch?.pages}
                            currentPage={dataSearch?.currentPage}
                        />
                    )}
                    {dataSearch?.ona && dataSearch?.ona?.length > 0 && (
                        <ListViewItems
                            title={`Ona`}
                            list={dataSearch?.ona}
                            pagination={true}
                            isLoading={isLoadingUpcoming}
                            pages={dataSearch?.pages}
                            currentPage={dataSearch?.currentPage}
                        />
                    )}

                    {dataSearch?.ova && dataSearch?.ova?.length > 0 && (
                        <ListViewItems
                            title={`Ova`}
                            list={dataSearch?.ova}
                            pagination={true}
                            isLoading={isLoadingUpcoming}
                            pages={dataSearch?.pages}
                            currentPage={dataSearch?.currentPage}
                        />
                    )}
                    {dataSearch?.special && dataSearch?.special?.length > 0 && (
                        <ListViewItems
                            title={`Special`}
                            list={dataSearch?.special}
                            isLoading={isLoadingUpcoming}
                            pages={dataSearch?.pages}
                            pagination={true}
                            currentPage={dataSearch?.currentPage}
                        />
                    )}
                </div>
                <div className="search-list-right">
                    <GenreList />
                    <Top10List />
                </div>
            </div>
        </Layout>
    );
};

export default Upcoming;
