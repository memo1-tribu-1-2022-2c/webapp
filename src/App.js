import './App.css';
import { Routes, Route} from 'react-router-dom';
import Clientes from './Clientes';
import Productos from './Productos';
import Tickets from './Tickets';
import NavbarGeneral from './NavbarGeneral';

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
