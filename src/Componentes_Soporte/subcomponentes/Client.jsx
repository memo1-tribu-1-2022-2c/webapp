import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  Tag,
  AccordionIcon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  propNames,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import ProductsTable from "./ProductTable";

const Client = ({
  client_id,
  CUIT = "cuit de prueba",
  razon_social = "FIUBA",
  refresh
}) => {
  const [products, setProducts] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState(false);

  const client_products = async () => {
    const params = CUIT;

    try {
      const data = await (
        await axios.get("https://modulo-soporte.onrender.com/client/products", {
          params: { query: params },
        })
      ).data;
      setProducts(data.products);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  React.useState(() => {
    client_products();
  });

  return (
    <Accordion allowToggle>
      <AccordionItem bg="white" borderTopRadius={5}>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                _expanded={{ bg: "gray.100" }}
                justifyContent="space-between"
              >
                <Tag size="lg" variant="outline">
                  {razon_social}
                </Tag>
                <Tag size="lg" variant="outline">
                  CUIT: {CUIT}
                </Tag>
                <Tag size="lg" variant="outline">
                  Id cliente: {client_id}
                </Tag>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              bg="white"
              borderTopColor="white"
              justifyContent="center"
            >
              {loading && (
                <Text justifySelf="center">Cargando productos del cliente</Text>
              )}
              {products.length !== 0 && (
                <ProductsTable
                  razon_social={razon_social}
                  client_id={client_id}
                  products={products}
                  refresh={refresh}
                />
              )}
              {!loading && products.length == 0 && !error ? (
                <Text>El cliente no tiene productos</Text>
              ) : null}
              {error ? (
                <Text>
                  Ocurrio un error al cargar los productos del cliente
                </Text>
              ) : null}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default Client;
