import { Flex, useToast, Input, IconButton, VStack, SimpleGrid } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import SearchBar from './/SearchBar';
import axios from "axios";
import Client from './Client';



const ClientSearch = ({ refreshData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const clientAddedToast = useToast();

  const onSearchClick = async () => {
    axios.get(`https://modulo-soporte.onrender.com/client/search?query=${searchQuery}`)
      .then(response => {
        setSearchResults(response.data);
        refreshData(response.data);
        clientAddedToast({
          title: "Búsqueda exitosa",
          description: "Se encontraron los siguientes clientes",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      })
  };

  return (
    <>
      <SearchBar searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchClick={onSearchClick}
        placeholder='Buscar Cliente' />


    </>
  )
}


export default ClientSearch