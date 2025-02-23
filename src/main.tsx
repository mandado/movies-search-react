import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TMDBProvider } from './application/contexts/TMDBContext.tsx';
import { FavoritesProvider } from './application/contexts/FavoritesContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TMDBProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </TMDBProvider>
  </StrictMode>
);
