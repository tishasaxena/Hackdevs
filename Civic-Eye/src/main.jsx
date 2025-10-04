import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthPage from './components/AuthPage'
import UserLogin from './components/UserLogin'
import AdminLogin from './components/AdminLogin'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './pages/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import Store from './store/Store'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AuthPage />,
      }
      ,
      {
        path: '/auth/user',
        element: <UserLogin />,
      },
      {
        path: '/auth/admin',
        element: <AdminLogin />,
      },
      {
        path: '/auth/user/signup',
        element: <Signup />,
      },
      {
        path: '/auth/user/login',
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
)
