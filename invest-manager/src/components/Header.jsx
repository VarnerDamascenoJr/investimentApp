import { useLocation } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import LogoutButton from '../components/LogoutButton'

const Header = () => {
  const location = useLocation()
  const hideLogout = location.pathname === '/login' || location.pathname === '/register'

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent="space-between" 
      p={2} 
      sx={{ width: '100%' }}
    >
      <Typography variant="h2" fontWeight="bold">
        Invest Manager
      </Typography>
      {!hideLogout && <LogoutButton />}
    </Stack>
  )
}

export default Header
