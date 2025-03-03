import { createSlice } from '@reduxjs/toolkit'

const walletSlice = createSlice({
  name: 'wallets',
  initialState: {
    wallets: [],
  },
  reducers: {
    setWallets: (state, action) => {
      state.wallets = Array.isArray(action.payload) ? action.payload : state.wallets
    },
    addWallet: (state, action) => {
      state.wallets.push(action.payload)
    },
    updateWallet: (state, action) => {
      const index = state.wallets.findIndex(w => w.id === action.payload.id)
      if (index !== -1) {
        state.wallets[index] = action.payload
      }
    }
  }
})

export const { setWallets, addWallet, updateWallet } = walletSlice.actions
export default walletSlice.reducer