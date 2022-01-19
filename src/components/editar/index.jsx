import React, { useContext, useState, useEffect } from "react";
import { CandidatoContext } from "../../contexts/CandidatoContext";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ModalWindows from "../modal";
import * as cpfTest from "@fnando/cpf"; // import the whole library
import MaskInput from "react-maskinput";
import { EditIcon } from "@chakra-ui/icons";
import { MaskInputStyled, ContainerBox } from "./styles";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Editar = ({ item }) => {
  const [cpf, setCpf] = useState(item.cpf);
  const [nome, setNome] = useState(item.nome);
  const [celular, setCelular] = useState(item.celular);
  const [email, setEmail] = useState(item.email);
  const [sexo, setSexo] = useState(item.sexo);
  const [data, setData] = useState(item.data);
  const [habilidades, setHabilidades] = useState(item.habilidades);

  const handleEdit = () => {
    if (
      celular.replace(/\D/g, "").length < 11 ||
      cpf.replace(/\D/g, "").length < 11
    ) {
      alert("Os campos CPF ou Celular devem possuir 11 caracteres");
    } else if (cpfTest.isValid(cpf) === false) {
      alert("CPF Inválido");
    } else if (nome.split(" ").length <= 1) {
      alert("Você deve digitar, além do nome, o sobrenome");
    } else if (habilidades.length < 1) {
      alert("Você deve selecionar pelo menos uma habilidade");
    } else {
      updateDoc(doc(db, `candidato/${item.id}`), {
        cpf: cpf,
        nome: nome,
        celular: celular,
        email: email,
        sexo: sexo,
        data: data,
        habilidades: habilidades,
      });
    }
  };

  const sexoMasculino = sexo === "Masculino" ? true : false;
  const sexoFeminino = sexo === "Feminino" ? true : false;

  const checkHabilidade = (e) => {
    setHabilidades(
      e.target.checked
        ? [...habilidades, e.target.value]
        : habilidades.filter((habilidade) => habilidade !== e.target.value)
    );
  };

  const newInfos = [
    {
      basicos: [
        {
          input: "MaskInput",
          label: "CPF",
          type: "text",
          defaultValue: cpf,
          setValue: setCpf,
          mask: "000.000.000-00",
          size: 11,
          maskChar: "_",
        },
        {
          label: "Nome",
          type: "text",
          defaultValue: nome,
          setValue: setNome,
        },
        {
          input: "MaskInput",
          label: "Celular",
          type: "text",
          defaultValue: celular,
          setValue: setCelular,
          mask: "(00) 00000 - 0000",
          size: 11,
          maskChar: "_",
        },
        {
          label: "Email",
          type: "email",
          defaultValue: email,
          setValue: setEmail,
        },
        {
          label: "Data de Nascimento",
          type: "date",
          defaultValue: data,
          setValue: setData,
        },
      ],
      sexo: [
        {
          label: "Masculino",
          type: "radio",
          name: "sexo",
          value: "Masculino",
          setValue: setSexo,
          defaultValue: sexoMasculino,
        },
        {
          label: "Feminino",
          type: "radio",
          name: "sexo",
          value: "Feminino",
          setValue: setSexo,
          defaultValue: sexoFeminino,
        },
      ],
      habilidades: [
        {
          label: "HTML",
          type: "checkbox",
          name: "habilidades",
          value: `HTML`,
          defaultChecked: item.habilidades.includes(`HTML`) ? true : false,
          setValue: checkHabilidade,
        },
        {
          label: "CSS",
          type: "checkbox",
          name: "habilidades",
          value: "CSS",
          defaultChecked: item.habilidades.includes("CSS") ? true : false,
          setValue: checkHabilidade,
        },
        {
          label: "JavaScript",
          type: "checkbox",
          name: "habilidades",
          value: "JavaScript",
          defaultChecked: item.habilidades.includes("JavaScript")
            ? true
            : false,
          setValue: checkHabilidade,
        },
        {
          label: "React",
          type: "checkbox",
          name: "habilidades",
          value: "React",
          defaultChecked: item.habilidades.includes("React") ? true : false,
          setValue: checkHabilidade,
        },
        {
          label: "Node.js | ",
          type: "checkbox",
          name: "habilidades",
          value: "Node.js",
          defaultChecked: item.habilidades.includes("Node.js") ? true : false,
          setValue: checkHabilidade,
        },
      ],
    },
  ];

  useEffect(() => {
    setCpf(item.cpf);
    setNome(item.nome);
    setCelular(item.celular);
    setEmail(item.email);
    setSexo(item.sexo);
    setData(item.data);
    setHabilidades(item.habilidades);
  }, [item]);

  return (
    <ModalWindows label="Editar" icon={<EditIcon />}>
      <ContainerBox>
        {newInfos[0].basicos.map((info, index) => {
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
                <FormLabel key={index}>
                  {info.label}
                  <MaskInputStyled
                    mask={info.mask}
                    maskChar={info.maskChar}
                    size={info.size}
                    defaultValue={info.defaultValue}
                    onChange={(e) => info.setValue(e.target.value)}
                  />
                </FormLabel>
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
                <div key={index}>
                  <FormLabel>
                    {info.label}
                    <Input
                      type={info.type}
                      defaultValue={info.defaultValue}
                      onChange={(e) => info.setValue(e.target.value)}
                    />
                  </FormLabel>
                </div>
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
        {newInfos[0].sexo.map((info, index) => {
          return (
            <label key={index}>
              <input
                type={info.type}
                name={info.name}
                value={info.value}
                defaultChecked={info.defaultValue}
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
        {newInfos[0].habilidades.map((info, index) => {
          return (
            <div key={index}>
              <label>
                <input
                  type={info.type}
                  name={info.name}
                  value={info.value}
                  defaultChecked={info.defaultChecked}
                  onChange={info.setValue}
                />
                {info.label}
              </label>
            </div>
          );
        })}
      </FormControl>

      <Button
        size={"md"}
        colorScheme="teal"
        variant="solid"
        onClick={handleEdit}
      >
        Editar
      </Button>
    </ModalWindows>
  );
};

export default Editar;
