import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { culturaOptions } from "../optionsInputs/culturas";
import { modeloSensoriamento } from "../modelos/modeloSensoriamento";
import { errorsValidate } from "../errors/errorsValidators";
import { errorsValidateArray } from "../errors/errorsvalidatorsArray";
import { validateNDTI } from "../utils/validateNDVI_NDTI";
import { validateNDVI } from "../utils/validateNDVI_NDTI";


export default function Form3({ initialData }) {
  const [formData, setFormData] = useState(modeloSensoriamento());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData[0], // Usa o primeiro item do array
        indices: initialData[0].indices || prev.indices,
        interpretacoesCultura: initialData[0].interpretacoesCultura || prev.interpretacoesCultura,
        interpretacoesManejo: initialData[0].interpretacoesManejo || prev.interpretacoesManejo,
      }));
    }
  }, [initialData]);

  const handleChange = (e, field) => {
    const { value } = e.target;

    // Validando os erros
    errorsValidate(e, field, setErrors);

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (e, index, arrayField, field) => {
    const { value } = e.target;
    
    // Atualiza o valor no formulário
    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]];
      updatedArray[index][field] = value;
      return { ...prev, [arrayField]: updatedArray };
    });

    errorsValidateArray(e, index, arrayField, field, setErrors);
  };


  const addEntry = (arrayField, defaultValues) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: [...prev[arrayField], defaultValues],
    }));
  };

  // Função para verificar se o formulário é válido
  const isFormValid = () => {
    return (
      formData.dataInicial &&
      formData.dataFinal &&
      formData.indices.every(
        (indice, index) =>
          indice.data &&
          indice.satelite &&
          indice.coordenada &&
          indice.ndvi &&
          indice.ndti &&
          !errors[index]?.validateNDVI &&
          !errors[index]?.validateNDTI
      ) &&
      formData.interpretacoesCultura.every(
        (cultura, index) =>
          cultura.cultura &&
          cultura.dataInicio &&
          cultura.dataFim &&
          cultura.coberturaSolo &&
          !errors[index]?.validateGroundCover
      )
    );
  };

  const removeEntry = (arrayField, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: prev[arrayField].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Dados de Monitoramento</h2>
      <form onSubmit={handleSubmit}>
        {/* Dados de Sensoriamento Remoto */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h3>Dados de Sensoriamento Remoto</h3>
          </div>
          <div className="card-body">
            {/* Campos principais */}
            <div className="mb-3">
              <label className="form-label">Data Início do Monitoramento *</label>
              <input
                type="date"
                className="form-control"
                value={formData.dataInicial}
                onChange={(e) => handleChange(e, "dataInicial")}
                required
              />
            </div>
            <div className="mb-3">
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
              <label className="form-label">Declividade média da gleba/talhão (%):</label>
              <input
                type="text"
                className="form-control"
                value={formData.declividadeMedia}
                onChange={(e) => handleChange(e, "declividadeMedia")}
              />
              {errors[0]?.validateSlope && (
                <div className="text-danger mt-2">{errors[0].validateSlope}</div>
              )
              }
            </div>
            <div className="mb-3">
              <label className="form-label">Plantio em contorno:</label>
              <select
                className="form-select"
                value={formData.plantioContorno}
                onChange={(e) => handleChange(e, "plantioContorno")}
              >
                <option value="1">SIM</option>
                <option value="0">NÃO</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Terraceamento:</label>
              <select
                className="form-select"
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
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h3>Índices</h3>
          </div>
          <div className="card-body">
            {formData.indices.map((indice, index) => (
              <div key={index} className="mb-3 border p-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Índice {index + 1}</h5>
                  {formData.indices.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeEntry("indices", index)}
                    >
                      <i className="bi bi-trash-fill"></i> Remover
                    </button>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Data da imagem do pixel*:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={indice.data}
                    onChange={(e) => handleArrayChange(e, index, "indices", "data")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Satélite*:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={indice.satelite}
                    onChange={(e) => handleArrayChange(e, index, "indices", "satelite")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Coordenada (WKT)*:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={indice.coordenada}
                    onChange={(e) => handleArrayChange(e, index, "indices", "coordenada")}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">NDVI*:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={indice.ndvi}
                    onChange={(e) => handleArrayChange(e, index, "indices", "ndvi")}
                    required
                  />
                  {errors.indices?.[index]?.ndvi && (
                    <div className="text-danger mt-2">{errors.indices[index].ndvi}</div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">NDTI*:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={indice.ndti}
                    onChange={(e) => handleArrayChange(e, index, "indices", "ndti")}
                    required
                  />
                  {errors.indices?.[index]?.ndti && (
                    <div className="text-danger mt-2">{errors.indices[index].ndti}</div>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#25526d", color: "white" }}
              onClick={() => addEntry("indices", { satelite: "", coordenada: "", data: "", ndvi: 0, ndti: 0 })}
            >
              Adicionar Índice
            </button>
          </div>
        </div>

        {/* Interpretações de Cultura */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h3>Interpretações de Cultura</h3>
          </div>
          <div className="card-body">
            {formData.interpretacoesCultura.map((cultura, index) => (
              <div key={index} className="mb-3 border p-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Cultura {index + 1}</h5>
                  {formData.interpretacoesCultura.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeEntry("interpretacoesCultura", index)}
                    >
                      <i className="bi bi-trash-fill"></i> Remover
                    </button>
                  )}
                </div>
                <label className="form-label">Cultura:</label>
                <select
                  className="form-control"
                  value={cultura.cultura}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "cultura")}
                >
                  <option value="">Selecione uma cultura</option>
                  {culturaOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label className="form-label">Data de Emergência:</label>
                <input
                  type="date"
                  className="form-control"
                  value={cultura.dataInicio}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "dataInicio")}
                />
                <label className="form-label">Data da Colheita:</label>
                <input
                  type="date"
                  className="form-control"
                  value={cultura.dataFim}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "dataFim")}
                />
                <div>
                  <label className="form-label">Cobertura do solo (%):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cultura.coberturaSolo}
                    onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "coberturaSolo")}
                  />
                  
                </div>
                {errors[index]?.validateGroundCover && (
                    <div className="text-danger mt-2">{errors[index].validateGroundCover}</div>
                  )
                  }
              </div>
            ))}
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#25526d", color: "white" }}
              onClick={() => addEntry("interpretacoesCultura", { cultura: "", dataInicio: "", dataFim: "", coberturaSolo: 0 })}
            >
              Adicionar Cultura
            </button>
          </div>
        </div>

        {/* Interpretações de Manejo */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h3>Interpretações de Manejo</h3>
          </div>
          <div className="card-body">
            {formData.interpretacoesManejo.map((manejo, index) => (
              <div key={index} className="mb-3 border p-3 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Manejo {index + 1}</h5>
                  {formData.interpretacoesManejo.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeEntry("interpretacoesManejo", index)}
                    >
                      <i className="bi bi-trash-fill"></i> Remover
                    </button>
                  )}
                </div>
                <label className="form-label">Data:</label>
                <input
                  type="date"
                  className="form-control"
                  value={manejo.data}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesManejo", "data")}
                />
                <label className="form-label">Operação:</label>
                <input
                  type="text"
                  className="form-control"
                  value={manejo.operacao}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesManejo", "operacao")}
                />
                <label className="form-label">Tipo de Operação:</label>
                <input
                  type="text"
                  className="form-control"
                  value={manejo.tipoOperacao}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesManejo", "tipoOperacao")}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "#25526d", color: "white" }}
              onClick={() => addEntry("interpretacoesManejo", { data: "", operacao: "", tipoOperacao: "" })}
            >
              Adicionar Manejo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}