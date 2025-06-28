// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from './context/shopContextProvider.jsx';
// import Home from './Pages/Home.jsx';

createRoot(document.getElementById('root')).render(
<ShopContextProvider>
  <BrowserRouter>
    <App />  
  </BrowserRouter> 
</ShopContextProvider>
)
