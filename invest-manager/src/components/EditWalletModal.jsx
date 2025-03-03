import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateWallet } from '../store/walletSlice'
import { api } from '../services/api'
import { Button, Modal, Box, TextField, Typography } from '@mui/material'

const EditWalletModal = ({ open, onClose, wallet }) => {
  const [walletName, setWalletName] = useState('') 
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (wallet) {
      setWalletName(wallet.name)
    }
  }, [wallet])

  const handleEditWallet = async () => {
    if (!walletName) return alert('Digite um nome para a carteira.')

    try {
      const response = await api.patch(`/wallets/${wallet.id}`, { name: walletName }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(updateWallet(response.data))
      onClose()
    } catch (error) {
      console.error('Erro ao editar carteira:', error)
      alert('Erro ao editar carteira.')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', 
        p: 4, borderRadius: 2, boxShadow: 24 
      }}>
        <Typography variant="h6" gutterBottom>Editar Carteira</Typography>
        <TextField 
          label="Nome da Carteira" fullWidth 
          value={walletName} onChange={(e) => setWalletName(e.target.value)}
          margin="normal"
        />
        <Button 
          variant="contained"
          color="primary"
          onClick={handleEditWallet} 
          fullWidth
          >
            Salvar
        </Button>
      </Box>
    </Modal>
  )
}

export default EditWalletModal
