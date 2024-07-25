import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query'
import { Provider } from 'react-redux';
import store from './store'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
      <Router>
    <App />
    </Router>
        </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)

