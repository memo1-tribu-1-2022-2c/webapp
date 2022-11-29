import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const Client = ({ CUIT = 'cuit de prueba', razon_social = 'FIUBA' }) => {

    console.log(CUIT + razon_social)

    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton>
                                <Box pr={14} flex='1' textAlign='left'>
                                razon social: {razon_social} cuit: {CUIT}
                                </Box>
                                {isExpanded ? (
                                    <>Ocultame la rucula</>
                                ) : (
                                    <>Mostrame la rucula</>
                                )}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Soy el cliente {CUIT}
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>

        </Accordion>

    )
}

export default Client