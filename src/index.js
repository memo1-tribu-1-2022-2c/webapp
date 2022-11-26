import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './_layout'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)