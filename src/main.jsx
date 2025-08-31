import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import GeminiPrueba from './geminiPrueba.jsx';

createRoot(document.getElementById('root')).render(
  <>
    {/* <PokedexTransition/> */}
    <Router>
      <App />
      {/* <GeminiPrueba /> */}
    </Router>
  </>
)
