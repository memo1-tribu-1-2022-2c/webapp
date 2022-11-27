import { ChakraProvider, Flex } from '@chakra-ui/react'
import React from 'react'

const Cliente = () => {
  return (
    <ChakraProvider>
      <Flex align='center' bgColor='gray.100'
      maxWidth={900}
      outline= 'medium'>
        <div>Cliente 1</div>
      </Flex>
    </ChakraProvider>
  )
}

export default Cliente