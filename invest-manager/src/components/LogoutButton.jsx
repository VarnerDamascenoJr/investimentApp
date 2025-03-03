import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Button 
      variant="contained"
      color="info"
      size="small"
      onClick={handleLogout}
      >
      Logout
    </Button>
  )
}

export default LogoutButton
