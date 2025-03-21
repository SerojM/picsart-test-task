import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "./styles/global";
import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById('root')!).render(
    <>
        <ErrorBoundary>
            <GlobalStyles/>
            <App/>
        </ErrorBoundary>
    </>,
)
