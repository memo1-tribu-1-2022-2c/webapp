import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Routing from './routes/config';
import Home from './views/home';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path={Routing.Home} element={<Home />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
