import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Button, Tag, AccordionIcon } from '@chakra-ui/react'
import React from 'react'

const Client = ({ CUIT = 'cuit de prueba', razon_social = 'FIUBA' }) => {

    console.log(CUIT + razon_social)

    return (
        <Accordion  allowToggle>
            <AccordionItem bg='white' borderTopRadius={5}>
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.100'}} justifyContent="space-between">
                                <Tag size="lg" variant="outline" >{razon_social}</Tag>
                                <Tag size="lg" variant="outline">CUIT: {CUIT}</Tag>
                                <AccordionIcon />
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