import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './app/styles/index.scss'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router";
import {ErrorBoundary} from "./app/providers/ErrorBoundary";
import {ThemeProvider} from "./app/providers/ThemeProvider.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
