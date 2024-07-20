import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import './Watch.css';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEpisodes, fetchInfo, fetchSource } from '../../query/v1';
import { Item } from '../../utils/contstant';
import VideoPlayer from '../../component/VideoPlayer/VideoPlayer';
import SkeletonComp from '../../component/SkeletonComp/SkeletonComp';
import { useVideoState } from '../../context/VideoStateContext';
import { toast } from 'react-toastify';
import Loading from '../../component/Loading/Loading';

interface SourceTypes {
    sources: {
        provider: string;
        quality: string;
        url: string;
    }[];
    downloadURL: string;
    thread: {
        id: string;
        posts: number;
        title: string;
        slug: string;
    };
}
interface PagesType {
    index: number;
    page: number;
    title: string;
}
interface EpisodeType {
    id: string;
    isDub: boolean;
    number: number;
    title: string;
}

interface EpisodesType {
    episodes: EpisodeType[];
    list: EpisodeType[][];
    pages: PagesType[];
}

const Watch = () => {
    const { id, episodeId } = useParams();
    const [episodeIndex, setEpisodeIndex] = useState<number>(0);
    const { videoState, setVideoState } = useVideoState();
    const {
        data: dataSource,
        error: errorSource,
        isLoading: isLoadingSource,
    } = useQuery<SourceTypes, Error>({
        queryKey: ['source', episodeId],
        queryFn: () => fetchSrc(),
    });

    const fetchSrc = async () => {
        try {
            const resp = await fetchSource({ id: episodeId });

            setVideoState((prev) => ({
                ...prev,
                url: resp?.sources[0]?.url,
            }));
            return resp;
        } catch (error) {
            throw new Error(`${error}`);
        }
    };

    const {
        data: dataInfo,
        error: errorInfo,
        isLoading: isLoadingInfo,
    } = useQuery<Item, Error>({
        queryKey: ['info', id],
        queryFn: () => fetchInfo({ id: id }),
    });

    const {
        data: dataEpisode,
        error: errorEpisode,
        isLoading: isLoadingEpisode,
    } = useQuery<EpisodesType, Error>({
        queryKey: ['episodes', id],
        queryFn: () => fetchEpisodes({ id: id }),
    });

    const handlePageSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEpisodeIndex(parseInt(e.target.value));
    };

    if (errorSource) {
        toast(errorSource?.message);
    }
    if (errorEpisode) {
        toast(errorEpisode?.message);
    }
    if (errorInfo) {
        toast(errorInfo?.message);
    }

    return (
        <Layout>
            <div className="watch-container">
                <div className="watch-left">
                    <div className="watch-video-container">
                        {!videoState.url && (
                            <SkeletonComp
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        )}
                        <VideoPlayer
                            width={'100%'}
                            height={'100%'}
                            url={videoState.url}
                            controls={false}
                        />
                        {isLoadingSource && <div className='loading-abs'><Loading LoadingType='HashLoader' color='var(--clr-accent)'/></div>}
                    </div>
                </div>
                <div className="watch-right">
                    <div className="watch-episode-section">
                        <div className="watch-episode-header">
                            <div className="watch-episode-title">
                                Total Episodes:{' '}
                                {dataEpisode?.episodes?.length}
                            </div>
                            <div className="info-page-select-container">
                                <span>Episodes</span>
                                <select
                                    className="ep-page-select"
                                    name="episode-pages"
                                    onChange={handlePageSelection}
                                    value={episodeIndex}
                                >
                                    {dataEpisode?.pages.map((item) => (
                                        <option
                                            key={item.index}
                                            value={item.index}
                                        >
                                            {item.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="watch-episode-list">
                            {isLoadingEpisode
                                ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                                      (item) => (
                                          <SkeletonComp
                                              key={item}
                                              style={{ width: 90, height: 40 }}
                                              highlightColor="var(--clr-bg-2)"
                                              baseColor="var(--clr-bg-1)"
                                          />
                                      ),
                                  )
                                : dataEpisode?.list[episodeIndex].map(
                                      (episode) => (
                                          <Link
                                              key={episode.id}
                                              to={`/watch/${id}/${episode.id}`}
                                          >
                                              <div className={`watch-ep-card ${episode.id === episodeId?"ep-active":''}`}>
                                                  {episode.title}
                                              </div>
                                          </Link>
                                      ),
                                  )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Watch;
