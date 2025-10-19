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
import Issue from './pages/Issue.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,// Maybe it is better to fix the root page to home as app should also be wrapped around authlayout to fix the issue 
    children: [
      {
        path: '/',// Auth layout is not fixing the user is still able to bypass to the auth page even after logging in
        element: <AuthLayout><AuthPage/></AuthLayout>,
      }
      ,
      {
        path: '/auth/user',
        element: <AuthLayout><UserLogin /></AuthLayout>,
      },
      {
        path: '/auth/admin',
        element: <AuthLayout><AdminLogin /></AuthLayout>,
      },
      {
        path: '/auth/user/signup',
        element: <AuthLayout><Signup /></AuthLayout>,
      },
      {
        path: '/auth/user/login',
        element: <AuthLayout><Login /></AuthLayout>,
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
     {
      path:"/issue/:id",
      element:<Issue/>
     }
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
