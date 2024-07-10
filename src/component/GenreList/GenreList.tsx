import React, { useState } from 'react';
import { genresList } from '../../utils/contstant';
import './GenreList.css';
import RandomColorText from './RandomColorText';
import { Link } from 'react-router-dom';

const GenreList = () => {
    const [showAll, setShowAll] = useState<boolean>(false);

    const genreLimited = showAll ? genresList : genresList.slice(0, 30);

    const showMore = ()=>{
        setShowAll(!showAll)
    }
    return (
        <div className="genres-container">
            <div className="genre-title">Genres</div>
            <div className="genres-bg">
                <div className="genres-cards">
                    {genreLimited.map((genre) => (
                        <Link key={genre} to={`/genre/${genre}`}>
                            <RandomColorText title={genre} />
                        </Link>
                    ))}
                </div>
            <button className="view-more" onClick={showMore}>{showAll ? "Show Few":"Show More"}</button>

            </div>
        </div>
    );
};

export default GenreList;
