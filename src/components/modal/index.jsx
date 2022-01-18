import React, { useState } from "react";
import { Layer } from "grommet";
import { CloseButton, ModalContainer } from "./styles";

const ModalWindows = ({ children, label }) => {

  const [show, setShow] = useState();


  return (
    <div>
      <button onClick={() => setShow(true)}>
        {label}
      </button>
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          responsive={false}
          style={{ borderRadius: '20px' }}
        >
          <CloseButton onClick={() => setShow(false)}>x</CloseButton>
          <ModalContainer>
            {children}
          </ModalContainer>
        </Layer>
      )}
    </div>
  );
};

export default ModalWindows;
