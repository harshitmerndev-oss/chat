import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
export const serverUrl="https://realtimeconvoai.onrender.com"
import { Provider } from "react-redux"
import { store } from './redux/store.js'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    
      <App />
   
  </Provider>
</BrowserRouter>
)
