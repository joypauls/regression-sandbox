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
  Heading,
  theme,
} from '@chakra-ui/react';
import {useRoutes} from 'hookrouter';


import { ColorModeSwitcher } from './ColorModeSwitcher';


import { Logo } from './Logo';

import WithSubnavigation from "./navbar";
import SmallWithSocial from "./footer";
import Plot from "./plot"

const Main = () => {
  return (
    <Plot/>
  );
}

const Foundation = () => {
  return (
    <>
    <Heading as="h3">
      Foundation
    </Heading>
    <Text mb="3rem" maxWidth={["100%", "100%", "50%"]}>
      Put the picture frame problem here
    </Text>
    </>
  );
}

const About = () => {
  return (
    <>
    <Heading as="h3">
      Philosophy
    </Heading>
    <Text mb="3rem" maxWidth={["100%", "100%", "50%"]}>
      There is no shortcut to complete mastery, but there are better ways to learn!
    </Text>
    </>
  );
}

function App() {
  const routes = {
    "/" :()=><Main/>,
    "/about" :()=> <About/>,
    "/foundation" :()=> <Foundation/>,
  };
  const routeResults = useRoutes(routes);
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minHeight="100vh">
        <WithSubnavigation/>
        <Flex flex="1" direction="column" justifyContent="center">
          <Container maxWidth="80%">
            {routeResults}
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
