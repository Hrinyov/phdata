import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Body/Home/Home.tsx'
import Profile from './components/Body/Profile/Profile.tsx'
import ErrorPage from './ErrorPage.tsx'

const router = createBrowserRouter([
  {path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      element: <Home />,
      index: true
    },
    {
      path: '/profile',
      element: <Profile />,
    }
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
