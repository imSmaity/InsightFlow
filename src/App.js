import { useEffect } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from 'react-router-dom'
import Dashboard from './Dashboard'
import ErrorPage from './ErrorPage'

const Redirect = () => {
  const navigation = useNavigate()
  const params = {
    product: '',
    startDate: '',
    endDate: '',
    ageRange: '',
    gender: '',
    zoomStart: '',
    zoomEnd: '',
  }

  useEffect(() => navigation(`/${btoa(JSON.stringify(params))}`), [])
  return null
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Redirect />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:chartFilters',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
