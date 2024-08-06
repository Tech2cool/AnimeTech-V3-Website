/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import './Watch.css';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
    fetchChats,
    fetchEpisodes,
    fetchInfo,
    fetchReaction,
    fetchSource,
} from '../../api/v1';
import { Item } from '../../utils/contstant';
import VideoPlayer from '../../component/VideoPlayer/VideoPlayer';
import SkeletonComp from '../../component/SkeletonComp/SkeletonComp';
import { useVideoState } from '../../context/VideoStateContext';
import { toast } from 'react-toastify';
import Loading from '../../component/Loading/Loading';
import EpisodesList from './EpisodesList';
import CommentsList from './CommentsList';
import WatchDescription from './WatchDescription';
import Top10List from '../../component/Top10List/Top10List';
import { Helmet } from 'react-helmet-async';

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
interface ReactionProp {
    votes: number;
    dateAdded: string;
    text: string;
    imageUrl: string;
    id: number;
    template: number;
    image: string | null;
    order: number;
}
interface ReactionsType {
    code: number;
    message: string;
    reactions: ReactionProp[];
}
type autherT = {
    avatar: {
        xlarge: {
            permalink: string;
        };
        large: {
            permalink: string;
        };
        small: {
            permalink: string;
        };
        permalink: string;
    };
    name: string;
};
interface typeItems {
    author: autherT;
    message: string;
    createdAt: string;
    likes: number;
    dislikes: number;
}
interface dataChatsType {
    cursor: {
        prev: string | null;
        hasNext: true;
        next: string | null;
        hasPrev: boolean;
        total: number;
        id: string;
        more: boolean;
    };
    response: typeItems[];
}

const Watch = () => {
    const { id, episodeId } = useParams();
    const dummy2Ref = useRef<HTMLDivElement>(null);

    const { videoState, setVideoState } = useVideoState();
    const [url, setUrl] = useState<string | undefined>(undefined);
    const {
        currentTime,
        buffering,
        fullscreen,
        showControls,
        loadedTime,
        levels,
        quality,
        showSettings,
        showPlayBackSpeeds,
        showQuality,
        ...newVideoState
    } = videoState;

    const {
        data: dataSource,
        error: errorSource,
        isLoading: isLoadingSource,
    } = useQuery<SourceTypes, Error>({
        queryKey: ['source', episodeId],
        queryFn: () => fetchSource({ id: episodeId }),
    });

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
    } = useQuery<EpisodesType | undefined, Error>({
        queryKey: ['episodes', id],
        queryFn: () => fetchEpisodes({ id: id }),
    });
    const fetchChat = async ({ pageParam = undefined }) => {
        const resp = await fetchChats({
            id: dataSource?.thread?.id,
            cursor: pageParam,
        });
        return resp;
    };

    const {
        data: dataChats,
        error: errorChats,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        isLoading: isLoadingChats,
    } = useInfiniteQuery({
        queryKey: ['chats-infinite', dataSource?.thread?.id],
        queryFn: fetchChat,
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            if (lastPage?.cursor?.hasNext) {
                return lastPage?.cursor?.next;
            }
            return undefined;
        },
        enabled: !!dataSource?.thread?.id,
    });

    useEffect(() => {
        if (!dataSource) return;

        const findFHD =
            dataSource?.sources.find((src) => src.quality === 'default') ||
            dataSource?.sources[0];

        if (findFHD) {
            setUrl(findFHD?.url);
            setVideoState((prev) => ({
                ...prev,
                url: findFHD?.url,
            }));
        }
    }, [
        dataSource,
        dataSource?.downloadURL,
        dataSource?.sources,
        isLoadingSource,
        setVideoState,
    ]);

    const {
        data: dataReaction,
        isLoading: isLoadingReaction,
        error: errorReaction,
    } = useQuery<ReactionsType | undefined>({
        queryKey: ['Reactions', dataSource?.thread?.id],
        queryFn: () => fetchReaction({ id: dataSource?.thread?.id }),
    });

    const allItems = useMemo(
        () =>
            dataChats?.pages?.flatMap((fkItems: dataChatsType) => {
                return fkItems?.response ?? [];
            }),
        [dataChats],
    );

    const scrolltoTop = () => {
        dummy2Ref.current?.scrollIntoView({ behavior: 'smooth' });
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
    if (errorChats) {
        toast(errorChats?.message);
    }
    if (errorReaction) {
        toast(errorReaction?.message);
    }

    return (
        <Layout>
            <Helmet>
                <title>Watching Anime</title>
                <meta name="description" content="Watching/streaming anime." />
                <link rel="canonical" href={window.location.pathname} />
            </Helmet>

            <div className="watch-container" ref={dummy2Ref}>
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
                        <VideoPlayer {...newVideoState} url={url} />
                        {isLoadingSource && (
                            <div className="loading-abs">
                                <Loading
                                    LoadingType="HashLoader"
                                    color="var(--clr-accent)"
                                />
                            </div>
                        )}
                    </div>
                    <div className="watch-info-container">
                        <WatchDescription
                            item={dataInfo!}
                            dataReaction={dataReaction}
                            episodeNum={
                                dataEpisode?.episodes.find(
                                    (ep) => ep.id === episodeId,
                                )?.number
                            }
                            isLoadingReaction={isLoadingReaction}
                            isLoadingInfo={isLoadingInfo}
                        />
                        <div className="phone-ep-list">
                            <EpisodesList
                                dataEpisode={dataEpisode}
                                isLoadingEpisode={isLoadingEpisode}
                                episodeId={episodeId}
                                id={id}
                            />
                        </div>
                        <CommentsList
                            list={allItems!}
                            thread={dataSource?.thread}
                            fetchNextChats={fetchNextPage}
                            scrolltoTop={scrolltoTop}
                            isLoading={isLoadingChats}
                            isFetching={isFetching}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    </div>
                </div>
                <div className="watch-right">
                    <div className="pc-ep-list">
                        <EpisodesList
                            dataEpisode={dataEpisode}
                            isLoadingEpisode={isLoadingEpisode}
                            episodeId={episodeId}
                            id={id}
                        />
                    </div>
                    <Top10List />
                </div>
            </div>
        </Layout>
    );
};

export default Watch;
