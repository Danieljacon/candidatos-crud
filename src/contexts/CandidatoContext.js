import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

export const CandidatoContext = createContext();

export const CandidatoProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("2021-01-01");
  const [sexo, setSexo] = useState("Masculino");
  const [habilidades, setHabilidades] = useState("");

  const [dados, setDados] = useState([]);

  const checkHabilidade = (e) => {
    habilidades.includes(e.target.value)
      ? setHabilidades(
          habilidades.filter((habilidade) => habilidade !== e.target.value)
        )
      : setHabilidades([...habilidades, e.target.value]);
  };

  const infos = [
    {
      basicos: [
        {
          label: "CPF",
          type: "text",
          name: "cpf",
          value: cpf,
          setValue: setCpf,
        },
        {
          label: "Nome",
          type: "text",
          name: "nome",
          value: nome,
          setValue: setNome,
        },
        {
          label: "Celular",
          type: "text",
          name: "celular",
          value: celular,
          setValue: setCelular,
        },
        {
          label: "Email",
          type: "text",
          name: "email",
          value: email,
          setValue: setEmail,
        },
        {
          label: "Data de Nascimento",
          type: "date",
          name: "data",
          value: data,
          setValue: setData,
        },
      ],
      sexo: [
        {
          label: "Masculino",
          type: "radio",
          name: "sexo",
          value: "Masculino",
          defaultChecked: true,
          setValue: setSexo,
        },
        {
          label: "Feminino",
          type: "radio",
          name: "sexo",
          value: "Feminino",
          setValue: setSexo,
        },
      ],
      habilidade: [
        {
          label: "HTML",
          type: "checkbox",
          id: "html",
          value: "HTML",
          click: checkHabilidade,
        },
        {
          label: "CSS",
          type: "checkbox",
          id: "css",
          value: "CSS",
          click: checkHabilidade,
        },
        {
          label: "JavaScript",
          type: "checkbox",
          id: "js",
          value: "JavaScript",
          click: checkHabilidade,
        },
        {
          label: "React",
          type: "checkbox",
          id: "react",
          value: "React",
          click: checkHabilidade,
        },
        {
          label: "Node.js",
          type: "checkbox",
          id: "node",
          value: "Node.js",
          click: checkHabilidade,
        },
      ],
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(collection(db, "candidato"), {
      cpf: cpf,
      nome: nome,
      celular: celular,
      email: email,
      sexo: sexo,
      habilidades: habilidades,
      data: data,
      timestamp: serverTimestamp(),
    });
    
  };

  useEffect(() => {
    const q = query(
      collection(db, "candidato"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const dados = [];
      snapshot.forEach((doc) => {
        dados.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDados(dados);
    });
  }, []);



  return (
    <CandidatoContext.Provider
      value={{
        id,
        setId,
        cpf,
        setCpf,
        nome,
        setNome,
        celular,
        setCelular,
        email,
        setEmail,
        data,
        setData,
        sexo,
        setSexo,
        habilidades,
        setHabilidades,
        infos,
        checkHabilidade,
        handleSubmit,
        dados
      }}
    >
      {children}
    </CandidatoContext.Provider>
  );
};