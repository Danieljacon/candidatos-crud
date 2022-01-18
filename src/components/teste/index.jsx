import React from "react";
import MaskInput from "react-maskinput";
import { Container, NewMaskInput } from "./styles";

const Teste = () => {
  return (
    <Container>
      <NewMaskInput
        alwaysShowMask
        mask={"+55 (00) 00000 - 0000"}
        size={13}
        showMask
        maskChar="_"
      />
    </Container>
  );
};

export default Teste;
