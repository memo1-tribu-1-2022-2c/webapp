import { ChakraProvider, Flex, HStack, VStack, Center, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import SearchBar from './subcomponentes/SearchBar';
import axios from "axios";
import Producto from './subcomponentes/Producto';
import Routing from '../routes/config';

export const Productos = (props) => {

  React.useEffect(() => {
    props.setNavigation([
      [Routing.Tickets, "Tickets"],
      [Routing.Clientes, "Clientes"],
      [Routing.Productos, "Productos"],
    ]);
    props.setTitle("Productos")
  }, [])

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);
  const [data, setData] = useState([]);

  const onSearchClick = async () => {
    setSearchloading(true)


    try {
      
      const results = await (await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`)).data
      
      setSearchResults([results])
    } catch {
      alert("Ese producto no existe!")
    }
    setSearchloading(false)
    // await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`).then(result => setData(result.data)).catch(alert("No existe ese product id"))
    
  }
  
  

  return (
    <ChakraProvider>
      <HStack marginLeft="1%" marginTop="1%" width="98%" height="5%" bg="gray.300" justifyContent="space-between" padding="1%">
        <Flex padding={5}>
          <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder='Id del producto'
            isLoading={searchloading} 
            />
        </Flex>

        {searchResults.length !== 0 && 
        <Button  width="15%" bg="gray.100" fontWeight="bolder">Agregar nueva version</Button>}
        
        <Button width="15%">Agregar nuevo producto</Button>
        
      </HStack>

      <Center width="98%" height="72%" bg="gray.300" position="fixed" left="1%" top="25%">
        <HStack width="100%" alignContent='center' justifyContent="center">
          {searchResults.length !== 0 && searchResults.map((product) => {
            return (<>
                      <Producto key={product.product_id} product_id={product.product_id} product={product.product} versions={product.versions} />
                      
                    </>)
          })}
        </HStack>
      </Center>

    </ChakraProvider>
  )
}

export default Productos