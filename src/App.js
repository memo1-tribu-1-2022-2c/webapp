import './App.css';
import Clientes from './Componentes_Soporte/Clientes';
import Productos from './Componentes_Soporte/Productos';
import Tickets from './Componentes_Soporte/Tickets';
import { ChakraProvider } from '@chakra-ui/react'
import {   
  Routes,
  Route,
  Navigate ,
} from 'react-router-dom';
import Home from './views/home';


function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
        <Routes>
          <Route path= '/' element={<Navigate to= "home"  />} />
          <Route path = 'home' element={<Home />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="productos" element={<Productos />} />
          <Route path="tickets" element={<Tickets />} />
        </Routes>
      {/*
      <Center padding={8}>
        <VStack spacing={7}>
          <Heading>Soporte</Heading>
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="5em">
              <Tab>Clientes</Tab>
              <Tab>Productos</Tab>
              <Tab>Tickets</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Clientes/>
              </TabPanel>
              <TabPanel>
                <Productos/>
              </TabPanel>
              <TabPanel>
                <Tickets/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Center>
    */}
    </ChakraProvider>
  )
}
export default App;
