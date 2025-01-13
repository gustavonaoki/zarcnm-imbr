import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormPage = () => {
  /*const [numeroIteravel, setNumeroIteravel] = useState(1); //Estado para o número iterável que será incrementado

  const incrementarNumero = () => {
    setNumeroIteravel((prevNumero) => prevNumero + 1);
  }; //Função para incrementar o número iterável
  */
   const newDiv = () => {
    return (
      <div> ------------- </div>
    )
   }
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
        "POLYGON((-58.9144585643381 -13.5072128852218,...))",
    },
    talhao: {
      poligono:
        "POLYGON((-58.67396951647091186 -13.24646265710462245,...))",
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
        ilp: "SIM",
        cultura: { nome: "Soja (grão)" },
        tipoOperacao: { tipo: "ARACAO" },
      },
    ],
  });

  const handleChange = (e, path) => {
    const { value } = e.target;

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
      const response = await fetch("/api/v1/status", {
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
  const addEntry = (arrayField, defaultValues) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: [...prev[arrayField], defaultValues],
    }));
  };
  return (
    <div className="container-fluid my-4">
      <h1 className="text-center mb-4">Formulário de Cadastro</h1>
      <h6 className="text-danger text-center">
        Informações obrigatórias estão marcadas com *
      </h6>
      <form onSubmit={handleSubmit}>
        {/* Dados do Produtor */}
        <div className="mb-4 card border-0 shadow-sm">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h2 className="mb-0">Dados do Produtor</h2>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Ex: José da Silva"
                  value={formData.produtor.nome}
                  onChange={(e) => handleChange(e, "formData.produtor.nome")}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">CPF:</label>
                <input
                  type="text"
                  name="cpf"
                  className="form-control"
                  placeholder="EX: 12345678900"
                  value={formData.produtor.cpf}
                  onChange={(e) => handleChange(e, "formData.produtor.cpf")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dados da Propriedade */}
        <div className="mb-4 card border-0 shadow-sm">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h2 className="mb-0">Dados da Propriedade</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Nome da propriedade:</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                placeholder="EX: Fazenda Santa Maria"
                value={formData.propriedade.nome}
                onChange={(e) => handleChange(e, "formData.propriedade.nome")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Código CAR (Cadastro Ambiental Rural)*:
              </label>
              <input
                type="text"
                name="codigoCar"
                className="form-control"
                required
                value={formData.propriedade.codigoCar}
                placeholder="EX: MT-5107248-1025F299474640148FE845C7A0B62635"
                onChange={(e) => handleChange(e, "formData.propriedade.codigoCar")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Código IBGE:</label>
              <input
                type="text"
                name="codigoIbge"
                className="form-control"
                value={formData.propriedade.codigoIbge}
                placeholder="EX: 3509502"
                onChange={(e) => handleChange(e, "formData.propriedade.codigoIbge")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Polígono (Formato WKT):</label>
              <textarea
                name="poligono"
                className="form-control"
                value={formData.propriedade.poligono}
                placeholder="EX: POLYGON((-58.9144585643381 -13.5072128852218,...))"
                onChange={(e) => handleChange(e, "formData.propriedade.poligono")}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Dados da Gleba/Talhão */}
        <div className="mb-4 card border-0 shadow-sm">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h2 className="mb-0"> Dados da Gleba/Talhão</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Polígono (Formato WKT)*:</label>
              <textarea
                name="poligono"
                required
                className="form-control"
                value={formData.talhao.poligono}
                placeholder="EX: POLYGON((-58.9144585643381 -13.5072128852218,...))"
                onChange={(e) => handleChange(e, "formData.talhao.poligono")}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Área (Em hectares)*:
              </label>
              <input
                type="number"
                name="area"
                min={0}
                className="form-control"
                required
                placeholder="EX: 25"
                value={formData.talhao.area}
                onChange={(e) => handleChange(e, "formData.talhao.area")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo do produtor (Proprietário ou Arrendatário):</label>
              <input
                type="text"
                required
                name="tipoProdutor"
                value={formData.talhao.tipoProdutor}
                className="form-control"
                placeholder="EX: Proprietário"
                onChange={(e) => handleChange(e, "formData.talhao.tipoProdutor")}
              />
            </div>
          </div>
        </div>

        {/* Operações mecanizadas realizadas na gleba: */}
        <div className="mb-4 card border-0 shadow-sm">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h2 className="mb-0"> Operações mecanizadas realizadas na gleba:</h2>
          </div>
          <div className="card-body">
            {formData.manejos.map((manejo, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Data da operação*: </label>
                <input
                  type="date"
                  className="form-control"
                  name="dataOperacao"
                  value={manejo.data}
                  onChange={(e) => handleChange(e, index, "manejos", "data")}
                  required
                />

                <label className="form-label">Nome da Operação*: </label>
                <input
                  type="text"
                  name="nomeOperacao"
                  min={0}
                  className="form-control"
                  required
                  placeholder="EX: REVOLVIMENTO DO SOLO"
                  value={manejo.operacao.nomeOperacao}
                  onChange={(e) => handleChange(e, index, "manejos", "operacao", "nomeOperacao")}
                />

                <label className="form-label">Tipo da Operação*: </label>
                <input
                  type="text"
                  required
                  name="tipoOperacao"
                  className="form-control"
                  placeholder="EX: ARACAO"
                  value={manejo.tipoOperacao.tipo}
                  onChange={(e) => handleChange(e, index, "manejos", "tipoOperacao", "tipo")}
                />
              </div>

            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("manejos", { dataOperacao: "", operacao: "", tipoOperacao: "" })
              }>
              Adicionar Operação
            </button>
          </div>
        </div>

        {/* Histórico de culturas na gleba/talhão: */}
        <div className="mb-4 card border-0 shadow-sm">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h2 className="mb-0"> Histórico de culturas na gleba/talhão:</h2>
          </div>
          <div className="card-body">
            {formData.producoes.map((producao, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Data do plantio (data real ou aproximada)*: </label>
                <input
                  type="date"
                  className="form-control"
                  value={producao.dataPlantio}
                  name="dataPlantio"
                  onChange={(e) => handleChange(e, index, "producoes", "dataPlantio")}
                  required
                />

                <label className="form-label">Data da colheita (data real ou aproximada)*: </label>
                <input
                  type="date"
                  className="form-control"
                  value={producao.dataColheita}
                  name="dataColheita"
                  onChange={(e) => handleChange(e, index, "producoes", "dataColheita")}
                  required
                />

                <label className="form-label">
                  Cobertura do solo (%)*:
                </label>
                <input
                  type="number"
                  name="coberturaSolo"
                  min={0}
                  max={100}
                  className="form-control"
                  required
                  value={producao.coberturaSolo}
                  onChange={(e) => handleChange(e, index, "producoes", "coberturaSolo")}
                />

                <label className="form-label">Tipo da Operação*: </label>
                <input
                  type="text"
                  required
                  name="tipoOperacao"
                  className="form-control"
                  placeholder="EX: ARACAO"
                  value={producao.tipoOperacao.tipo}
                  onChange={(e) => handleChange(e, index, "producoes", "tipoOperacao", "tipo")}
                />

                <label className="form-label">Integração Lavoura Pecuária - ILP (SIM/NÃO)*: </label>
                <input
                  type="text"
                  required
                  name="ILP"
                  className="form-control"
                  placeholder="EX: SIM"
                  value={producao.ilp}
                  onChange={(e) => handleChange(e, index, "producoes", "ilp")}
                />

                <label className="form-label">Cultura*: </label>
                <input
                  type="text"
                  required
                  name="cultura"
                  className="form-control"
                  placeholder="EX: Soja (grão)"
                  value={producao.cultura.nome}
                  onChange={(e) => handleChange(e, index, "producoes", "cultura", "nome")}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                
                addEntry("producoes", { dataPlantio: "", coberturaSolo: 0, ilp: "", cultura: "", tipoOperacao: "" });
              }
              }>
              Adicionar Histórico
            </button>
          </div>
        </div>

        {/*Próxima cultura */}
        <div className="mb-4 card border-0 shadow-sm">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h2 className="mb-0"> Próxima cultura:</h2>
          </div>
          <div className="card-body">
            {formData.producoes.map((producao, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Data de previsão do plantio*: </label>
                <input
                  type="date"
                  className="form-control"
                  value={producao.dataPlantio}
                  name="dataPlantio"
                  onChange={(e) => handleChange(e, index, "producoes", "dataPlantio")}
                  required
                />

                <label className="form-label">Data de previsão da colheita*: </label>
                <input
                  type="date"
                  className="form-control"
                  value={producao.dataColheita}
                  name="dataColheita"
                  onChange={(e) => handleChange(e, index, "producoes", "dataColheita")}
                  required
                />

                <label className="form-label">Integração Lavoura Pecuária - ILP (SIM/NÃO)*: </label>
                <input
                  type="text"
                  required
                  name="ILP"
                  className="form-control"
                  placeholder="EX: SIM"
                  value={producao.ilp}
                  onChange={(e) => handleChange(e, index, "producoes", "ilp")}
                />

                <label className="form-label">Cultura*: </label>
                <input
                  type="text"
                  required
                  name="cultura"
                  className="form-control"
                  placeholder="EX: Soja (grão)"
                  value={producao.cultura.nome}
                  onChange={(e) => handleChange(e, index, "producoes", "cultura", "nome")}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("manejos", { dataOperacao: "", operacao: "", tipoOperacao: "" })
              }>
              Adicionar Próxima Cultura
            </button>
          </div>
        </div>

        {/* Botões */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
