import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import * as cpfTest from "@fnando/cpf"; // import the whole library
import { isValid as isValidCpf } from "@fnando/cpf"; // import just one function
import {
  Box,
  useToast,
} from "@chakra-ui/react";

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
  const [erroMsg, setErroMsg] = useState(false);
  const toast = useToast();

  const [dados, setDados] = useState([]);
  const [dadosPreservados, setDadosPreservados] = useState([]);

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
          input: "input",
          label: "Nome",
          type: "text",
          name: "nome",
          value: nome,
          setValue: setNome,
        },
        {
          input: "MaskInput",
          label: "CPF",
          type: "text",
          name: "cpf",
          value: cpf,
          setValue: setCpf,
          mask: "000.000.000-00",
          size: 11,
          maskChar: "_",
        },
        {
          input: "MaskInput",
          label: "Celular",
          type: "text",
          name: "celular",
          value: celular,
          setValue: setCelular,
          mask: "(00) 00000 - 0000",
          size: 11,
          maskChar: "_",
        },
        {
          label: "Email",
          type: "email",
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

    if (
      celular.replace(/\D/g, "").length < 11 ||
      cpf.replace(/\D/g, "").length < 11
    ) {
      <div>
        {toast({
          position: "top",
          duration: 5000,
          render: () => (
            <Box color="white" px={6} py={3} bg="red" borderRadius="15px">
              Os campos CPF ou Celular devem possuir 11 caracteres
            </Box>
          ),
        })}
      </div>;
    } else if (cpfTest.isValid(cpf) === false) {
      {
        <div>
          {toast({
            position: "top",
            duration: 5000,
            render: () => (
              <Box color="white" px={6} py={3} bg="red" borderRadius="15px">
                CPF inv??lido
              </Box>
            ),
          })}
        </div>;
      }
    } else if (nome.split(" ").length <= 1) {
      {
        <div>
          {toast({
            position: "top",
            duration: 5000,
            render: () => (
              <Box color="white" px={6} py={3} bg="red" borderRadius="15px">
                Voc?? deve digitar, al??m do nome, o sobrenome.
              </Box>
            ),
          })}
        </div>;
      }
    } else if (dados.filter((dado) => dado.cpf === cpf).length > 0) {
      {
        <div>
          {toast({
            position: "top",
            duration: 5000,
            render: () => (
              <Box color="white" px={6} py={3} bg="red" borderRadius="15px">
                CPF j?? cadastrado.
              </Box>
            ),
          })}
        </div>;
      }
    } else if (habilidades.length < 1) {
      {
        <div>
          {toast({
            position: "top",
            duration: 5000,
            render: () => (
              <Box color="white" px={6} py={3} bg="red" borderRadius="15px">
                Voc?? deve selecionar pelo menos uma habilidade.
              </Box>
            ),
          })}
        </div>;
      }
    } else {
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
    }
  };

  useEffect(() => {
    const q = query(collection(db, "candidato"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const dados = [];
      snapshot.forEach((doc) => {
        dados.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDadosPreservados(dados);
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
        dados,
        setDados,
        dadosPreservados,
        setDadosPreservados,
        erroMsg,
      }}
    >
      {children}
    </CandidatoContext.Provider>
  );
};
