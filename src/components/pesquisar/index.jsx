import React, { useContext, useState, useEffect } from "react";
import { CandidatoContext } from "../../contexts/CandidatoContext";

const Pesquisar = () => {
  const { dados, setDados, dadosPreservados, setDadosPreservados } =
    useContext(CandidatoContext);
  const [pesquisa, setPesquisa] = useState("");

 
  useEffect(() => {
      const filtrar = dadosPreservados.filter(
        (candidato) => candidato.nome.toLowerCase().includes(pesquisa.toLowerCase())
        );
        setDados(filtrar);
  }, [pesquisa])

  return (
    <input
      type="search"
      placeholder="Pesquisar"
      value={pesquisa}
      onChange={(e) => {
        setPesquisa(e.target.value);
      }}
    />
  );
};

export default Pesquisar;
