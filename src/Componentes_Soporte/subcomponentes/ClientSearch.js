import { Flex, useToast, Input, IconButton, VStack, SimpleGrid, Center } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import SearchBar from './/SearchBar';
import Client from './Client';

const ClientSearch = (props) => {

  return (
    <>
      <SearchBar searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
        onSearchClick={props.onSearchClick}
        placeholder='Buscar Cliente' 
        isLoading = {props.searchloading}/>
    </>
  )
}

export default ClientSearch