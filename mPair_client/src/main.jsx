import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import { UserProvider } from './Providers/UserProvider.jsx';
import UserPage from './Pages/UserPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import Hero from './Pages/Hero.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/user",
        element:<PrivateRoute><UserPage></UserPage></PrivateRoute>
      }
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
