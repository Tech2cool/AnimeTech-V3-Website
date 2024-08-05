import { FC, memo, useMemo } from 'react';
import { Item } from '../../utils/contstant';
import { useSetting } from '../../context/SettingContext';
import RandomColorText from '../../component/GenreList/RandomColorText';
import SkeletonComp from '../../component/SkeletonComp/SkeletonComp';
import Loading from '../../component/Loading/Loading';
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
interface WatchDescProps {
    item: Item;
    dataReaction: ReactionsType | undefined;
    episodeNum: number | undefined;
    isLoadingReaction: boolean;
    isLoadingInfo: boolean;
}

const WatchDescription: FC<WatchDescProps> = memo(
    ({ item, dataReaction, episodeNum, isLoadingReaction, isLoadingInfo }) => {
        const list = dataReaction?.reactions?.sort(
            (a, b) => a?.order - b?.order,
        );
        const { setting } = useSetting();
        const memoizedPoster = useMemo(() => {
            if (
                item?.coverImage?.length > 0 &&
                item?.coverImage[0]?.extraLarge
            ) {
                return item?.coverImage[0]?.large;
            } else if (
                item?.coverImage?.length > 0 &&
                item?.coverImage[0]?.large
            ) {
                return item?.coverImage[0]?.large;
            } else if (
                item?.coverImage?.length > 0 &&
                item?.coverImage[0]?.medium
            ) {
                return item?.coverImage[0]?.medium;
            } else if (item?.animeImg) {
                return item.animeImg;
            }
        }, [item?.animeImg, item?.coverImage]);

        const memoizedTitle = useMemo(() => {
            if (setting.language === 'en') {
                if (item?.animeTitle?.english) {
                    return item?.animeTitle?.english;
                } else if (item?.title?.english) {
                    return item?.title?.english;
                } else if (item?.animeTitle?.english_jp) {
                    return item?.animeTitle?.english_jp;
                } else if (item?.title?.english_jp) {
                    return item?.title?.english_jp;
                }
            } else {
                if (item?.animeTitle?.english_jp) {
                    return item?.animeTitle?.english_jp;
                } else if (item?.title?.english_jp) {
                    return item?.title?.english_jp;
                } else if (item?.animeTitle?.english) {
                    return item?.animeTitle?.english;
                } else if (item?.title?.english) {
                    return item?.title?.english;
                }
            }
        }, [
            item?.animeTitle?.english,
            item?.title?.english,
            item?.title?.english_jp,
            item?.animeTitle?.english_jp,
            setting?.language,
        ]);

        const memoizedEpisodeNum = useMemo(() => {
            if (item?.episodeNum) {
                return `Episode ${item?.episodeNum}`;
            }
            if (episodeNum) {
                return `Episode ${episodeNum}`;
            }
        }, [item?.episodeNum, episodeNum]);

        const memoizedStatus = useMemo(() => {
            if (item?.status === 'RELEASING') {
                return 'Ongoing';
            } else if (item?.status === 'NOT_YET_RELEASED') {
                return 'Unreleased';
            } else if (item?.status) {
                return item?.status;
            }
        }, [item?.status]);

        const memoizedIsDub = useMemo(() => {
            if (item?.isDub) {
                return 'Dub';
            } else if (!item?.isDub) {
                return 'Sub';
            }
        }, [item?.isDub]);

        const memoizedGenres = useMemo(() => {
            return item?.genres?.map((genre) => (
                <RandomColorText
                    key={genre}
                    title={genre}
                    styles={{ padding: 0 }}
                />
            ));
        }, [item?.genres]);
        return (
            <div className="watch-desc-container">
                {isLoadingInfo && (
                    <Loading LoadingType="BarLoader" color="red" />
                )}
                <img
                    className="watch-desc-img"
                    src={memoizedPoster}
                    alt="poster"
                />

                <div className="watch-desc-bottom">
                    <div className="watch-desc-title">
                        {memoizedTitle} <span>({memoizedIsDub})</span>
                    </div>
                    <div className="watch-desc-ep">{memoizedEpisodeNum}</div>
                    <div className="watch-reactions-container">
                        {isLoadingReaction && (
                            <SkeletonComp
                                style={{ width: '100%', height: 50 }}
                            />
                        )}
                        {list?.map((item, index) => (
                            <div key={index} className="watch-reaction">
                                <img
                                    src={`https:${item?.imageUrl}`}
                                    alt="icons for reaction"
                                />
                                <span>{item?.votes}</span>
                            </div>
                        ))}
                    </div>

                    <div className="watch-reactions-container watch-genres">
                        <RandomColorText
                            title={memoizedStatus!}
                            styles={{ padding: 0 }}
                        />
                        {memoizedGenres}
                    </div>
                </div>
            </div>
        );
    },
);

export default WatchDescription;
