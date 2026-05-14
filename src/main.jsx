import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import store from './store'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
            }
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
