import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Routing from './routes/config';
import Home from './views/home';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path={Routing.Home} element={<Home />} />
          <Route path={Routing.Soporte} element={<Home />} />
          <Route path={Routing.Recursos} element={<Home />} />
          <Route path={Routing.Proyectos} element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;
