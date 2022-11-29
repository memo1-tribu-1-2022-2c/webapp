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
    ])
  }, [props])

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);
  const [data, setData] = useState([]);

  const onSearchClick = async () => {
    setSearchloading(true)


    try {
      const results = await (await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`)).data
      setData(results)
      setSearchloading(false)
    } catch {
      alert("Ese producto no existe!")
    }
    // await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`).then(result => setData(result.data)).catch(alert("No existe ese product id"))
    
  }
  
  useEffect(() => {
      setSearchResults([data])
      console.log("data", data)
    }, [data])

    console.log("test", `https://modulo-soporte.onrender.com/product/${searchQuery}`)

  return (
    <ChakraProvider>
      <HStack>
        <Flex padding={5}>
          <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder='Buscar Producto'
            isLoading={searchloading} />
        </Flex>

        <VStack>
          <Button>Agregar nuevo producto</Button>
          <Button>Agregar nueva version</Button>
        </VStack>
      </HStack>

      <Center>
        <VStack align='flex' padding='0 20px 20px 20px'>
          {searchResults.length !== 0 && searchResults.map((product) => {
            return <Producto key={product.product_id} product={product.product} versions={product.versions} />
          })}
        </VStack>
      </Center>

    </ChakraProvider>
  )
}

export default Productos