import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './locale.ts';
import App from './App.tsx'
import { AudioProvider } from './provider/AudioProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider track={null} context={null} data={null} node={null}>
      <App />
    </AudioProvider>
  </StrictMode>,
)
