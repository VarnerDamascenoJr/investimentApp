import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import walletReducer from './walletSlice'
import investmentReducer from './investmentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallets: walletReducer,
    investments: investmentReducer
  }
})
