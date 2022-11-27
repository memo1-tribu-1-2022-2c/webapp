import { IconButton, ChakraProvider, Input, HStack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'


const SearchBar = () => {
    return (
      <ChakraProvider>
        <HStack>
            <Input placeholder='Buscar Cliente' />
            <IconButton aria-label='Search database' icon={<SearchIcon />} />
        </HStack>
      </ChakraProvider>
    )
  }

  export default SearchBar