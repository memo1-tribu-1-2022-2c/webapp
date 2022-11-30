import React, { useState, useEffect } from 'react'
<<<<<<< HEAD
import { ChakraProvider, Flex, HStack, VStack, Box } from '@chakra-ui/react'
=======
import { ChakraProvider, Flex, VStack } from '@chakra-ui/react'
>>>>>>> 9fa86b8f7dec8514376ed9834287d1e56320a0fc
import SearchBar from './subcomponentes/SearchBar';
import Client from './subcomponentes/Client';
import axios from "axios";
import Routing from '../routes/config';

export const Clientes = (props) => {

  React.useEffect(() => {
    props.setNavigation([
      [Routing.Tickets, "Tickets"],
      [Routing.Clientes, "Clientes"],
      [Routing.Productos, "Productos"],
<<<<<<< HEAD
    ]);
    props.setTitle("Clientes")
  }, [])
=======
    ])
  }, [props])
>>>>>>> 9fa86b8f7dec8514376ed9834287d1e56320a0fc

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);

  const onSearchClick = async () => {
    setSearchloading(true)

    const data = await (await axios.get(`https://modulo-soporte.onrender.com/client/search?query=${searchQuery}`)).data

    setSearchResults([data])

    setSearchloading(false)
  };

  useEffect(() => {
    const funcion = async () => {
      const result = await (await axios.get("https://modulo-soporte.onrender.com/clients")).data
      setSearchResults(result.clients)
      console.log(result);
    }
    funcion()
  }
    , []);

  return (
    <ChakraProvider>
        <Flex padding={5}>
          <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder='Buscar Cliente'
            isLoading={searchloading} />
        </Flex>
        <VStack align='flex' padding='0 20px 20px 20px'>
          {searchResults.length !== 0 && searchResults.map((client) => {
            return <Client key={client.id} CUIT={client.CUIT} razon_social={client.razon_social} />
          })}
        </VStack>
    </ChakraProvider>
  )
}

export default Clientes