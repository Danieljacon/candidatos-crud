import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Alert, AlertIcon, Button, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ModalWindows from "../modal";

const Excluir = ({ id }) => {
  // const [show, setShow] = useState(false);
  const toast = useToast();

  const handleDelete = () => {
    deleteDoc(doc(db, `candidato/${id}`));
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <ModalWindows label="Deletar" icon={<DeleteIcon />}>
      Deseja mesmo deletar?
      <Button
        mt={3}
        size={"md"}
        rightIcon={<DeleteIcon />}
        colorScheme="red"
        variant="solid"
        onClick={handleDelete}
      >
        Deletar
      </Button>
    </ModalWindows>
  );
};

export default Excluir;
