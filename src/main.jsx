import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import store from './redux/app/store.js'
import {Provider} from 'react-redux'
import ErrorBoundary from './helper/ErrorBoundary.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ErrorBoundary>
)
