import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import SocketContextProvider from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <ToastContainer />
        <App />
      </SocketContextProvider>
    </Provider>
  </StrictMode>,
)
