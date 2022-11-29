import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const Producto = ({ product = 'producto de prueba', versions = 'version1' }) => {

    console.log(product + versions)

    return (
        <Accordion  allowToggle>
            <AccordionItem bg='gray.200' borderTopRadius={5}>
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.300'}}>
                                <Box pr={14} flex='1' textAlign='left'>
                                {versions} product: {product}
                                </Box>
                                {isExpanded ? (
                                    <Button>Editar Version</Button>
                                ) : (
                                    <Button>Ocultar Edición</Button>
                                )}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg='white' borderTopColor='white' >
                            Soy el cliente {product}
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>

        </Accordion>

    )
}

export default Producto