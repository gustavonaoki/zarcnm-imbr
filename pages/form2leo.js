import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import modeloAnaliseSolo from "modelos/modeloAnaliseSolo";

const Form2 = () => {
  const [analisesSolo, setAnalisesSolo] = useState([
    {
      cpfResponsavelColeta: "12345678900",
      dataColeta: "2024-04-17",
      pontoColeta: "POINT(40.71727401 -74.00898606)",
      camada: "20",
      areia: "",
      silte: "",
      argila: "",
      calcio: "",
      magnesio: "",
      potassio: "",
      sodio: "",
      aluminio: "",
      acidezPotencial: "",
      phh2o: "",
      phcaci: "",
      fosforoMehlich: "",
      fosforoResina: "",
      enxofre: "",
      mos: "",
      arilsulfatase: "",
      betaGlicosedade: "",
      densidadeSolo: "",
    },
  ]);

  // Função para atualizar os valores de um campo específico no estado
  const handleChange = (e, index, field) => {
    const { value } = e.target;
    setAnalisesSolo((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Função para adicionar uma nova análise de solo
  const addAnalise = () => {
    setAnalisesSolo((prev) => [...prev, { ...modeloAnaliseSolo }]);
  };

  // Função para remover uma análise adicionada (exceto a principal)
  const removeAnalise = (index) => {
    setAnalisesSolo((prev) => prev.filter((_, i) => i !== index));
  };

  // Função para validar campos obrigatórios
  const isFormValid = () => {
    return analisesSolo.every((analise) =>
      ["dataColeta",
        "pontoColeta",
        "camada",
        "areia",
        "silte",
        "argila",
        "calcio",
        "magnesio",
        "potassio",
        "sodio",
        "aluminio",
        "acidezPotencial",
        "phh2o",
        "fosforoMehlich",
        "enxofre",
        "mos"].every(
          (field) => analise[field] !== null && analise[field] !== "" // Verifica se os campos obrigatórios estão preenchidos
        )
    );
  };

  // Função para envio do formulário
  const handleSubmit = async (e) => {
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Análises de Solo</h2>
      <form onSubmit={handleSubmit}>
        {analisesSolo.map((analise, index) => (
          <div className="card mb-4 border-0" key={index} style={{ backgroundColor: "#DBDBDB" }}>
            {/* Cabeçalho do card com o título e botão de remoção */}
            <div className="border-2">
              <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">Análise {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeAnalise(index)}
                      title="Remover esta análise"
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  )}
                </div>
                {/* Informação de campos obrigatórios */}
                <p className="mb-0 mt-2" style={{ fontSize: "0.9rem", color: "#f8f9fa" }}>
                  Campos com ( * ) são obrigatórios
                </p>
              </div>
              <div className="card-body">
                {/* Informações principais */}
                <div className="row mb-6">
                  <div className="col-md-6">
                    <label className="form-label">CPF do Responsável:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={analise.cpfResponsavelColeta || ""}
                      onChange={(e) => handleChange(e, index, "cpfResponsavelColeta")}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Data da Coleta: *</label>
                    <input
                      type="date"
                      className="form-control"
                      value={analise.dataColeta || ""}
                      onChange={(e) => handleChange(e, index, "dataColeta")}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <label className="form-label">Ponto de Coleta: *</label>
                    <textarea
                      className="form-control"
                      value={analise.pontoColeta || ""}
                      onChange={(e) => handleChange(e, index, "pontoColeta")}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <label className="form-label">Camada: *</label>
                    <select
                      className="form-select"
                      value={analise.camada || ""}
                      onChange={(e) => handleChange(e, index, "camada")}
                      required
                    >
                      <option value="10">10 - (0 - 10 cm)</option>
                      <option value="20">20 - (0 - 20 cm) </option>
                      <option value="40">40 - (20 - 40 cm) </option>
                      <option value="60">60 - (40 - 60 cm)</option>
                      <option value="100">100 - (60 - 100 cm)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Divisão entre Informações Físicas e Químicas */}
            <div className="row m-2">
              <div className="col-md-6">
                <div className="card mb-3 border-3" style={{ borderColor: "#20691a", backgroundColor: "#DBDBDB" }}>
                  <div className="card-header text-white" style={{ backgroundColor: "#20691a" }}>
                    <h4 className="mb-0">Informações Físicas</h4>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Areia (%): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.areia || ""}
                        onChange={(e) => handleChange(e, index, "areia")}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Silte (%): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.silte || ""}
                        onChange={(e) => handleChange(e, index, "silte")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Argila (%): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.argila || ""}
                        onChange={(e) => handleChange(e, index, "argila")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-3 border-3" style={{ borderColor: "#20691a", backgroundColor: "#DBDBDB" }}>
                  <div className="card-header text-white" style={{ backgroundColor: "#20691a" }}>
                    <h4 className="mb-0">Informações Químicas</h4>
                  </div>
                  <div className="card-body overflow-auto" style={{ maxHeight: "273px" }}>
                    <div className="mb-3">
                      <label className="form-label">Cálcio (Ca) (cmolc/kg): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.calcio || ""}
                        onChange={(e) => handleChange(e, index, "calcio")}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Magnésio (Mg) (cmolc/kg): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.magnesio || ""}
                        onChange={(e) => handleChange(e, index, "magnesio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Potássio (K) (mg/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.potassio || ""}
                        onChange={(e) => handleChange(e, index, "potassio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Sódio (Na) (mg/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.sodio || ""}
                        onChange={(e) => handleChange(e, index, "sodio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Alumínio (Al) (cmolc/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.aluminio || ""}
                        onChange={(e) => handleChange(e, index, "aluminio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Acidez potencial (H + AL) (cmolc/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.acidezPotencial || ""}
                        onChange={(e) => handleChange(e, index, "acidezPotencial")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">pH em H₂O (Valor adimensional): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.phh2o || ""}
                        onChange={(e) => handleChange(e, index, "phh2o")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">pH em CaCl₂ (Valor adimensional):</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.phcaci || ""}
                        onChange={(e) => handleChange(e, index, "phcaci")}
                      />
                    </div>
                    <div>
                      <label className="form-label">Fósforo disponível (P) Mehlich (mg/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.fosforoMehlich || ""}
                        onChange={(e) => handleChange(e, index, "fosforoMehlich")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Fósforo disponível (P) Resina (mg/dm³):</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.fosforoResina || ""}
                        onChange={(e) => handleChange(e, index, "fosforoResina")}
                      />
                    </div>
                    <div>
                      <label className="form-label">Enxofre (S) (mg/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.enxofre || ""}
                        onChange={(e) => handleChange(e, index, "enxofre")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">MOS (g/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.mos || ""}
                        onChange={(e) => handleChange(e, index, "mos")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Arilsulfatase (mg PNP Kg-1 h-1):</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.arilsulfatase || ""}
                        onChange={(e) => handleChange(e, index, "arilsulfatase")}
                      />
                    </div>
                    <div>
                      <label className="form-label">Beta-glicosidase (PNP Kg-1 h-1):</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.betaGlicosedade || ""}
                        onChange={(e) => handleChange(e, index, "betaGlicosedade")}
                      />
                    </div>
                    <div>
                      <label className="form-label">Densidade do solo (g/cm³):</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.densidadeSolo || ""}
                        onChange={(e) => handleChange(e, index, "densidadeSolo")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ))}
        <div className="d-flex m-3 justify-content-between">
          <button
            type="button"
            onClick={addAnalise}
            className="btn btn-primary" style={{ backgroundColor: "#25526d" }}
          >
            Adicionar Nova Análise
          </button>
          {/* Botão fica desativado até o preenchimento de todos os dados obrigatórios  */}
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isFormValid()}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form2;
