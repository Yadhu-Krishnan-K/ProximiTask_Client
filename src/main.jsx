import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter as Router} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './redux/app/store.js'
import {Provider} from 'react-redux'
import ErrorBoundary from './helper/ErrorBoundary.jsx'
import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary >
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null} >
         <ToastContainer />
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
)
