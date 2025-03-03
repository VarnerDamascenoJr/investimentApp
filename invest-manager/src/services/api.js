import axios from 'axios'
import { store } from '../store'
import { logout } from '../store/authSlice'

const API_URL = 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_URL
})

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password })
        return response.data
      } catch (error) {
        console.error('Erro ao fazer login:', error.response?.data || error.message)
        throw error
      }
}

export const register = async (email, name, password) => {
  const response = await api.post('/auth/register', { email, name, password })
  return response.data
}

api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        store.dispatch(logout())
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
