import React from 'react';
import ChatCard from './ChatCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../../component/Loading/Loading';
import { DiVim } from 'react-icons/di';
interface commentListTpe {
    data: {
        cursor: {
            hasNext: boolean;
        };
    };
    list: [];
    thread:
        | { id: string; posts: number; title: string; slug: string }
        | undefined;
    fetchNextChats: () => void;
}
const CommentsList = ({
    data,
    list,
    thread,
    fetchNextChats,
}: commentListTpe) => {
    return (
        <div className="watch-chat-container">
            <InfiniteScroll
                dataLength={list?.length} //This is important field to render the next data
                next={fetchNextChats}
                hasMore={data?.cursor?.hasNext}
                
                loader={
                    <Loading
                        LoadingType="HashLoader"
                        color="var(--clr-accent)"
                    />
                }
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Thats All.</b>
                    </p>
                }
            >
                <div className="chat-headers-container">
                    <div className="comments-heading">
                        <span>{thread?.posts}</span>
                        <span>Comment</span>
                    </div>
                </div>
                {list?.map((item, index) => (
                    <ChatCard item={item} key={index} />
                ))}
            </InfiniteScroll>
            {data?.cursor?.hasNext && (
                <Loading LoadingType="HashLoader" color="var(--clr-accent)" />
            )}
        </div>
    );
};

export default CommentsList;
