import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWallets } from '../store/walletSlice'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Grid, Card, CardContent, IconButton, Stack } from '@mui/material'
import EditWalletModal from '../components/EditWalletModal'
import AddWalletModal from '../components/AddWalletModal'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

const WalletsPage = () => {
  const dispatch = useDispatch()
  const wallets = useSelector(state => state.wallets.wallets)
  const token = useSelector(state => state.auth.token)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await api.get('/wallets', {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(setWallets(response.data))
      } catch (error) {
        console.error('Erro ao buscar carteiras', error)
      }
    }

    fetchWallets()
  }, [dispatch, token])

  const handleOpenEditModal = (wallet) => {
    setSelectedWallet(wallet)
    setOpenEditModal(true)
  }

  const handleDeleteWallet = async (walletId) => {
    if (!window.confirm('Tem certeza que deseja excluir esta carteira?')) return

    try {
      await api.delete(`/wallets/${walletId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      dispatch(setWallets(wallets.filter(wallet => wallet.id !== walletId)))
    } catch (error) {
      console.error('Erro ao excluir carteira:', error)
      alert('Erro ao excluir carteira.')
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Minhas Carteiras</Typography>

      <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
        Criar Nova Carteira
      </Button>

      <Grid container spacing={3} marginTop={2}>
      {wallets.map(wallet => (
        <Grid item xs={12} sm={6} md={4} key={wallet.id}>
          <Card sx={{ height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Stack 
                onClick={() => navigate(`/wallets/${wallet.id}/investments`)} 
                sx={{ cursor: 'pointer', flexGrow: 1 }}
              >
                <Typography 
                  variant="h6"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {wallet.name}
                </Typography>
                <Typography variant="body2">Criado em: {new Date(wallet.createdAt).toLocaleDateString()}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => handleOpenEditModal(wallet)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteWallet(wallet.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

      {selectedWallet && <EditWalletModal open={openEditModal} onClose={() => setOpenEditModal(false)} wallet={selectedWallet} />}
      <AddWalletModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
    </Container>
  )
}

export default WalletsPage
