import { Box, Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'

const SignUp = ({ open, handleClose, handleSignUp }) => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
  })

  const handleInput = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value })
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
          label="Name"
          name="name"
          variant="filled"
          onChange={handleInput}
        />
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
        <TextField
          id="filled-basic"
          label="Re-enter Password"
          variant="filled"
          name="repassword"
          onChange={handleInput}
        />
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', pt: 2 }}>
          <Button
            variant="contained"
            sx={{
              p: 1,
              width: 100,
              backgroundColor: '#0696FF',
              textTransform: 'none',
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              p: 1,
              width: 100,
              backgroundColor: '#0696FF',
              textTransform: 'none',
            }}
            onClick={() => handleSignUp(signupData)}
          >
            SignUp
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

export default SignUp
