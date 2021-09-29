import { React, useState } from "react";
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
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  CloseButton,
  useColorModeValue,
  Button,
  ButtonGroup,
  useDisclosure,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { useRoutes } from "hookrouter";
import { BsGear, BsInfoCircle, BsDownload } from "react-icons/bs";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LinearScatterPlotWrapper from "./components/plots/LinearScatterPlotWrapper"


const Main = () => {
  const { isOpen, onToggle } = useDisclosure();

  console.log(isOpen);

  return (
    <Flex justify="center">

    <Box
      // maxW={"320px"}
      w={"fit-content"}
      borderWidth={2} 
      borderRadius="md"
      borderColor={useColorModeValue("gray.600", "gray.300")}
      overflow="scroll"
      // bg={useColorModeValue("white", "gray.900")}
      bg={useColorModeValue("white", "gray.800")}
      // boxShadow={"xl"}
      mx="1rem"
      textAlign={"center"}
    >
      <Flex 
        w="100%" 
        py={2}
        px={2} 
        direction="row"
        justify="space-between"
        alignItems="center"
        borderBottom={2}
        borderStyle="solid"
        // borderColor={useColorModeValue("gray.200", "gray.700")}
        borderColor={useColorModeValue("gray.600", "gray.300")}
      >
        <Text>Linear Model</Text>
        <ButtonGroup colorScheme="pink" variant="ghost" spacing="0">
          <Button>
            <BsDownload transform="scale(1.3)"></BsDownload>
          </Button>
          <Button>
            <BsInfoCircle transform="scale(1.3)"></BsInfoCircle>
          </Button>
          <Button onClick={onToggle}>
            <BsGear transform="scale(1.3)"/>
          </Button>
        </ButtonGroup>
      </Flex>
      <LinearScatterPlotWrapper/>
    </Box>

    <Box
      // maxW={"320px"}
      minWidth={isOpen ? "20%" : "0%"}
      w={isOpen ? "fit-content": "0"}
      px={2}
      py={3}
      // w={isOpen ? "20%": "0"}
      display={isOpen ? "flex" : "none"}
      flexDirection="column"
      justifyContent="space-between"
      // ml="1rem"
      borderWidth={2} 
      borderRadius="md"
      borderColor={useColorModeValue("gray.600", "gray.300")}
      overflow="scroll"
      // bg={useColorModeValue("white", "gray.900")}
      bg={useColorModeValue("white", "gray.800")}
      // boxShadow={"xl"}
      // p={6}
      textAlign={"center"}
    >
      <Stack direction="column" spacing="2">
        {/* <Checkbox defaultIsChecked>Show True Function</Checkbox> */}
        <FormControl display="flex" alignItems="center">
          <Switch defaultChecked id="email-alerts" colorScheme="pink" pr={2}/>
          <FormLabel htmlFor="email-alerts" mb="0" fontWeight="regular" fontSize="sm">
            Show True Function
          </FormLabel>
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <Switch defaultChecked id="email-alerts" colorScheme="pink" pr={2}/>
          <FormLabel htmlFor="email-alerts" mb="0" fontWeight="regular" fontSize="sm">
            Show Axes
          </FormLabel>
        </FormControl>
        <NumberInput defaultValue={1.5} precision={2} step={0.1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      <Stack direction="column" spacing="2">
        <Button colorScheme="pink" variant="outline" size="sm">
          Fit Regression Line
        </Button>
        <Button colorScheme="pink" variant="outline" size="sm">
          Resample Data
        </Button>
      </Stack>
    </Box>

    </Flex>
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

const Resources = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onCloseClick = () => {
    console.log("alert dismissed");
    setIsOpen(false);
  }

  return (
    <>
    <Alert status="info" display={isOpen ? "inherit" : "none"}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription display="block">
          Your application has been received. We will review your application and
          respond within the next 48 hours.
        </AlertDescription>
      </Box>
      <CloseButton position="absolute" right="8px" top="8px" onClick={onCloseClick} />
    </Alert>
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
    "/resources" :()=> <Resources/>,
  };
  const routeResults = useRoutes(routes);
  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minHeight="100vh">
        <Navbar/>
        <Flex flex="1" direction="column" justifyContent="center">
          <Container maxWidth="100%">
            {routeResults}
          </Container>
        </Flex>
        <Footer/>
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
