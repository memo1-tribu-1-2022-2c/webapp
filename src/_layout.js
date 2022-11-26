import React from 'react'
import { Flex } from '@chakra-ui/react'
import {
    Routes,
    Route,
    Navigate
  } from 'react-router-dom'
import Proyects from './pages/Proyects'


function _layout () {


return (
    <>
        <Flex as='main' maxH='full' overflow='scroll' overflowX='hidden' w='full' direction='column'>
            <Routes>
                <Route path='/proyects' element={<Proyects/>} />
            </Routes>
        </Flex>
    </>
    )
}

  export default _layout