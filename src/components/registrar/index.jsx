import React, { useContext } from "react";
import { CandidatoContext } from "../../contexts/CandidatoContext";
import ModalWindows from "../modal";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { MaskInputStyled, ContainerBox } from "./styles";

const Registrar = () => {
  const { infos, checkHabilidade, handleSubmit } = useContext(CandidatoContext);

  return (
    <ModalWindows label="Registrar" variant="outline">
      <form onSubmit={handleSubmit}>
        <ContainerBox>
          {infos[0].basicos.map((info, index) => {
            if (info.input === "MaskInput") {
              return (
                <FormControl
                  key={index}
                  border="1px"
                  borderColor="gray"
                  p={2}
                  marginY={2}
                  borderRadius={10}
                >
                  <FormLabel htmlFor={info.name}>{info.label}</FormLabel>
                  <MaskInputStyled
                    alwaysShowMask
                    mask={info.mask}
                    size={info.size}
                    minLength="6"
                    showMask
                    maskChar="_"
                    id={info.name}
                    type={info.type}
                    name={info.name}
                    value={info.value}
                    onChange={(e) => info.setValue(e.target.value)}
                  />
                </FormControl>
              );
            } else {
              return (
                <FormControl
                  key={index}
                  border="1px"
                  borderColor="gray"
                  p={2}
                  marginY={2}
                  borderRadius={10}
                >
                  <FormLabel htmlFor={info.name}>{info.label}</FormLabel>
                  <Input
                    required={true}
                    type={info.type}
                    id={info.name}
                    name={info.name}
                    value={info.value}
                    onChange={(e) => info.setValue(e.target.value)}
                  />
                </FormControl>
              );
            }
          })}
        </ContainerBox>
        <FormControl
          border="1px"
          borderColor="gray"
          p={2}
          marginY={2}
          borderRadius={10}
          display={"flex"}
          justifyContent="center"
          alignContent={"center"}
          gap={3}
        >
          {infos[0].sexo.map((info, index) => {
            return (
              <label htmlFor={info.name} key={index}>
                <input
                  defaultChecked={info.value === "Masculino"}
                  type={info.type}
                  name={info.name}
                  value={info.value}
                  onChange={(e) => info.setValue(e.target.value)}
                />
                {info.label}
              </label>
            );
          })}
        </FormControl>
        <FormControl
          border="1px"
          borderColor="gray"
          p={2}
          marginY={2}
          borderRadius={10}
          display={"flex"}
          justifyContent="center"
          alignContent={"center"}
          gap={3}
        >
          {infos[0].habilidade.map((item, index) => {
            return (
              <label key={index}>
                <input
                  type={item.type}
                  id={item.id}
                  name={item.name}
                  value={item.value}
                  onChange={(e) => {
                    checkHabilidade(e);
                  }}
                />
                {item.label}
              </label>
            );
          })}
        </FormControl>

        <Button type="submit" size={"md"} colorScheme="teal" variant="solid">
          Enviar
        </Button>
      </form>
    </ModalWindows>
  );
};

export default Registrar;
