import React, { useContext } from "react";
import { db } from "../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import ModalWindows from "../modal";

const Excluir = ({ id }) => {
  const handleDelete = () => {
    deleteDoc(doc(db, `candidato/${id}`));
  };
  return (
    <>
      <ModalWindows label="Deletar" icon={<DeleteIcon />}>
        Deseja mesmo deletar?
        <Button
          width="100px"
          height="30px"
          rightIcon={<DeleteIcon />}
          colorScheme="red"
          variant="solid"
          onClick={handleDelete}
        >
          Deletar
        </Button>
      </ModalWindows>
    </>
  );
};

export default Excluir;
