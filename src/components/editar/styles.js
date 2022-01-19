import styled from "styled-components";
import MaskInput from "react-maskinput";

export const MaskInputStyled = styled(MaskInput)`
  width: 100%;
  padding: 7px 15px;
  border-radius: 6px;
  font-size: 15px;
  border: 1px solid #868686;
  transition: all 0.5s ease;

  &:focus {
    outline-color: #3685cf;
  }
`;

export const ContainerBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 15px;
  /* last child */
`
