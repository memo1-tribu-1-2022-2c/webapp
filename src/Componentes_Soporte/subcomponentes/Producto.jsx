import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Card, CardHeader, Flex, HStack, Text, Badge, Tag } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Version from './Version';

const Producto = ({product_id, product = 'producto de prueba', versions = 'version1' }) => {

    

    return (
        <>
        <Card marginBottom="2%" padding="1%" marginTop="2%" bg="white" width="40%" maxHeight="80%" alignSelf="center">
        <CardHeader >
            <Flex flex="1" justifyContent="center" alignContent="center" fontWeight="bold">
                {product}
            </Flex>
            <Flex flex="1" justifyContent="center" alignContent="center" fontWeight="bold">
                (id: {product_id})
            </Flex>
        </CardHeader>
        <Flex flexDirection="column" width="100%" overflow="scroll">
        <Accordion  allowToggle overflow="scroll">
            {versions.map(version => {
                return (<AccordionItem bg='gray.100' justifyContent="space-between" borderTopRadius={5} margin="2%" alignSelf="center">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton justifyContent="space-between" _expanded={{ bg: 'gray.200'}}>
                            
                            <Tag padding="1%" size="md" colorScheme="blue" variant="outline" fontWeight="bold">Version: {version.number}</Tag>
                            
                            <AccordionIcon/>
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
        </Flex>
        </Card>

        </>
    )
}

export default Producto