import { useState } from "react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    produtor: {
      nome: "João da Silva",
      cpf: "12345678000",
    },
    propriedade: {
      nome: "Fazenda Capim Macio",
      codigoCar: "MT-5107248-1025F299474640148FE845C7A0B62635",
      codigoIbge: "3509502",
      poligono:
        "POLYGON((-58.9144585643381 -13.5072128852218,-58.8657268985861 -13.5134933385645,-58.8657268985861 -13.5139585573307,-58.8666573361184 -13.5153542136291,-58.8667736408099 -13.5177966121512,-58.8658432032777 -13.5175640027682,-58.8629355859894 -13.5172150886936,-58.8614236249994 -13.5196574872158,-58.8586323124027 -13.5234955420363,-58.8577018748704 -13.5272172921653,-58.8559573044974 -13.5300086047621,-58.8535149059753 -13.5348934018065,-58.8553757810398 -13.5373358003286,-58.8550268669652 -13.5379173237863,-58.8546779528906 -13.5398945035423,-58.8627029766063 -13.5526880196109,-58.881660641326 -13.5498967070141,-58.9236466349691 -13.5444303865121,-58.9144585643381 -13.5072128852218))",
    },
    talhao: {
      poligono:
        "POLYGON((-58.67396951647091186 -13.24646265710462245, -58.67326208632626106 -13.26291040796766652, -58.71004845384790372 -13.26237983535918019, -58.70969473877558187 -13.23523220355835051, -58.69413127559334953 -13.23558591863067413, -58.67396951647091186 -13.24646265710462245))",
      area: 10,
      tipoProdutor: "Proprietário",
    },
    manejos: [
      {
        data: "2021-01-28",
        operacao: { nomeOperacao: "Revolvimento do solo" },
        tipoOperacao: { tipo: "ARACAO" },
      },
    ],
    producoes: [
      {
        dataPlantio: "2023-10-28",
        dataColheita: "2024-02-28",
        coberturaSolo: 40,
        ilp: "false",
        cultura: { nome: "Soja (grão)" },
      },
      {
        dataPlantio: "2024-02-28",
        dataColheita: "2024-06-28",
        coberturaSolo: 46,
        ilp: "false",
        cultura: { nome: "Milho (grão)" },
      },
      {
        dataPrevisaoPlantio: "2024-06-28",
        dataPrevisaoColheita: "2024-10-28",
        ilp: "false",
        cultura: { nome: "Soja (grão)" },
      },
    ],
  });

  const handleChange = (e, path) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const keys = path.split(".");
      const lastKey = keys.pop();

      let obj = prev;
      for (let key of keys) {
        obj = obj[key];
      }

      obj[lastKey] = value;
      return { ...prev };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/endpoint1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dados enviados com sucesso!");
      } else {
        alert("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div>
      <h1>Formulário de Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <h2>Produtor</h2>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.produtor.nome}
          onChange={(e) => handleChange(e, "produtor.nome")}
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.produtor.cpf}
          onChange={(e) => handleChange(e, "produtor.cpf")}
        />

        <h2>Propriedade</h2>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.propriedade.nome}
          onChange={(e) => handleChange(e, "propriedade.nome")}
        />
        <input
          type="text"
          name="codigoCar"
          placeholder="Código CAR"
          value={formData.propriedade.codigoCar}
          onChange={(e) => handleChange(e, "propriedade.codigoCar")}
        />
        <input
          type="text"
          name="codigoIbge"
          placeholder="Código IBGE"
          value={formData.propriedade.codigoIbge}
          onChange={(e) => handleChange(e, "propriedade.codigoIbge")}
        />
        <textarea
          name="poligono"
          placeholder="Polígono"
          value={formData.propriedade.poligono}
          onChange={(e) => handleChange(e, "propriedade.poligono")}
        ></textarea>

        <h2>Talhão</h2>
        <textarea
          name="poligono"
          placeholder="Polígono"
          value={formData.talhao.poligono}
          onChange={(e) => handleChange(e, "talhao.poligono")}
        ></textarea>
        <input
          type="number"
          name="area"
          placeholder="Área"
          value={formData.talhao.area}
          onChange={(e) => handleChange(e, "talhao.area")}
        />
        <input
          type="text"
          name="tipoProdutor"
          placeholder="Tipo de Produtor"
          value={formData.talhao.tipoProdutor}
          onChange={(e) => handleChange(e, "talhao.tipoProdutor")}
        />

        <h2>Manejo</h2>
        {formData.manejos.map((manejo, index) => (
          <div key={index}>
            <input
              type="date"
              name="data"
              value={manejo.data}
              onChange={(e) => handleChange(e, `manejos.${index}.data`)}
            />
            <input
              type="text"
              name="nomeOperacao"
              placeholder="Nome da Operação"
              value={manejo.operacao.nomeOperacao}
              onChange={(e) =>
                handleChange(e, `manejos.${index}.operacao.nomeOperacao`)
              }
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo de Operação"
              value={manejo.tipoOperacao.tipo}
              onChange={(e) =>
                handleChange(e, `manejos.${index}.tipoOperacao.tipo`)
              }
            />
          </div>
        ))}

        <h2>Produções</h2>
        {formData.producoes.map((producao, index) => (
          <div key={index}>
            <input
              type="date"
              name="dataPlantio"
              value={producao.dataPlantio || ""}
              onChange={(e) =>
                handleChange(e, `producoes.${index}.dataPlantio`)
              }
            />
            <input
              type="date"
              name="dataColheita"
              value={producao.dataColheita || ""}
              onChange={(e) =>
                handleChange(e, `producoes.${index}.dataColheita`)
              }
            />
            <input
              type="text"
              name="nome"
              placeholder="Nome da Cultura"
              value={producao.cultura.nome}
              onChange={(e) =>
                handleChange(e, `producoes.${index}.cultura.nome`)
              }
            />
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormPage;
