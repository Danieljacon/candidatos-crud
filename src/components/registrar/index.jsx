import React, { useContext } from "react";
import { CandidatoContext } from "../../contexts/CandidatoContext";
import ModalWindows from "../modal";
import MaskInput from "react-maskinput";

const Registrar = () => {
  const { infos, checkHabilidade, handleSubmit } = useContext(CandidatoContext);

  return (
    <ModalWindows label="Registrar">
      <form onSubmit={handleSubmit}>
        <div>
          {infos[0].basicos.map((info, index) => {
            if (info.input === "MaskInput") {
              return (
                <div key={index}>
                  <label htmlFor={info.name}>{info.label}</label>
                  <MaskInput
                    alwaysShowMask
                    mask={info.mask}
                    size={info.size}
                    minLength="6"
                    showMask
                    maskChar="_"
                    type={info.type}
                    name={info.name}
                    value={info.value}
                    onChange={(e) => info.setValue(e.target.value)}
                  />
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <label htmlFor={info.name}>{info.label}</label>
                  <input
                    required={true}
                    type={info.type}
                    name={info.name}
                    value={info.value}
                    onChange={(e) => info.setValue(e.target.value)}
                  />
                </div>
              );
            }
          })}
        </div>
        <div>
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
        </div>

        <div>
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
        </div>

        <button type="submit">Enviar</button>
      </form>
    </ModalWindows>
  );
};

export default Registrar;
