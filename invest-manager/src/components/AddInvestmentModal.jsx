import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addInvestment, updateInvestment } from '../store/investmentSlice'
import { api } from '../services/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Modal, Box, TextField, Typography, Autocomplete } from '@mui/material'

const investmentSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  amount: z.preprocess(
    (val) => Number(val) || 0, 
    z.number().min(1, 'O valor deve ser maior que 0')
  )
})

const AddInvestmentModal = ({ open, onClose, walletId }) => {
  const dispatch = useDispatch()
  const investments = useSelector(state => state.investments.investments)
  const token = useSelector(state => state.auth.token)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      name: '',
      amount: ''
    }
  })

  const [investmentName, setInvestmentName] = useState('')
  const amount = watch('amount')

  useEffect(() => {
    if (open) {
      reset()
      setInvestmentName('')
    }
  }, [open, reset])

  const onSubmit = async (data) => {
    const existingInvestment = investments.find(inv => inv.name.toLowerCase() === data.name.toLowerCase())

    try {
      if (existingInvestment) {

        const updatedAmount = existingInvestment.amount + Number(data.amount)

        const response = await api.patch(`/investments/${existingInvestment.id}`, { 
          name: data.name,
          amount: updatedAmount
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        dispatch(updateInvestment(response.data))
      } else {

        const response = await api.post('/investments', { 
          walletId, 
          name: data.name, 
          amount: Number(data.amount) 
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        dispatch(addInvestment(response.data))
      }

      onClose()
    } catch (error) {
      console.error('Erro ao adicionar ou atualizar investimento:', error)
      alert('Erro ao adicionar ou atualizar investimento.')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', 
        transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', 
        p: 4, borderRadius: 2, boxShadow: 24 
      }}>
        <Typography variant="h6" gutterBottom>Novo Investimento</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Autocomplete
            freeSolo
            options={[...new Set(investments.map(inv => inv.name))]}
            value={investmentName}
            onChange={(event, newValue) => {
              setInvestmentName(newValue || '')
              setValue('name', newValue || '')
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Nome do Investimento" 
                fullWidth 
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <TextField 
            label="Valor"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setValue('amount', e.target.value)}
            margin="normal"
            {...register('amount')}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isValid}>
            Investir
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default AddInvestmentModal
