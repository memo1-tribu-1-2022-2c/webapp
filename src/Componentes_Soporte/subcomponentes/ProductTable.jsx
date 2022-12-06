import {
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import SoporteBadge from "./SoporteBadge";

export default function ProductsTable(props) {
  return (
    <TableContainer>
      <Table justifyContent="space-between">
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Version</Th>
            <Th>Estado de version</Th>
            <Th>Proyecto de soporte</Th>
            <Th>Tickets</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.products.map((producto) => {
            return producto.versions.map((version) => {
              return (
                <Tr>
                  <Td>{producto.product}</Td>
                  <Td>{version.number}</Td>
                  <Td>{version.state}</Td>
                  <SoporteBadge
                    razon_social={props.razon_social}
                    client_id={props.client_id}
                    version={version}
                    product_name={producto.product}
                    refresh={props.refresh}
                  />
                </Tr>
              );
            });
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
