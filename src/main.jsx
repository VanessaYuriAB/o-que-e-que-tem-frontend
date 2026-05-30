import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppRoutes from './app/routes/AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
