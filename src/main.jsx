import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {store} from './redux/app/store.js'
import {Provider} from 'react-redux'
import ErrorBoundary from './helper/ErrorBoundary.jsx'
import { ToastContainer } from 'react-toastify'
ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary >
      <Provider store={store}>
         <ToastContainer />
        <Router>
          <App />
        </Router>
      </Provider>
    </ErrorBoundary>
)
