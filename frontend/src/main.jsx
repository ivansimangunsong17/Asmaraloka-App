import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HalamanUtama from './pages/HalamanUtama';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HalamanUtama />,
    errorElement: <NotFound />, // Menangani halaman 404
  },

 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
