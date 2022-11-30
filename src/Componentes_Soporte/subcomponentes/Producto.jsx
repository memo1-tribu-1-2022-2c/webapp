import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Card, CardHeader, Flex, HStack } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const Producto = ({ product_id, product = 'producto de prueba', versions = 'version1' }) => {

    

    return (
        <>
        <Card marginBottom="2%" padding="1%" marginTop="2%" bg="white" width="40%" height="60%" alignSelf="center">
        <CardHeader >
            <Flex flex="1" justifyContent="center" alignContent="center" fontWeight="bold">
                {product}
            </Flex>
            <Flex flex="1" justifyContent="center" alignContent="center" fontWeight="bold">
                (id: {product_id})
            </Flex>
        </CardHeader>
        <Accordion  allowToggle>
            
            {versions.map(version => {
                return (<AccordionItem bg='gray.100' borderTopRadius={5} margin="2%" alignSelf="center">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.400'}}>
                            <Box pr={14} flex='1' textAlign='left'>
                                Version: {version.number}
                            </Box>
                                {isExpanded ? (
                                    <Button bg="gray.300">Ocultar informacion</Button>
                                ) : (
                                    <Button>Mostrar informacion</Button>
                                )}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg='gray.200' borderTopColor='white' >
                            <p>Id de version: {version.version_id}</p>
                            <p>Estado de soporte: {version.state}</p>
                        </AccordionPanel>
                    </>
                )}
                
            </AccordionItem>)
            })}
            
        </Accordion>
        </Card>

        </>
    )
}

export default Producto