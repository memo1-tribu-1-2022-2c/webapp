import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const Client = ({ cuit = 'cuit de prueba', id = 'id pred', razonSocial = 'FIUBA' }) => {
    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton>
                                <Box pr={14} flex='1' textAlign='left'>
                                razon social: {razonSocial} cuit: {cuit}
                                </Box>
                                {isExpanded ? (
                                    <>Ocultame la rucula</>
                                ) : (
                                    <>Mostrame la rucula</>
                                )}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Soy el cliente {cuit}
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>

        </Accordion>

    )
}

export default Client