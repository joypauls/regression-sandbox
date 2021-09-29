import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";

const modalTitle = "Welcome! Happy you're here 😊";
const modalBody = `
If you are new to the idea of statistical learning go ahead and check out the Foundation page.
`;


export const GuideModalButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  return (
    <>
      <Button
        // as={'a'}
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        // bg={'pink.400'}
        colorScheme="pink"
        // href={'/foundation'}
        // _hover={{
        //   bg: 'pink.300',
        // }}
        onClick={onOpen}
      >
        {props.text}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody my="4rem">
            <Text>{modalBody}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose} ref={initialRef} as={"a"} href={"/foundation"}>
              Take Me There
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Let Me Play
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
