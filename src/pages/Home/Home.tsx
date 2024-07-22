import { useQuery } from '@tanstack/react-query';
import Layout from '../../Layout/Layout';
import BigSlider from './BigSlider';
import { Item, QueryResp } from '../../utils/contstant';
import {
    fetchHome,
    fetchMovies,
    fetchPopular,
    fetchRandom,
    fetchRecentRelease,
    fetchTopAiring,
} from '../../api/v1';
import './index.css';
import { toast } from 'react-toastify';
import ListViewItems from '../../component/ListViewItems/ListViewItems';
import GenreList from '../../component/GenreList/GenreList';
import Top10List from '../../component/Top10List/Top10List';
import { lazy, Suspense } from 'react';
import SkeletonComp from '../../component/SkeletonComp/SkeletonComp';

const VerticalSlider = lazy(() => import('../../component/VerticalSlider/VerticalSlider'));
const HorizontalSlider = lazy(() => import('../../component/HorizontalSlider/HorizontalSlider'));
const WideSlider = lazy(() => import('./WideSlider'));

interface HonmeQuery {
    code: number;
    message: string;
    banners: Item[];
    trailers: Item[];
    annoucements: Item[];
    news: Item[];
    what_to_watch: Item[];
    upcoming: Item[];
    recent_releases: Item[];
    requested_list: Item[];
    season_releases: {
        title: string;
        list: Item[];
    };
}
const randomTime = `${new Date().getTime()}`;

const Home = () => {
    const { data, error, isLoading } = useQuery<QueryResp, Error>({
        queryKey: ['recent-release', 1],
        queryFn: () => fetchRecentRelease({ page: 1 }),
    });
    const {
        data: topAiring,
        error: errorTopAiring,
        isLoading: isLoadingTopAiring,
    } = useQuery<QueryResp, Error>({
        queryKey: ['top-airing', 1],
        queryFn: () => fetchTopAiring({ page: 1 }),
    });

    const {
        data: popular,
        error: errorPopular,
        isLoading: isLoadingPopular,
    } = useQuery<QueryResp, Error>({
        queryKey: ['popular', 1],
        queryFn: () => fetchPopular({ page: 1 }),
    });

    const {
        data: movies,
        error: errorMovies,
        isLoading: isLoadingMovies,
    } = useQuery<QueryResp, Error>({
        queryKey: ['movies', 1],
        queryFn: () => fetchMovies({ page: 1 }),
    });

    const {
        data: random,
        error: errorRandom,
        isLoading: isLoadingRandom,
    } = useQuery<QueryResp, Error>({
        queryKey: ['Random', randomTime],
        queryFn: () => fetchRandom({ id: randomTime }),
    });

    const {
        data: home,
        error: errorHome,
        isLoading: isLoadingHome,
    } = useQuery<HonmeQuery, Error>({
        queryKey: ['home', 1],
        queryFn: () => fetchHome(),
    });

    if (error) {
        toast(error?.message);
    }

    if (errorTopAiring) {
        toast(errorTopAiring?.message);
    }
    if (errorPopular) {
        toast(errorPopular?.message);
    }
    if (errorHome) {
        toast(errorHome?.message);
    }
    if (errorRandom) {
        toast(errorRandom?.message);
    }
    if (errorMovies) {
        toast(errorMovies?.message);
    }

    return (
        <Layout>
            <BigSlider />
            <Suspense fallback={<SkeletonComp />}>
            <div className="home-container">
                <VerticalSlider
                    title="Recent Releases"
                    list={data?.list}
                    seeAllLocation="/recent-release?page=1"
                    isVideo={true}
                    isLoading={isLoading}
                />
                <WideSlider list={home?.banners} isLoading={isLoadingHome} />
                <div className="home-flex-hr">
                    <HorizontalSlider
                        title="Top Airing"
                        list={topAiring?.list?.slice(0, 6)}
                        seeAllLocation="/top-airing?page=1"
                        isLoading={isLoadingTopAiring}
                    />
                    <HorizontalSlider
                        title="Popular Anime"
                        list={popular?.list?.slice(0, 6)}
                        seeAllLocation="/popular?page=1"
                        isLoading={isLoadingPopular}
                    />
                    <HorizontalSlider
                        title="Upcoming Anime"
                        list={home?.upcoming?.slice(0, 6)}
                        seeAllLocation="/upcoming-anime?page=1"
                        isLoading={isLoadingHome}
                    />
                    <HorizontalSlider
                        title="Requsted Anime"
                        list={home?.requested_list?.slice(0, 6)}
                        seeAllLocation="/requested-list?page=1"
                        isLoading={isLoadingHome}
                    />
                </div>
                <div className="home-left-right-section">
                    <div className="home-left-sec">
                        <ListViewItems
                            list={home?.season_releases?.list}
                            isLoading={isLoadingHome}
                            title={home?.season_releases?.title}
                            seeAllLocation="/season"
                        />
                        <ListViewItems
                            list={movies?.list?.slice(0, 18)}
                            isLoading={isLoadingMovies}
                            title={'Anime Movies'}
                            seeAllLocation="/movies"
                        />
                        <ListViewItems
                            list={random?.list?.slice(0, 18)}
                            isLoading={isLoadingRandom}
                            title={'Random Animes'}
                            seeAllLocation={`/random/${randomTime}`}
                        />
                    </div>
                    <div className="home-right-sec">
                        <GenreList />
                        <Top10List />
                    </div>
                </div>
            </div>
            </Suspense>

        </Layout>
    );
};

export default Home;
