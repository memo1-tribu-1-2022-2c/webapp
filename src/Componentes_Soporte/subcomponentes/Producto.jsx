import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Card, CardHeader, Flex, HStack, Text, Badge } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Version from './Version';

const Producto = ({product_id, product = 'producto de prueba', versions = 'version1' }) => {

    

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
        <Accordion  allowToggle overflow="auto">
            
            {versions.map(version => {
                return (<AccordionItem bg='gray.100' justifyContent="space-between" borderTopRadius={5} margin="2%" alignSelf="center">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.200'}}>
                            <Box pr={14} flex='1' textAlign='left'>
                                <Badge colorScheme="blue" variant="outline">Version: {version.number}</Badge>
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg='gray.100' borderTopColor='white' >
                            <Version version={version}/>
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