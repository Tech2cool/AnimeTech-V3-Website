import React, { useState } from 'react'
import SkeletonComp from '../../component/SkeletonComp/SkeletonComp'
import { Link } from 'react-router-dom'

const EpisodesList = ({dataEpisode, isLoadingEpisode, episodeId, id}) => {
    const [episodeIndex, setEpisodeIndex] = useState<number>(0);

    const handlePageSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEpisodeIndex(parseInt(e.target.value));
    };

  return (
    <div className="watch-episode-section">
    <div className="watch-episode-header">
        <div className="watch-episode-title">
            Total Episodes: {dataEpisode?.episodes?.length}
        </div>
        <div className="info-page-select-container">
            {/* <span>Episodes</span> */}
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
                          <div
                              className={`watch-ep-card ${
                                  episode.id === episodeId
                                      ? 'ep-active'
                                      : ''
                              }`}
                          >
                              {episode.title}
                          </div>
                      </Link>
                  ),
              )}
    </div>
</div>
)
}

export default EpisodesList