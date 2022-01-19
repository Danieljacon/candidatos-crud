import React, { useContext } from "react";
import { db } from "../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const Excluir = ({ id }) => {
  const handleDelete = () => {
    deleteDoc(doc(db, `candidato/${id}`));
  };
  return (
    <>
      <Button
        width="100px"
        height="30px"
        rightIcon={<DeleteIcon />}
        colorScheme="teal"
        variant="solid"
        onClick={handleDelete}
      >
        Deletar
      </Button>
    </>
  );
};

export default Excluir;
