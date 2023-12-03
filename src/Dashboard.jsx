import { useEffect, useState } from 'react'
import ZoomableLineChart from './ZoomableLineChart'
import { Typography } from '@mui/material'
import Header from './components/Header'
import Api from './api'
import empty from './assets/empty.svg'
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const Dashboard = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = Cookies.get('insightUserToken')
    if (token) {
      setLoading(true)
      Api.synchronizeUser(token)
        .then((res) => {
          if (res.success) {
            const { _id, name, email } = res.user
            setToken(token)
            setUser({ _id, name, email })
            setIsLogin(true)
            setLoading(false)
          }
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
  }, [])

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', paddingTop: '25%' }}
      >
        <CircularProgress />
      </Box>
    )
  }
  return (
    <div>
      <Header
        login={isLogin}
        setToken={setToken}
        setIslogin={setIsLogin}
        user={user}
        setUser={setUser}
      />
      <Typography variant="h4" sx={{ textAlign: 'center', p: 3 }}>
        Dashboard
      </Typography>

      {isLogin ? (
        <ZoomableLineChart token={token} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={empty}
            alt="empty"
            style={{ width: '40rem', height: '40rem' }}
          />
        </div>
      )}
    </div>
  )
}

export default Dashboard
