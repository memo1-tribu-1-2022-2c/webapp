import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Clientes from './Clientes';
import Productos from './Productos';
import Tickets from './Tickets';
import Navbar from './Navbar';

function App() {
  //const location = useLocation();
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route index element={<Navigate to="/home" state={{ from: location }} replace />} /> */}
        <Route path="clientes" element={<Clientes />} />
        <Route path="productos" element={<Productos />} />
        <Route path="tickets" element={<Tickets />} />
      </Routes>
    </>
  );
}

export default App;
