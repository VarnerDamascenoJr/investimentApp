import { BrowserRouter as Router} from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import './App.css'
import Header from './components/Header'
import AppRoutes from './components/AppRoutes'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
//https://github.com/VarnerDamascenoJr/investimentApp