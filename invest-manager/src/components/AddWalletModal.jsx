import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWallet } from '../store/walletSlice'
import { api } from '../services/api'
import { Button, Modal, Box, TextField, Typography } from '@mui/material'

const AddWalletModal = ({ open, onClose }) => {
  const [walletName, setWalletName] = useState('')
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (open) {
      setWalletName('')
    }
  }, [open])

  const handleCreateWallet = async () => {
    if (!walletName) return alert('Digite um nome para a carteira.')
  
    try {
      const response = await api.post('/wallets', { name: walletName }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      dispatch(addWallet(response.data))
      onClose()
    } catch (error) {
      console.error('Erro ao criar carteira:', error)
      alert('Erro ao criar carteira.')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', 
        p: 4, borderRadius: 2, boxShadow: 24 
      }}>
        <Typography variant="h6" gutterBottom>Nova Carteira</Typography>
        <TextField 
          label="Nome da Carteira" fullWidth 
          value={walletName} onChange={(e) => setWalletName(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateWallet} fullWidth>Criar</Button>
      </Box>
    </Modal>
  )
}

export default AddWalletModal
