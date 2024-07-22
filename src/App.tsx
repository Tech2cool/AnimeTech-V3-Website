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
            </Routes>
        </BrowserRouter>
    );
};

export default App;
