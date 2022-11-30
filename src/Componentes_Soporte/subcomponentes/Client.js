import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Button } from '@chakra-ui/react'
import React from 'react'

const Client = ({ CUIT = 'cuit de prueba', razon_social = 'FIUBA' }) => {

    console.log(CUIT + razon_social)

    return (
        <Accordion  allowToggle>
            <AccordionItem bg='white' borderTopRadius={5}>
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.100'}}>
                                <Box pr={14} flex='1' textAlign='left'>
                                {razon_social} cuit: {CUIT}
                                </Box>
                                {isExpanded ? (
                                    <Button>Ocultar Productos</Button>
                                ) : (
                                    <Button>Ver Productos</Button>
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

export default Client