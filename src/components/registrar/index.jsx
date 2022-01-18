import React, { useState, useContext } from "react";
import { CandidatoContext } from "../../contexts/CandidatoContext";

const Registrar = () => {
  const { infos, checkHabilidade, handleSubmit } = useContext(CandidatoContext);



  return (
    <form onSubmit={handleSubmit}>
      <div>
        {infos[0].basicos.map((info, index) => {
          return (
            <div key={index}>
              <label htmlFor={info.name}>{info.label}</label>
              <input
                type={info.type}
                name={info.name}
                value={info.value}
                onChange={(e) => info.setValue(e.target.value)}
              />
            </div>
          );
        })}
      </div>
      <div>
        {infos[0].sexo.map((info, index) => {
          return (
            <label htmlFor={info.name} key={index}>
              <input
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
  );
};

export default Registrar;
