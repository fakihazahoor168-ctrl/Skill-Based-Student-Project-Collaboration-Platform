import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/navbar.css";
import "./styles/cards.css";
import "./styles/dashboard.css";
import "./styles/buttons.css";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
