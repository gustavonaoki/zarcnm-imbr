import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { validateGroundCover } from "../utils/validateGroundCover";
import { validateNDTI, validateNDVI } from "../utils/validateNDVI_NDTI";
import { culturaOptions } from "../optionsInputs/culturas";
import { fillTestValues_NM1a } from "../teste_exemplos/NM1a";
import { fillTestValues_NM1b } from "../teste_exemplos/NM1b";
import { fillTestValues_NM2a } from "../teste_exemplos/NM2a";
import { fillTestValues_NM2b } from "../teste_exemplos/NM2b";
import { fillTestValues_NM3a } from "../teste_exemplos/NM3a";
import { fillTestValues_NM3b } from "../teste_exemplos/NM3b";
import { fillTestValues_NM4a } from "../teste_exemplos/NM4a";
import { fillTestValues_NM4b } from "../teste_exemplos/NM4b";
import { ToggleButton } from "react-bootstrap"

const Form3 = () => {

  const [errors, setErrors] = useState({
    0: {},

  });

  const [formData, setFormData] = useState({
    dataInicial: "2021-01-17",
    dataFinal: "2024-05-14",
    declividadeMedia: 60,
    plantioContorno: 0,
    terraceamento: 0,
    indices: [
      {
        satelite: "Sentinel",
        coordenada: "POINT(40.71727401 -74.00898606)",
        data: "2022-08-29",
        ndvi: 0.3342,
        ndti: 0.1342,
      },
    ],
    interpretacoesCultura: [
      {
        cultura: "Soja (grão)",
        dataInicio: "2023-10-01",
        dataFim: "2024-02-01",
        coberturaSolo: 40,
      },
    ],
    interpretacoesManejo: [
      {
        data: "2021-01-28",
        operacao: "Revolvimento do solo",
        tipoOperacao: "Aração",
      },
    ],
  });

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (e, index, arrayField, field) => {
    const { value } = e.target;

    // Validação da ndvi
    if (arrayField === "indices" && field === "ndvi") {

      const error = validateNDVI(value); // Chama a validação externa
      setErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          validateNDVI: error,
        }
      }))
    }

    // Validação da ndti
    if (arrayField === "indices" && field === "ndti") {

      const error = validateNDTI(value); // Chama a validação externa
      setErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          validateNDTI: error,
        }
      }))
    }

    // Validação da coberturaSolo
    if (field === "coberturaSolo") {

      const error = validateGroundCover(value); // Chama a validação externa
      setErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          validateGroundCover: error,
        }
      }))
    }

    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]];
      if (updatedArray[index]) {
        updatedArray[index][field] = value;
      }
      return { ...prev, [arrayField]: updatedArray };
    });
  };


  const addEntry = (arrayField, defaultValues) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: [...prev[arrayField], defaultValues],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    console.log(formData);
    try {
      const response = await fetch("/api/v1/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dados enviados com sucesso!");
      } else {
        alert("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div className="container-fluid my-4">
      <h2 className="text-center mb-4">Dados de Monitoramento</h2>
      <h6 className="text-danger text-center">
        Informações obrigatórias estão marcadas com *
      </h6>
      <form onSubmit={handleSubmit}>

        <div className="card-body mb-4">
          <div className="card-header text-black" >
            <h4>Escolha um caso de teste rápido</h4>
          </div>
          <div className="row">
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-1" value={1} onClick={() => fillTestValues_NM1a(setFormData)}>
                TESTE NM1a
              </ToggleButton>
            </div>
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-2" value={2} onClick={() => fillTestValues_NM1b(setFormData)}>
                TESTE NM1b
              </ToggleButton>
            </div>
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-3" value={3} onClick={() => fillTestValues_NM2a(setFormData)}>
                TESTE NM2a
              </ToggleButton>
            </div>
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-4" value={4} onClick={() => fillTestValues_NM2b(setFormData)}>
                TESTE NM2b
              </ToggleButton>
            </div>

          </div>
        </div>

        <div className="card-body mb-4">
          <div className="row">
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-5" value={5} onClick={() => fillTestValues_NM3a(setFormData)}>
                TESTE NM3a
              </ToggleButton>
            </div>
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-6" value={6} onClick={() => fillTestValues_NM3b(setFormData)}>
                TESTE NM3b
              </ToggleButton>
            </div>
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-7" value={7} onClick={() => fillTestValues_NM4a(setFormData)}>
                TESTE NM4a
              </ToggleButton>
            </div>
            <div className="col-md-2">
              <ToggleButton id="tbg-radio-8" value={8} onClick={() => fillTestValues_NM4b(setFormData)}>
                TESTE NM4b
              </ToggleButton>
            </div>
          </div >
        </div>

        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h3>Dados de Sensoriamento Remoto</h3>
          </div>
          <div className="card-body">

            <div className="md-3" style={{ marginBottom: "1rem" }}>
              <label className="form-label">Data Início do Monitoramento *</label>
              <input
                type="date"
                className="form-control"
                value={formData.dataInicial}
                onChange={(e) => handleChange(e, "dataInicial")}
                required
              />
            </div>
            <div className="md-3" style={{ marginBottom: "1rem" }}>
              <label className="form-label">Data Término do Monitoramento *</label>
              <input
                type="date"
                className="form-control"
                value={formData.dataFinal}
                onChange={(e) => handleChange(e, "dataFinal")}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Declividade média da gleba/talhão(%):
              </label>
              <input
                type="number"
                name="declividadeMedia"
                min={0}
                max={100}
                className="form-control"
                placeholder="EX: 12"
                value={formData.declividadeMedia}
                onChange={(e) => handleChange(e, "declividadeMedia")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Plantio em contorno:
              </label>
              <select
                name="plantioContorno"
                className="form-select"
                value={formData.plantioContorno}
                onChange={(e) => handleChange(e, "plantioContorno")}
              >
                <option value="1">SIM</option>
                <option value="0">NÃO</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Terraceamento:
              </label>
              <select
                name="terraceamento"
                className="form-control"
                value={formData.terraceamento}
                onChange={(e) => handleChange(e, "terraceamento")}
              >
                <option value="1">SIM</option>
                <option value="0">NÃO</option>
              </select>
            </div>
          </div>
        </div>

        {/* Índices */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#2a7a22" }}>
            <h3>Índices</h3>
          </div>
          <div className="card-body">
            {formData.indices.map((indice, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Data da imagem do pixel*: </label>
                <input
                  type="date"
                  className="form-control"
                  value={indice.data}
                  onChange={(e) => handleArrayChange(e, index, "indices", "data")}
                  required
                />
                <label className="form-label">Satélite*:</label>
                <input
                  name="satelite"
                  type="text"
                  required
                  placeholder="EX: Sentinel"
                  className="form-control mb-2"
                  value={indice.satelite}
                  onChange={(e) => handleArrayChange(e, index, "indices", "satelite")}
                />
                <label className="form-label">Coordenada (WKT)*:</label>
                <input
                  type="text"
                  required
                  placeholder="EX: POINT(40.71727401 -74.00898606)"
                  className="form-control mb-2"
                  name="coordenada"
                  value={indice.coordenada}
                  onChange={(e) => handleArrayChange(e, index, "indices", "coordenada")}
                />
                <label className="form-label">NDVI*:</label>
                <input
                  type="text"
                  required
                  placeholder="EX: 0.3342"
                  className="form-control mb-2"
                  value={indice.ndvi || ""}
                  name="ndvi"
                  onChange={(e) => handleArrayChange(e, index, "indices", "ndvi")}
                />
                {errors[index]?.validateNDVI && (
                  <div className="text-danger mt-2">{errors[index].validateNDVI}</div>
                )
                }
                <label className="form-label">NDTI*:</label>
                <input
                  type="text"
                  required
                  placeholder="EX: 0.1342"
                  className="form-control mb-2"
                  name="ndti"
                  value={indice.ndti}
                  onChange={(e) => handleArrayChange(e, index, "indices", "ndti")}
                />
                {errors[index]?.validateNDTI && (
                  <div className="text-danger mt-2">{errors[index].validateNDTI}</div>
                )
                }
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("indices", { satelite: "", coordenada: "", data: "", ndvi: 0, ndti: 0 })
              }
            >
              Adicionar Índice
            </button>
          </div>
        </div>

        {/* Interpretações de Cultura */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#2a7a22" }}>
            <h3>Interpretações de Cultura</h3>
          </div>
          <div className="card-body">
            {formData.interpretacoesCultura.map((cultura, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Cultura:</label>
                <select
                  name="cultura"
                  className="form-control"
                  value={cultura.cultura || ""}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "cultura")}
                >
                  {/*Mapeia as opções de culturas disponíveis*/}
                  <option value="">Selecione uma cultura</option>
                  {culturaOptions.map((cultura, index) => (
                    <option key={index} value={cultura}>
                      {cultura}
                    </option>
                  ))}
                </select>
                <label className="form-label">Data de Emergência:</label>
                <input
                  type="date"
                  name="dataInicio"
                  className="form-control mb-2"
                  value={cultura.dataInicio}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "dataInicio")}
                />
                <label className="form-label">Data da Colheita:</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="dataFim"
                  value={cultura.dataFim}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "dataFim")}
                />
                <label className="form-label">
                  Cobertura do solo (%):
                </label>
                <input
                  type="text"
                  name="coberturaSolo"
                  className="form-control"
                  value={cultura.coberturaSolo}
                  placeholder="EX: 12"
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "coberturaSolo")}
                />
                {errors[index]?.validateGroundCover && (
                  <div className="text-danger mt-2">{errors[index].validateGroundCover}</div>
                )
                }
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("interpretacoesCultura", {
                  cultura: "",
                  dataInicio: "",
                  dataFim: "",
                  coberturaSolo: 0,
                })
              }
            >
              Adicionar Cultura
            </button>
          </div>
        </div>

        {/* Interpretações de Manejo */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#2a7a22" }}>
            <h3>Interpretações de Manejo</h3>
          </div>
          <div className="card-body">
            {formData.interpretacoesManejo.map((manejo, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Data:</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  value={manejo.data}
                  name="data"
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesManejo", "data")}
                />
                <label className="form-label">Operação: </label>
                <input
                  type="text"
                  placeholder="EX: Revolvimento do solo"
                  className="form-control mb-2"
                  name="operacao"
                  value={manejo.operacao}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesManejo", "operacao")}
                />
                <label className="form-label">Tipo de Operação:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="EX: Aração"
                  name="tipoOperacao"
                  value={manejo.tipoOperacao}
                  onChange={(e) =>
                    handleArrayChange(e, index, "interpretacoesManejo", "tipoOperacao")
                  }
                />


              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("interpretacoesManejo", {
                  data: "",
                  operacao: "",
                  tipoOperacao: "",
                })
              }
            >
              Adicionar Manejo
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Enviar Dados
          </button>
        </div>

      </form >
    </div >
  );
};

export default Form3;
