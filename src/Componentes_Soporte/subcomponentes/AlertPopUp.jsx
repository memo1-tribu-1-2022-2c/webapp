import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

export default function AlertPopUp(props) {
  const _ref = React.useRef();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={_ref}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg="gray.300">
          <AlertDialogHeader>{props.title}</AlertDialogHeader>
          <AlertDialogBody>{props.body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={props.onClose} colorScheme="gray">
              close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
