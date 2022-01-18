import React, { useContext } from "react";
import { tabelaCandidatos } from "../../utils/arrays.js";
import { CandidatoContext } from "../../contexts/CandidatoContext.js";
import Excluir from "../excluir/index.jsx";
import Editar from "../editar/index.jsx";

const Tabela = () => {
  const columns = [...tabelaCandidatos];
  const { dados, setId } = useContext(CandidatoContext);
  console.log(dados);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((item, index) => {
            return <th key={index}>{item.headerName}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dados.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.cpf}</td>
              <td>{item.nome}</td>
              <td>{item.celular}</td>
              <td>{item.email}</td>
              <td>{item.sexo}</td>
              <td>{item.data}</td>
              <td>{item.habilidades}</td>
              <td>
                <Editar item={item}>Editar</Editar>
                <Excluir id={item.id}/>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Tabela;
