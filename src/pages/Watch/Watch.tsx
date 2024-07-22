/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import './Watch.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
    const [cursor, setCursor] = useState<string | null>(null);
    const [commentsList, setCommentsList] = useState<typeItems[]>([]);

    const { videoState, setVideoState } = useVideoState();
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

    const {
        data: dataChats,
        isLoading: isLoadingChats,
        error: errorChats,
    } = useQuery<dataChatsType>({
        queryKey: ['Chats', dataSource?.thread?.id, cursor],
        queryFn: () => fetchChatsDef(),
    });
    const fetchChatsDef = async () => {
        try {
            const response = await fetchChats({
                id: dataSource?.thread?.id,
                cursor: cursor,
            });
            return response;
        } catch (error) {
            return error;

            // console.log(error);
            // Alert.alert('error', error?.message);
        }
    };

    useEffect(() => {
        if (!dataChats) return;
        if (commentsList?.length > 0 && dataChats?.response?.length > 0) {
            setCommentsList([...commentsList, ...dataChats.response!]);
        } else if (commentsList?.length <= 0) {
            setCommentsList(dataChats?.response);
        }
    }, [dataChats, setCommentsList]);

    const fetchNextPage = () => {
        if (dataChats?.cursor?.hasNext) {
            setCursor(dataChats?.cursor?.next);
        }
    };
    useEffect(() => {
        if (!dataSource) return;

        const findFHD =
            dataSource?.sources.find((src) => src.quality === 'default') ||
            dataSource?.sources[0];

        if (findFHD) {
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
    const dummy2Ref = useRef<HTMLDivElement>(null);

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
                        <VideoPlayer {...newVideoState} />
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
                            data={dataChats!}
                            list={commentsList}
                            thread={dataSource?.thread}
                            fetchNextChats={fetchNextPage}
                            scrolltoTop={scrolltoTop}
                            isLoading={isLoadingChats}
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
