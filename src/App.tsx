import Header from './components/UI/Header/Header'
import Stats from './components/Stats/Stats'
import Charts from './components/Charts/Charts'

import Admin from './components/Admin/Admin'
import Login from './components/Login/Login'
import Participants from './components/Participants/Participants'
import DataContextProvider from './context/DataContextProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { tracks } from './types/tracks'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/participants',
    element: (
      <DataContextProvider>
        <Header />
        <Participants />
      </DataContextProvider>
    ),
  },
  {
    path: '/admin',
    element: (
      <DataContextProvider>
        <Header />
        <Admin />
      </DataContextProvider>
    ),
  },
  {
    path: '*',
    element: (
      <DataContextProvider>
        <Header />
        <Charts />
        <Stats tracks={tracks} />
      </DataContextProvider>
    ),
  },
], {
  basename: '/SemiColon-dashboard-frontend',
})


function App() {
  return (
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  )
}

export default App
