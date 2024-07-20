import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import { lazy, Suspense } from 'react';
import Loading from './component/Loading/Loading';
const Info = lazy(() => import('./pages/Info/Info'));
const Watch = lazy(() => import('./pages/Watch/Watch'));

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
            </Routes>
        </BrowserRouter>
    );
};

export default App;
