import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, IconButton, InputAdornment, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'


const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data)
      dispatch(loginSuccess({ token: response.data.token }))
      navigate('/wallets')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Erro ao fazer login. Verifique suas credenciais.')
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="E-mail"
          fullWidth
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          margin="normal"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Entrar
        </Button>

        <Button
          fullWidth
          color="secondary"
          sx={{ mt: 2 }}
          onClick={() => navigate('/register')}
        >
          Criar Conta
        </Button>
      </form>
    </Container>
  )
}

export default LoginPage
