import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInvestments, deleteInvestment } from '../store/investmentSlice'
import { api } from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon} from '@mui/icons-material'
import AddInvestmentModal from '../components/AddInvestmentModal'

const InvestmentsPage = () => {
  const { walletId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const investments = useSelector(state => state.investments.investments)
  const token = useSelector(state => state.auth.token)
  const wallets = useSelector(state => state.wallets.wallets)
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const wallet = wallets.find(wallet => wallet.id === walletId)

  useEffect(() => {
      if (!walletId) return
    
      const fetchInvestments = async () => {
        setLoading(true)
        setError(null)
    
        try {
          const response = await api.get(`/investments/${walletId}`, {  
            headers: { Authorization: `Bearer ${token}` }
          })
          dispatch(setInvestments(response.data))
        } catch (error) {
          console.error('Erro ao buscar investimentos:', error)
          setError('Erro ao carregar investimentos. Tente novamente.')
        } finally {
          setLoading(false)
        }
      }
    
      fetchInvestments()
  }, [dispatch, token, walletId])
  
  
  const handleDeleteInvestment = async (investmentId) => {
    if (!window.confirm('Tem certeza que deseja excluir este investimento?')) return
  
    dispatch(deleteInvestment(investmentId))
  
    try {
      await api.delete(`/investments/${investmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error) {
      console.error('Erro ao excluir investimento:', error)
      alert('Erro ao excluir investimento. Atualize a página para sincronizar.')
    }
  }
  

  return (
    <Container>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/wallets')} 
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>
      <Typography variant="h4" gutterBottom>
      {wallet ? `Investimentos na carteira: ${wallet.name}` : 'Investimentos'}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>Adicionar Investimento</Button>

    {loading && <Typography>Carregando investimentos...</Typography>}

    {error && <Typography color="error">{error}</Typography>}

    {!loading && !error && investments.length === 0 && (
      <Typography>Nenhum investimento encontrado.</Typography>
    )}
      <List sx={{ marginTop: 2 }}>
        {investments.map(investment => (
          <ListItem key={investment.id}>
            <ListItemText
              primary={investment.name}
              secondary={`Valor: R$${investment.amount.toLocaleString()}`}
            />
            <IconButton onClick={() => handleDeleteInvestment(investment.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <AddInvestmentModal open={openModal} onClose={() => setOpenModal(false)} walletId={walletId} />
    </Container>
  )
}

export default InvestmentsPage
