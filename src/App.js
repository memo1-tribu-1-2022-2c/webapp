import './App.css';
import { Routes, Route} from 'react-router-dom';
import Clientes from './Componentes_Soporte/Clientes';
import Productos from './Componentes_Soporte/Productos';
import Tickets from './Componentes_Soporte/Tickets';
import NavbarGeneral from './Componentes_Soporte/NavbarGeneral';

function App() {
  //const location = useLocation();
  return (
    <>
      <NavbarGeneral />
      <Routes>
        <Route path="clientes" element={<Clientes />} />
        <Route path="productos" element={<Productos />} />
        <Route path="tickets" element={<Tickets />} />
      </Routes>
    </>
  );
}

export default App;
