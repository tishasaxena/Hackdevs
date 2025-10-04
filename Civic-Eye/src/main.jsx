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
import Feature from './pages/Feature.jsx'
import Profile from './pages/profile.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import Store, { persistor } from './store/Store'
import AuthLayout from './components/AuthLayout.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import Report from './pages/Report.jsx'
import AllIssues from './components/AllIssues.jsx'
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
      },
      {
        path: '/feature',
        element: <Feature />,
      },
      {
        path: '/issues',
        element: <AllIssues />
      },
      {
        path: '/report',
        element: <AuthLayout><Report /></AuthLayout>,
      },
      {

        path: '/profile',
        element: <AuthLayout><Profile /></AuthLayout>
      },

    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
