import Layout from '../../Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchRandom } from '../../api/v1';
import ListViewItems from '../../component/ListViewItems/ListViewItems';
import './Search.css';
import Top10List from '../../component/Top10List/Top10List';
import GenreList from '../../component/GenreList/GenreList';
import { toast } from 'react-toastify';
import { Item } from '../../utils/contstant';
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
}
const date = new Date();
const Popular = () => {
    const { id = `${date.getTime()}` } = useParams();
    const { data, error, isLoading } = useQuery<searchQuery, Error>({
        queryKey: ['Random', id],
        queryFn: () => fetchRandom({ id: id }),
    });

    if (error) {
        toast(error?.message);
    }
    return (
        <Layout>
            <Helmet>
                <title>Random Animes</title>
                <meta name="description" content="Random animes." />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <div className="search-list-container">
                <div className="search-list-left">
                    <ListViewItems
                        title={`Random Animes`}
                        list={data?.list}
                        isLoading={isLoading}
                        pages={data?.pages}
                        currentPage={data?.currentPage}
                        seeAllLocation={`/random/${new Date().getTime()}`}
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

export default Popular;
