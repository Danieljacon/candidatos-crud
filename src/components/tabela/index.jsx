import React, { useContext } from "react";
import { tabelaCandidatos } from "../../utils/arrays.js";
import { CandidatoContext } from "../../contexts/CandidatoContext.js";
import Excluir from "../excluir/index.jsx";
import Editar from "../editar/index.jsx";
import {
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tag,
  Grid,
  Avatar,
  TagLabel,
  Tooltip,
} from "@chakra-ui/react";
import reactIcon from "../../assets/atom.png";
import cssIcon from "../../assets/css.png";
import htmlIcon from "../../assets/html.png";
import jsIcon from "../../assets/js.png";
import nodeIcon from "../../assets/node.png";

const Tabela = () => {
  const columns = [...tabelaCandidatos];
  const { dados } = useContext(CandidatoContext);

  return (
    <Table variant="striped" size="sm" colorScheme="teal">
      <TableCaption>Registro de candidatos às vagas</TableCaption>
      <Thead>
        <Tr>
          {columns.map((item, index) => {
            return <Th key={index}>{item.headerName}</Th>;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {dados.map((item, index) => {
          return (
            <Tr
              key={index}
              _hover={{
                color: "red.500",
                cursor: "pointer",
              }}
              
            >
              <Td >{item.cpf}</Td>
              <Td>{item.nome}</Td>
              <Td>{item.celular}</Td>
              <Td>{item.email}</Td>
              <Td>{item.sexo}</Td>
              <Td>{item.data}</Td>
              <Td>
                <Grid templateColumns="repeat(2, 80px)" spacing="70px">
                  {item.habilidades.map((hab, index) => {
                    return (
                      <Tooltip key={index} label={hab} placement="left">
                        <Tag m="1px" borderRadius="full">
                          <Avatar
                            src={
                              hab === "CSS"
                                ? cssIcon
                                : hab === "HTML"
                                ? htmlIcon
                                : hab === "JavaScript"
                                ? jsIcon
                                : hab === "Node.js"
                                ? nodeIcon
                                : reactIcon
                            }
                            size="xs"
                            name="Segun Adebayo"
                            ml={-1}
                            mr={2}
                          />
                          <TagLabel fontSize="10px">{hab}</TagLabel>
                        </Tag>
                      </Tooltip>
                    );
                  })}
                </Grid>
              </Td>
              <Td>
                <Stack direction="column" spacing={1}>
                  <Editar item={item} />
                  <Excluir id={item.id} />
                </Stack>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default Tabela;
