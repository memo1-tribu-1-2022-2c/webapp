import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function ProductsTable(props) {
  return (
    <TableContainer>
      <Table justifyContent="space-between">
        <Thead>
          <Tr>
            <Th>Producto</Th>
            <Th>Version</Th>
            <Th>Estado de version</Th>
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
                </Tr>
              );
            });
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
