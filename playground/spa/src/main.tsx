import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import flexible from '@rain-star/flexible'

flexible(16)

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
