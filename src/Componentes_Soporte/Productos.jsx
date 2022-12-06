import {
  ChakraProvider,
  Flex,
  HStack,
  Center,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "./subcomponentes/SearchBar";
import axios from "axios";
import Producto from "./subcomponentes/Producto";
import Routing from "../routes/config";
import NewVersion from "./subcomponentes/NewVersion";
import NewProduct from "./subcomponentes/NewProduct";
import AlertPopUp from "./subcomponentes/AlertPopUp";

export const Productos = (props) => {
  React.useEffect(() => {
    props.setNavigation([
      [Routing.Tickets, "Tickets"],
      [Routing.Clientes, "Clientes"],
      [Routing.Productos, "Productos"],
    ]);
    props.setTitle("Productos");
    
  }, []);

  React.useEffect(() => {
    loadProducts()
  }, [])

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);
  const [products, setProducts] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadProducts = async () => {
      
      try{
          const products = await (await axios.get("https://modulo-soporte.onrender.com/product")).data
          setProducts(products.products);
      }catch{

      }
  }
  
  const loadNewProduct = async (new_product) => {
    setSearchResults([new_product]);
    loadProducts();
    setSearchQuery(new_product.product_id);
  };

  const onSearchClick = async () => {
    setSearchloading(true);

    try {
      const results = await (
        await axios.get(
          `https://modulo-soporte.onrender.com/product/${searchQuery}`
        )
      ).data;

      setSearchResults([results]);
    } catch {
      onOpen();
    }
    setSearchloading(false);
    // await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`).then(result => setData(result.data)).catch(alert("No existe ese product id"))
  };

  return (
    <ChakraProvider>
      <AlertPopUp
        isOpen={isOpen}
        onClose={onClose}
        title="Producto no econtrado"
        body="No se encontro un producto con ese id"
      />
      <HStack
        marginLeft="1%"
        marginTop={2}
        width="98%"
        height="5%"
        bg="gray.300"
        justifyContent="space-between"
        padding={4}
      >
        <Flex padding={5}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder="Id del producto"
            isLoading={searchloading}
          />
        </Flex>

        <Select bg="white" width="20%" onChange={(e) => {setSearchQuery(e.target.value)}}>
            <option value="">Seleccione un producto</option>
            {products.map(product => {
              return <option value={product.product_id}>{product.product} (id: {product.product_id})</option>
            })}
        </Select>

        {searchResults.length !== 0 && (
          <NewVersion product={searchResults[0]} new_version={onSearchClick} />
        )}

        <NewProduct loadNewProduct={loadNewProduct} />
      </HStack>

      <Center
        width="98%"
        height="72%"
        bg="gray.300"
        position="fixed"
        left="1%"
        top="190px"
      >
        <HStack
          width="100%"
          height="90%"
          alignContent="center"
          justifyContent="center"
        >
          {searchResults.length !== 0 &&
            searchResults.map((product) => {
              return (
                <>
                  <Producto
                    key={product.product_id}
                    product_id={product.product_id}
                    product={product.product}
                    versions={product.versions}
                  />
                </>
              );
            })}
        </HStack>
      </Center>
    </ChakraProvider>
  );
};

export default Productos;
