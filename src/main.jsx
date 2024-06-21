import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './views/Home.jsx';
import Layout from './views/Layout.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use the layout component as the parent route
    children: [
      {
        path: '',
        element: <Home />, // The Home component will be rendered inside the layout
      },
      // Add more nested routes here if needed
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
