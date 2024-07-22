import { memo, useMemo, useState } from 'react';
import { stripHtmlTags } from '../../utils/HelperFunctions';
import moment from 'moment';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

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
    item: {
        author: autherT;
        message: string;
        createdAt: string;
        likes: number;
        dislikes: number;
    };
}
const ChatCard = memo(({ item }: typeItems) => {
    const [showFullComment, setShowFullComment] = useState<boolean>(false);

    const memoziedImg = useMemo(() => {
        if (item?.author?.avatar?.xlarge?.permalink) {
            return item?.author?.avatar?.xlarge?.permalink;
        } else if (item?.author?.avatar?.large?.permalink) {
            return item?.author?.avatar?.large?.permalink;
        } else if (item?.author?.avatar?.small?.permalink) {
            return item?.author?.avatar?.small?.permalink;
        }

        return item?.author?.avatar?.permalink;
    }, [item?.author?.avatar]);

    const memoziedMsg = useMemo(() => {
        if (item?.message) {
            return stripHtmlTags(item?.message);
        }
    }, [item?.message]);

    const handleClick = () => {
        setShowFullComment(!showFullComment);
    };

    return (
        <div className="chat-card-container">
            <div className="chat-card-left">
                <div className="chat-card-img">
                    <img src={memoziedImg} />
                </div>
            </div>
            <div className="chat-card-right">
                <div className="chat-card-name">
                    <span>{item.author.name}</span>
                    <span>{`\u2022`}</span>
                    <span className="chat-time-ago">
                        {moment(item.createdAt).fromNow()}
                    </span>
                </div>
                <div
                    className={`chat-card-message ${
                        showFullComment ? 'show' : ''
                    }`}
                    onClick={handleClick}
                >
                    {memoziedMsg}
                </div>
                <div className="chat-card-icons-wrapper">
                    <div className="chat-card-icon">
                        <AiOutlineLike className="chat-card-icn" />
                        <span className="chat-likes">{item.likes}</span>
                    </div>
                    <div className="chat-card-icon">
                        <AiOutlineDislike className="chat-card-icn" />
                        <span className="chat-likes">{item.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ChatCard;
