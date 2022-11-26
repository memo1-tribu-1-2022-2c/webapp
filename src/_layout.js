import React from 'react'
import { Flex } from '@chakra-ui/react'
import {
    Routes,
    Route
  } from 'react-router-dom'
import Proyects from './pages/proyects'
import CreateProyect from './pages/createProyect'


function _layout () {


return (
    <>
        <Flex as='main' maxH='full' overflowX='hidden' w='full' direction='column'>
            <Routes>
                <Route path='/proyectos' element={<Proyects/>} />
                <Route path='/proyectos/crearProyecto' element={<CreateProyect/>} />
            </Routes>
        </Flex>
    </>
    )
}

  export default _layout