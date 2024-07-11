import React, { HTMLAttributeAnchorTarget, useMemo, useState } from 'react';
import './Info.css';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Item } from '../../utils/contstant';
import { fetchEpisodes, fetchInfo, fetchInfoV2 } from '../../query/v1';
import { useSetting } from '../../context/SettingContext';
import Layout from '../../Layout/Layout';
import RandomColorText from '../../component/GenreList/RandomColorText';
import { PiTelevision } from 'react-icons/pi';
import { BiCalendar } from 'react-icons/bi';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { toast } from 'react-toastify';
import GenreList from '../../component/GenreList/GenreList';
import Top10List from '../../component/Top10List/Top10List';

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
const Info = () => {
    const { id, type = 1 } = useParams();
    const { setting } = useSetting();
    const [showDesc, setShowDesc] = useState<boolean>(false);
    const [episodeIndex, setEpisodeIndex] = useState<number>(0);

    const { data, error, isLoading } = useQuery<Item, Error>({
        queryKey: ['info', id],
        queryFn: () => fetchData(),
    });

    const {
        data: dataEpisode,
        error: errorEpisode,
        isLoading: isLoadingEpisode,
    } = useQuery<EpisodesType, Error>({
        queryKey: ['episodes', id],
        queryFn: () => fetchEpisodes({ id: id }),
    });

    const memoizedPoster = useMemo(() => {
        if (
            data?.coverImage &&
            data?.coverImage?.length > 0 &&
            data?.coverImage[0]?.extraLarge
        ) {
            return data?.coverImage[0]?.large;
        } else if (data?.animeImg) {
            return data.animeImg;
        } else if (
            data?.coverImage &&
            data?.coverImage?.length > 0 &&
            data?.coverImage[0]?.large
        ) {
            return data?.coverImage[0]?.large;
        } else if (
            data?.coverImage &&
            data?.coverImage?.length > 0 &&
            data?.coverImage[0]?.medium
        ) {
            return data?.coverImage[0]?.medium;
        }
    }, [data?.animeImg, data?.coverImage]);

    const memoizedTitle = useMemo(() => {
        if (setting.language === 'en') {
            if (data?.animeTitle?.english) {
                return data?.animeTitle?.english;
            } else if (data?.title?.english) {
                return data?.title?.english;
            } else if (data?.animeTitle?.english_jp) {
                return data?.animeTitle?.english_jp;
            } else if (data?.title?.english_jp) {
                return data?.title?.english_jp;
            }
        } else {
            if (data?.animeTitle?.english_jp) {
                return data?.animeTitle?.english_jp;
            } else if (data?.title?.english_jp) {
                return data?.title?.english_jp;
            } else if (data?.animeTitle?.english) {
                return data?.animeTitle?.english;
            } else if (data?.title?.english) {
                return data?.title?.english;
            }
        }
    }, [
        data?.animeTitle?.english,
        data?.title?.english,
        data?.title?.english_jp,
        data?.animeTitle?.english_jp,
        setting?.language,
    ]);

    const memoizedStatus = useMemo(() => {
        if (data?.status === 'RELEASING') {
            return 'Ongoing';
        } else if (data?.status === 'NOT_YET_RELEASED') {
            return 'Unreleased';
        } else if (data?.status) {
            return data?.status;
        }
    }, [data?.status]);

    const memoizedIsDub = useMemo(() => {
        if (data?.isDub) {
            return 'Dub';
        } else if (!data?.isDub) {
            return 'Sub';
        }
    }, [data?.isDub]);

    const fetchData = async () => {
        try {
            const resp =
                type === 1
                    ? await fetchInfo({ id: id })
                    : await fetchInfoV2({ id: id });

            return resp;
        } catch (err) {
            throw new Error(`${err}`);
        }
    };

    const handleShowDesc = () => {
        setShowDesc(!showDesc);
    };

    if (error) {
        toast(`${error}`);
    }

    if (errorEpisode) {
        toast(`${errorEpisode}`);
    }
    const handlePageSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEpisodeIndex(parseInt(e.target.value));
    };
    return (
        <Layout>
            <div className="info-container">
                <div className="info-top-section">
                    <div className="info-top-left">
                        <div className="info-poster">
                            <img src={memoizedPoster} alt="" />
                        </div>
                        <div className="info-vertical-container">
                            <div className="info-location">
                                <ol>
                                    <Link to="/">Home</Link>
                                    <Link to="/">
                                        <li>{data?.type}</li>
                                    </Link>
                                    <li className="info-loc-title">
                                        {memoizedTitle}
                                    </li>
                                </ol>
                            </div>
                            <div className="info-name">{memoizedTitle}</div>
                            <div className="info-tags-container">
                                {data?.genres.map((genre) => (
                                    <RandomColorText
                                        key={genre}
                                        title={genre}
                                    />
                                ))}
                            </div>
                            <div
                                className="info-tags-container"
                                style={{ gap: '10px', paddingLeft: 10 }}
                            >
                                <div className="info-card-tag">
                                    <PiTelevision
                                        color={'var(--clr-text)'}
                                        size={25}
                                    />
                                    <p>{data?.type || '.'}</p>
                                </div>
                                <div className="info-card-tag">
                                    <BiCalendar
                                        color={'var(--clr-text)'}
                                        size={20}
                                    />
                                    <p>
                                        {data?.released ||
                                            data?.releasedDate ||
                                            '.'}
                                    </p>
                                </div>
                                <div className="info-card-tag">
                                    <TiWeatherPartlySunny
                                        color={'var(--clr-text)'}
                                        size={25}
                                    />
                                    <p>{data?.season || ' .'}</p>
                                </div>
                            </div>
                            <div className={`info-desc`}>
                                <p
                                    className={`${
                                        showDesc ? 'show-desc' : 'hide-desc'
                                    }`}
                                >
                                    {data?.description || data?.synopsis}
                                </p>
                                <p
                                    className="desc-btn"
                                    onClick={handleShowDesc}
                                >
                                    {showDesc ? 'Hide Desc' : 'Show More...'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="info-top-right">
                        <div
                            className={`info-other-name ${
                                !data?.title?.english ||
                                !data?.animeTitle?.english
                                    ? 'info-disable'
                                    : ''
                            }`}
                        >
                            <p className="info-other-heading">English:</p>
                            <p className="info-other-text">
                                {data?.title?.english ||
                                    data?.animeTitle?.english}
                            </p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.title?.english_jp ||
                                !data?.animeTitle?.english_jp
                                    ? 'info-disable'
                                    : ''
                            }`}
                        >
                            <p className="info-other-heading">
                                Romaji / Native:
                            </p>
                            <p className="info-other-text">
                                {data?.title?.english_jp ||
                                    data?.animeTitle?.english_jp}
                            </p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.title?.japanese ||
                                !data?.animeTitle?.japanese
                                    ? 'info-disable'
                                    : ''
                            }`}
                        >
                            <p className="info-other-heading">Japanese: </p>
                            <p className="info-other-text">
                                {data?.title?.japanese ||
                                    data?.animeTitle?.japanese}
                            </p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.otherName ? 'info-disable' : ''
                            }`}
                        >
                            <p className="info-other-heading">Other Names: </p>
                            <p className="info-other-text">{data?.otherName}</p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.status ? 'info-disable' : ''
                            }`}
                        >
                            <p className="info-other-heading">Status: </p>
                            <p className="info-other-text">{memoizedStatus}</p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.released || !data?.releasedDate
                                    ? 'info-disable'
                                    : ''
                            }`}
                        >
                            <p className="info-other-heading">Aired: </p>
                            <p className="info-other-text">
                                ? ? {data?.released || data?.releasedDate}
                            </p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.type ? 'info-disable' : ''
                            }`}
                        >
                            <p className="info-other-heading">Type: </p>
                            <p className="info-other-text">{data?.type}</p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.isDub ? 'info-disable' : ''
                            }`}
                        >
                            <p className="info-other-heading">Dub / Sub: </p>
                            <p className="info-other-text">{memoizedIsDub}</p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.totalEpisodes ? 'info-disable' : ''
                            }`}
                        >
                            <p className="info-other-heading">
                                Total Episodes:{' '}
                            </p>
                            <p className="info-other-text">
                                {data?.totalEpisodes}
                            </p>
                        </div>

                        <div
                            className={`info-other-name ${
                                !data?.season ? 'info-disable' : ''
                            }`}
                        >
                            <p className="info-other-heading">Premiered: </p>
                            <p className="info-other-text">{data?.season}</p>
                        </div>
                    </div>
                </div>

                <div className="info-left-right-section">
                    <div className="info-episode-section">
                        <div className="info-episode-header">
                            <div className="info-episode-title">Total Episodes: {data?.totalEpisodes || dataEpisode?.episodes?.length}</div>
                            <div className="info-page-select-container">
                            <span>Pages {" > "}</span>
                            <select
                                className='ep-page-select'
                                name="episode-pages"
                                onChange={handlePageSelection}
                                value={episodeIndex}
                            >
                                {dataEpisode?.pages.map((item) => (
                                    <option key={item.index} value={item.index}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                            </div>

                        </div>
                        <div className="info-episode-list">
                            {dataEpisode?.list[episodeIndex].map((episode) => (
                                <Link key={episode.id} to={`/watch/${id}/${episode.id}`}>
                                <div  className="info-ep-card">
                                    {episode.title}
                                </div>
                                </Link>

                            ))}
                        </div>
                    </div>
                    <div className="info-right-section">
                        <GenreList />
                        <Top10List />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Info;
