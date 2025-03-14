
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'antd/dist/reset.css' // Import Ant Design styles
import './styles/main.css' // Import our custom CSS
import './styles/login.css' // Keep the login styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
