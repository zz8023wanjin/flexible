import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import flexible from '@rain-star/flexible'

flexible({
  rootValue: 16,
  designDevice: [
    {
      deviceRange: (curWidth) => curWidth < 440,
      UIWidth: 375,
    },
    {
      deviceRange: (curWidth) => curWidth >= 440 && curWidth < 960,
      UIWidth: 960,
    },
    {
      deviceRange: (curWidth) => curWidth >= 960,
      UIWidth: 1920,
    },
  ],
})

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
