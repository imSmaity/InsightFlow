import { Box, Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'

// 0696FF

const Login = ({ open, handleClose, handleLogin }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          id="filled-basic"
          label="Email"
          name="email"
          variant="filled"
          onChange={handleInput}
        />
        <TextField
          id="filled-basic"
          label="Password"
          name="password"
          variant="filled"
          onChange={handleInput}
        />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pt: 2 }}>
          <Button
            variant="contained"
            disableElevation
            sx={{
              p: 1,
              width: 100,
              backgroundColor: '#0696FF',
              textTransform: 'none',
            }}
            onClick={() => handleLogin(loginData)}
          >
            Login
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              p: 1,
              width: 150,
              backgroundColor: '#0696FF',
              textTransform: 'none',
            }}
            onClick={() =>
              handleLogin({ email: 'guest@gmail.com', password: 'guest' })
            }
          >
            Guest Login
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}
export default Login
