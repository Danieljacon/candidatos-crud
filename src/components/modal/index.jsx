import React, { useState } from "react";
import { Layer } from "grommet";
import { CloseButton, ModalContainer } from "./styles";
import { Button } from "@chakra-ui/react";

const ModalWindows = ({ children, label, icon }) => {
  const [show, setShow] = useState();

  return (
    <div>
      <Button
        size={"md"}
        rightIcon={icon}
        colorScheme="teal"
        variant="solid"
        onClick={() => setShow(true)}
      >
        {label}
      </Button>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          responsive={false}
          style={{ borderRadius: "20px" }}
        >
          <CloseButton onClick={() => setShow(false)}>x</CloseButton>
          <ModalContainer>{children}</ModalContainer>
        </Layer>
      )}
    </div>
  );
};

export default ModalWindows;
