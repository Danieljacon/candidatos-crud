import React, { useContext } from "react";
import { db } from "../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Excluir = ({ id }) => {
  const handleDelete = () => {
    deleteDoc(doc(db, `candidato/${id}`));
  };
  return <button onClick={handleDelete}>Deletar</button>;
};

export default Excluir;
