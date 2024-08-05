import Layout from '../../Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { searchAnime } from '../../api/v1';
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
const Search = () => {
    const { query = '', page } = useParams();

    const debouceQuery = useDebounce(query, 1000);
    const deboucePage = useDebounce(page, 1000);

    const searchData = async () => {
        // if (query.length < 3) {
        //     throw new Error('query should be atleast 3 character');
        // }
        const resp = await searchAnime({ query: query, page: page });
        return resp;
    };

    const {
        data: dataSearch,
        error: errorSearch,
        isLoading: isLoadingSearch,
    } = useQuery<searchQuery, Error>({
        queryKey: ['search', debouceQuery, deboucePage],
        queryFn: searchData,
    });

    if (errorSearch) {
        toast(errorSearch?.message);
    }
    return (
        <Layout>
            <Helmet>
                <title>Search anime {query}</title>
                <meta name="description" content="Searching anime." />
                <link rel="canonical" href="/search" />
            </Helmet>

            <div className="search-list-container">
                <div className="search-list-left">
                    <ListViewItems
                        title={`Results for: ${query}`}
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

export default Search;
