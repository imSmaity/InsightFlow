import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import Api from '../api'
import Login from '../Login'
import SignUp from '../SignUp'
import Cookies from 'js-cookie'

const Header = ({ login, setToken, setIslogin, user, setUser }) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignup, setOpenSignup] = useState(false)

  const handleLogin = (data) => {
    Api.loginUser(data)
      .then((data) => {
        Cookies.set('insightUserToken', String(data.token), { expires: 7 })

        if (data.token) {
          const { _id, name, email } = data.user
          setToken(data.token)
          setUser({ _id, name, email })
          setIslogin(true)
          setOpenLogin(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSignup = (data) => {
    data = { name: data.name, email: data.email, password: data.password }

    Api.signupUser(data)
      .then((data) => {
        Cookies.set('insightUserToken', String(data.token), { expires: 7 })
        setOpenSignup(false)
        if (data.token) {
          const { _id, name, email } = data.user
          setToken(data.token)
          setUser({ _id, name, email })
          setIslogin(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const setLogout = () => {
    Cookies.remove('insightUserToken')
    setIslogin(false)
    setToken('')
  }

  return (
    <Box>
      {login ? (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '5%',
          }}
        >
          <Typography>{user.name}</Typography>
          <Button sx={{ textTransform: 'none' }} onClick={setLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            disableElevation={true}
            sx={{ backgroundColor: '#0696FF', textTransform: 'none' }}
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            disableElevation={true}
            sx={{ backgroundColor: '#0696FF', textTransform: 'none' }}
            onClick={() => setOpenSignup(true)}
          >
            Signup
          </Button>
        </Box>
      )}
      <Login
        open={openLogin}
        handleLogin={handleLogin}
        handleClose={() => setOpenLogin(false)}
      />
      <SignUp
        open={openSignup}
        handleSignUp={handleSignup}
        handleClose={() => setOpenSignup(false)}
      />
    </Box>
  )
}

export default Header
