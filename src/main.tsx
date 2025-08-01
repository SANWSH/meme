import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const getTest = async () => {
  const req = await fetch('http://localhost:1337/test', 
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(  res => res.json() )
    .catch( err => ({error: true, msg: err}) );
  
    return JSON.stringify(req);
}

console.log( getTest() );

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <App />
  </StrictMode>,
)
