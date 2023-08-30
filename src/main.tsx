import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body/Body.tsx'
import Profile from './components/Profile/Profile.tsx'
import ErrorPage from './ErrorPage.tsx'

const router = createBrowserRouter([
  {path: '/',
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      element: <Body />,
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
