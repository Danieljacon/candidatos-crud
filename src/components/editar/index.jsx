import React, { useContext, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ModalWindows from "../modal";

const Editar = ({ item }) => {
  const [cpf, setCpf] = useState(item.cpf);
  const [nome, setNome] = useState(item.nome);
  const [celular, setCelular] = useState(item.celular);
  const [email, setEmail] = useState(item.email);
  const [sexo, setSexo] = useState(item.sexo);
  const [data, setData] = useState(item.data);
  const [habilidades, setHabilidades] = useState(item.habilidades);

  const handleEdit = () => {
    updateDoc(doc(db, `candidato/${item.id}`), {
      cpf: cpf,
      nome: nome,
      celular: celular,
      email: email,
      sexo: sexo,
      data: data,
      habilidades: habilidades,
      // CORRIGIR HABILIDADES
    });
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
          label: "CPF",
          type: "text",
          defaultValue: cpf,
          seValue: setCpf,
        },
        {
          label: "Nome",
          type: "text",
          defaultValue: nome,
          seValue: setNome,
        },
        {
          label: "Celular",
          type: "text",
          defaultValue: celular,
          seValue: setCelular,
        },
        {
          label: "Email",
          type: "email",
          defaultValue: email,
          seValue: setEmail,
        },
        {
          label: "Data de Nascimento",
          type: "date",
          defaultValue: data,
          seValue: setData,
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
          value: "HTML",
          defaultChecked: item.habilidades.includes("HTML") ? true : false,
          setValue: checkHabilidade,
        },
      ],
    },
  ];

  return (
    <ModalWindows label="editar">
      <div>
        <input
          type="text"
          defaultValue={cpf}
          onChange={(e) => {
            setCpf(e.target.value);
          }}
        />
        <input
          type="text"
          defaultValue={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <input
          type="text"
          defaultValue={celular}
          onChange={(e) => {
            setCelular(e.target.value);
          }}
        />
        <input
          type="text"
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="radio"
          name="sexo"
          value="Masculino"
          defaultChecked={sexoMasculino}
          onChange={(e) => {
            setSexo(e.target.value);
          }}
        />
        Masculino
        <input
          type="radio"
          name="sexo"
          value="Feminino"
          defaultChecked={sexoFeminino}
          onChange={(e) => {
            setSexo(e.target.value);
          }}
        />
        Feminino
      </div>
      <div>
        <input
          type="date"
          defaultValue={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="habilidades"
            value="HTML"
            defaultChecked={item.habilidades.includes("HTML") ? true : false}
            onChange={checkHabilidade}
          />
          HTML
        </label>
        <label>
          <input
            type="checkbox"
            name="habilidades"
            value="CSS"
            defaultChecked={item.habilidades.includes("CSS") ? true : false}
            onChange={checkHabilidade}
          />
          CSS
        </label>
        <label>
          <input
            type="checkbox"
            name="habilidades"
            value="JavaScript"
            defaultChecked={
              item.habilidades.includes("JavaScript") ? true : false
            }
            onChange={checkHabilidade}
          />
          JavaScript
        </label>
        <label>
          <input
            type="checkbox"
            name="habilidades"
            value="React"
            defaultChecked={item.habilidades.includes("React") ? true : false}
            onChange={checkHabilidade}
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            name="habilidades"
            value="Node.js"
            defaultChecked={item.habilidades.includes("Node.js") ? true : false}
            onChange={checkHabilidade}
          />
          Node.js
        </label>
      </div>

      <button onClick={handleEdit}>Editar</button>
    </ModalWindows>
  );
};

export default Editar;
