import { useEffect, useState } from 'react'
import ZoomableLineChart from './ZoomableLineChart'
import { Typography } from '@mui/material'
import Header from './components/Header'
import Api from './api'
import empty from './assets/empty.svg'

const Dashboard = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storage = localStorage.getItem('task_app')
    const user = JSON.parse(storage)
    if (user) {
      Api.synchronizeUser(user.token)
        .then((data) => {
          const storageData = JSON.stringify({ token: data.token })
          localStorage.setItem('task_app', storageData)

          if (data.token) {
            const { _id, name, email } = data.user
            setToken(data.token)
            setUser({ _id, name, email })
            setIsLogin(true)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

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
