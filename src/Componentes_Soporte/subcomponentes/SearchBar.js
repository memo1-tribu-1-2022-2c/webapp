import { IconButton, ChakraProvider, Input, HStack, Spinner  } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'


const SearchBar = ({searchQuery, setSearchQuery, onSearchClick, placeholder = 'Buscar', isLoading} ) => {
  return (
    <HStack>
      <Input variant='outline'
        placeholder = {placeholder}
        htmlSize={40}
        bg="white"
        width='auto'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={event => {
          if (event.key === 'Enter' && searchQuery) {
            onSearchClick();
          }
        }}
      />
      <IconButton
        icon={ isLoading ? <Spinner /> : <SearchIcon />}
        onClick= {e => {
          if (searchQuery) {
            onSearchClick();
          }
        }}
        />
    </HStack>
  )
}

export default SearchBar