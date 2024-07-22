import { memo, useEffect, useRef } from 'react';
import ChatCard from './ChatCard';
import Loading from '../../component/Loading/Loading';
import { useInView } from 'react-intersection-observer';

interface threadProps {
    id: string;
    posts: number;
    title: string;
    slug: string;
}

interface cursorProps {
    cursor: {
        hasNext: boolean;
    };
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

interface commentListTpe {
    data: cursorProps;
    list: typeItems[];
    thread: threadProps | undefined;
    fetchNextChats: () => void;
    scrolltoTop: () => void;
    isLoading: boolean;
}

const CommentsList = memo(({
    data,
    list,
    thread,
    fetchNextChats,
    scrolltoTop,
    isLoading,
}: commentListTpe) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextChats();
        }
    }, [inView, fetchNextChats]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                if (scrollHeight - scrollTop <= clientHeight + 100 && data?.cursor?.hasNext) {
                    fetchNextChats();
                }
            }
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);

        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextChats, data?.cursor?.hasNext]);

    const scrolltoBottom = () => {
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
    };

    return (
        <div className="watch-chat-container" ref={containerRef}>
            <div className="watch-scrollToBtns">
                <button onClick={scrolltoTop}>TOP</button>
                <button onClick={scrolltoBottom}>END</button>
            </div>

            <div className="chat-headers-container">
                <div className="comments-heading">
                    <span>{thread?.posts}</span>
                    <span>Comment</span>
                </div>
            </div>
            {isLoading && (
                <Loading LoadingType='ClipLoader' color="var(--clr-accent)" />
            )}
            <div className="comments-list">
                {list?.map((item, index) => (
                    <ChatCard item={item} key={index} />
                ))}
            </div>
            <div className="end-page" ref={ref}>
                {data?.cursor?.hasNext && (
                    <Loading
                        LoadingType="HashLoader"
                        color="var(--clr-accent)"
                    />
                )}
            </div>
        </div>
    );
});

export default CommentsList;
