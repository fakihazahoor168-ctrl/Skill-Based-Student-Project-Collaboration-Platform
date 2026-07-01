import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/navbar.css";
import "./styles/cards.css";
import "./styles/dashboard.css";
import "./styles/buttons.css";
import "./styles/enhancements.css";
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Redirect localhost backend requests to the deployed Render backend URL when configured
axios.interceptors.request.use((config) => {
  const apiBase = import.meta.env.VITE_API_URL;
  if (apiBase && config.url && config.url.startsWith('http://localhost:5000')) {
    config.url = config.url.replace('http://localhost:5000', apiBase);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
