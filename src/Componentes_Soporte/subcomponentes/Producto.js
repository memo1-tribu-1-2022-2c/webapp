import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const Producto = ({ CUIT = 'cuit de prueba', razon_social = 'FIUBA' }) => {

    console.log(CUIT + razon_social)

    return (
        <Accordion  allowToggle>
            <AccordionItem bg='gray.200' borderTopRadius={5}>
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.300'}}>
                                <Box pr={14} flex='1' textAlign='left'>
                                {razon_social} cuit: {CUIT}
                                </Box>
                                {isExpanded ? (
                                    <Button>Editar Version</Button>
                                ) : (
                                    <Button>Ocultar Edición</Button>
                                )}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg='white' borderTopColor='white' >
                            Soy el cliente {CUIT}
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>

        </Accordion>

    )
}

export default Producto