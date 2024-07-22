import Layout from '../../Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { fetchRecentRelease } from '../../api/v1';
import ListViewItems from '../../component/ListViewItems/ListViewItems';
import "./Search.css"
import Top10List from '../../component/Top10List/Top10List';
import GenreList from '../../component/GenreList/GenreList';
import { toast } from 'react-toastify';
import { Item } from '../../utils/contstant';

interface searchQuery{
    list: Item[];
    pages: {
        page:number;
        is_current:boolean;
        page_link:string;
        name:string;
    }[];
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
    totalPages: number;
}
const Recent = () => {
    const { page } = useParams();

    const deboucePage = useDebounce(page, 500);
    const {
        data: dataSearch,
        error: errorSearch,
        isLoading: isLoadingSearch,
    } = useQuery<searchQuery, Error>({
        queryKey: ['recent-release', deboucePage],
        queryFn: () => fetchRecentRelease({ page: page }),
    });

    if(errorSearch){
        toast(errorSearch?.message)
    }
    return (
        <Layout>
            <div className='search-list-container'>
                <div className="search-list-left">
                <ListViewItems
                    title={`Recent Releases`}
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

export default Recent;
