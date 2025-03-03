import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import WalletsPage from '../pages/WalletsPage'
import InvestmentsPage from '../pages/InvestmentsPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/wallets" element={<PrivateRoute><WalletsPage /></PrivateRoute>} />
      <Route path="/wallets/:walletId/investments" element={<PrivateRoute><InvestmentsPage /></PrivateRoute>} />
    </Routes>
  )
}

export default AppRoutes
