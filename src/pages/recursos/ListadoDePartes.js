import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";

import ParteDeHorasCard from "../../components/ParteDeHorasCard";
import {useNavigateWParams} from "../../routes/navigation";

function ListadoDePartes(props) {
  const navigate = useNavigateWParams();
  const crearParte = () => {
    navigate("crear");
  };
  const partes = props.partes;
  return (
    <>
      <Flex>
        <Button onClick={crearParte}>CrearParte</Button>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {partes.map((value, index) => (
          <GridItem
            bg="white"
            key={index}
            w="70%"
            h="150"
            border="0px"
            rounded={"md"}
          >
            <ParteDeHorasCard info={value} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default ListadoDePartes;
