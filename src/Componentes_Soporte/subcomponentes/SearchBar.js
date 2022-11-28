import { IconButton, ChakraProvider, Input, HStack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'


const SearchBar = ({searchQuery, setSearchQuery, onSearchClick, placeholder = 'Buscar'} ) => {
  return (
    <HStack>
      <Input variant='outline'
        placeholder = {placeholder}
        htmlSize={40}
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
        icon={<SearchIcon />}
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