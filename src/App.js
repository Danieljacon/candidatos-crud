import Pesquisar from "./components/pesquisar";
import Registrar from "./components/registrar";
import Tabela from "./components/tabela";
import { Center, Container, Divider, Stack, VStack } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Container maxW="sm" centerContent p={10}>
        <Stack direction={["row"]} spacing="7px">
          <Pesquisar />
          <Registrar />
        </Stack>
        <Tabela />
      </Container>
    </ChakraProvider>
  );
}

export default App;
