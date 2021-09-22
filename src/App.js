import React from 'react';
import {
  ChakraProvider,
  Flex,
  Container,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import WithSubnavigation from "./navbar";
import SmallWithSocial from "./footer";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minHeight="100vh">
        <WithSubnavigation/>
        <Flex flex="1" direction="column" justifyContent="center">
          <Container>
            This is content.
          </Container>
        </Flex>
        <SmallWithSocial/>
      </Flex>
      {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box> */}
    </ChakraProvider>
  );
}

export default App;
