import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { VideoStateProvider } from './context/VideoStateContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingContextProvider } from './context/SettingContext.tsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <VideoStateProvider>
                <SettingContextProvider>
                    <App />
                </SettingContextProvider>
            </VideoStateProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
