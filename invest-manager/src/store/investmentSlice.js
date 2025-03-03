import { createSlice } from '@reduxjs/toolkit'

const investmentSlice = createSlice({
  name: 'investments',
  initialState: {
    investments: [],
  },
  reducers: {
    setInvestments: (state, action) => {
      state.investments = action.payload
    },
    addInvestment: (state, action) => {
      state.investments.push(action.payload)
    },
    updateInvestment: (state, action) => {
        const index = state.investments.findIndex(inv => inv.id === action.payload.id)
        if (index !== -1) {
          state.investments[index] = action.payload
        }
    },
    deleteInvestment: (state, action) => {
      state.investments = state.investments.filter(inv => inv.id !== action.payload)
    }
  }
})

export const { setInvestments, addInvestment, updateInvestment, deleteInvestment } = investmentSlice.actions
export default investmentSlice.reducer
