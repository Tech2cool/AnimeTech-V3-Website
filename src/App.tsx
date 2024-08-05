import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import { lazy, Suspense } from 'react';
import Loading from './component/Loading/Loading';
const Info = lazy(() => import('./pages/Info/Info'));
const Watch = lazy(() => import('./pages/Watch/Watch'));
import 'react-range-slider-input/dist/style.css';
import Search from './pages/Search/Search';
import Recent from './pages/Recent/Recent';
import TopAiring from './pages/TopAiring/TopAiring';
import Popular from './pages/Popular/Popular';
import NotFound from './component/NotFound/NotFound';
import Season from './pages/Season/Season';
import Upcoming from './pages/Upcoming/Upcoming';
import Random from './pages/Random/Random';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />} />
                <Route
                    path="/info/:id/:type?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Info />
                        </Suspense>
                    }
                />
                <Route
                    path="/watch/:id/:episodeId?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Watch />
                        </Suspense>
                    }
                />
                <Route
                    path="/search/:query?/:page?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Search />
                        </Suspense>
                    }
                />

                <Route
                    path="/recent-release/:page?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Recent />
                        </Suspense>
                    }
                />

                <Route
                    path="/top-airing/:page?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <TopAiring />
                        </Suspense>
                    }
                />

                <Route
                    path="/popular/:page?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Popular />
                        </Suspense>
                    }
                />
                <Route
                    path="/season/:season?/:page?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Season />
                        </Suspense>
                    }
                />
                <Route
                    path="/upcoming-anime/:type?/:page?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Upcoming />
                        </Suspense>
                    }
                />
                <Route
                    path="/random/:id?"
                    element={
                        <Suspense
                            fallback={
                                <Loading LoadingType="HashLoader" color="red" />
                            }
                        >
                            <Random />
                        </Suspense>
                    }
                />

                <Route
                    path="*"
                    element={
                        <Suspense
                            fallback={
                                <Loading
                                    LoadingType={'HashLoader'}
                                    color={'red'}
                                />
                            }
                        >
                            <NotFound />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
