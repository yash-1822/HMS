import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom"; 
import { Provider } from "react-redux";
import './index.css';
import App from './App.jsx';
import { router } from './routers/router.jsx';
import { store } from './store/store.js';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router} />
     </Provider>
);
