import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { modeloAnaliseSolo } from "../modelos/modeloAnaliseSolo";
import { validateCPF } from "../utils/validateCPF";
import { validateSoilComponents } from "../utils/validateSoil";
import InputMask from "react-input-mask";


export default function Form2({ initialData, onSubmit }) {
  const [analisesSolo, setAnalisesSolo] = useState([
    { ...modeloAnaliseSolo, camada: "20" }, // Primeiro formulário vazio com camada 20
    { ...modeloAnaliseSolo, camada: "40" }, // Segundo formulário vazio com camada 40
  ]);

  const [errors, setErrors] = useState({
    0: {}, // Erros do primeiro formulário
    1: {}, // Erros do segundo formulário
  });

  // Atualizar o estado apenas quando initialData estiver presente
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setAnalisesSolo(initialData);
    }
  }, [initialData]);

  const handleChange = (e, index, field) => {
    const { value } = e.target;

    setAnalisesSolo((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [index]: prev[index] || {}, // Garante que o objeto de erros para o índice existe
    }));

    // Validação de CPF e componentes do solo
    if (field === "cpfResponsavelColeta") {
      const isValid = validateCPF(value);
      setErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          cpfResponsavelColeta: isValid ? null : "CPF inválido!",
        },
      }));
    }

    if (["argila", "areia", "silte"].includes(field)) {
      const { argila, areia, silte } = {
        ...analisesSolo[index],
        [field]: value, // Atualiza o campo alterado no objeto temporário
      };

      const error = validateSoilComponents(argila, areia, silte); // Chama a validação externa
      setErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          soilComponents: error, // Atualiza o erro se inválido ou null se válido
        },
      }));
    }
  };

  const addAnalise = () => {
    setAnalisesSolo((prev) => [...prev, { ...modeloAnaliseSolo }]);
  };

  const removeAnalise = (index) => {
    setAnalisesSolo((prev) => prev.filter((_, i) => i !== index));
  };



  // Função para validar campos obrigatórios
  const isFormValid = () => {
    return analisesSolo.every((analise, index) => {
      const analiseErrors = errors[index] || {}; // Garante que errors[index] existe
      return (
        analiseErrors.cpfResponsavelColeta == null && // Verifica se não há erro de CPF
        [
          "dataColeta",
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
          "mos",
        ].every((field) => analise[field] !== null && analise[field] !== "")
      );
    });
  };

  // Função para envio do formulário
  const handleSubmit = async (e) => { };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Análises de Solo</h2>
      <form onSubmit={handleSubmit}>
        {analisesSolo.map((analise, index) => (
          <div
            className="card mb-4 border-0"
            key={index}
          >
            {/* Cabeçalho do card com título, mensagem, select e botões */}
            <div className="border-2">
              <div
                className="card-header text-white d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#0b4809" }}
              >
                <h3 className="mb-0">Análise {index + 1}</h3>

                {index >= 2 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={() => removeAnalise(index)}
                  >
                    <i className="bi bi-trash-fill me-2"></i> Remover
                  </button>
                )}
              </div>

              <div className="card-body">
                {/* Informações principais */}
                <div className="row mb-6">
                  <div className="col-md-6">
                    <label className="form-label">CPF do Responsável:</label>
                    <InputMask
                      mask="999.999.999-99"
                      className="form-control"
                      value={analise.cpfResponsavelColeta || ""}
                      onChange={(e) => handleChange(e, index, "cpfResponsavelColeta")}
                    />
                    {/* Exibe o erro se houver */}
                    {errors[index]?.cpfResponsavelColeta && (
                      <div className="text-danger mt-1">
                        {errors[index]?.cpfResponsavelColeta}
                      </div>
                    )}
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
                <div
                  className="card mb-3 border-3"
                  style={{ borderColor: "#20691a" }}
                >
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#20691a" }}
                  >
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

                    {/* Exibição da mensagem de erro para Areia, Silte e Argila */}
                    {errors[index]?.soilComponents && (
                      <div className="text-danger mt-2">{errors[index].soilComponents}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card mb-3 border-3"
                  style={{ borderColor: "#20691a" }}
                >
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#20691a" }}
                  >
                    <h4 className="mb-0">Informações Químicas</h4>
                  </div>
                  <div
                    className="card-body overflow-auto"
                    style={{ maxHeight: "273px" }}
                  >
                    <div className="mb-3">
                      <label className="form-label">
                        Cálcio (Ca) (cmolc/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.calcio || ""}
                        onChange={(e) => handleChange(e, index, "calcio")}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Magnésio (Mg) (cmolc/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.magnesio || ""}
                        onChange={(e) => handleChange(e, index, "magnesio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Potássio (K) (mg/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.potassio || ""}
                        onChange={(e) => handleChange(e, index, "potassio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Sódio (Na) (mg/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.sodio || ""}
                        onChange={(e) => handleChange(e, index, "sodio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Alumínio (Al) (cmolc/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.aluminio || ""}
                        onChange={(e) => handleChange(e, index, "aluminio")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Acidez potencial (H + AL) (cmolc/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.acidezPotencial || ""}
                        onChange={(e) =>
                          handleChange(e, index, "acidezPotencial")
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        pH em H₂O (Valor adimensional): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.phh2o || ""}
                        onChange={(e) => handleChange(e, index, "phh2o")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        pH em CaCl₂ (Valor adimensional):
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.phcaci || ""}
                        onChange={(e) => handleChange(e, index, "phcaci")}
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Fósforo disponível (P) Mehlich (mg/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.fosforoMehlich || ""}
                        onChange={(e) =>
                          handleChange(e, index, "fosforoMehlich")
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Fósforo disponível (P) Resina (mg/dm³):
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.fosforoResina || ""}
                        onChange={(e) =>
                          handleChange(e, index, "fosforoResina")
                        }
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Enxofre (S) (mg/dm³): *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.enxofre || ""}
                        onChange={(e) => handleChange(e, index, "enxofre")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">MOS (Matéria organica do solo) (g/dm³): *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.mos || ""}
                        onChange={(e) => handleChange(e, index, "mos")}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Arilsulfatase (mg PNP Kg-1 h-1):
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.arilsulfatase || ""}
                        onChange={(e) =>
                          handleChange(e, index, "arilsulfatase")
                        }
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Beta-glicosidase (PNP Kg-1 h-1):
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.betaGlicosedade || ""}
                        onChange={(e) =>
                          handleChange(e, index, "betaGlicosedade")
                        }
                      />
                    </div>
                    <div>
                      <label className="form-label">
                        Densidade do solo (g/cm³):
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={analise.densidadeSolo || ""}
                        onChange={(e) =>
                          handleChange(e, index, "densidadeSolo")
                        }
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
            className="btn"
            style={{
              backgroundColor: "#25526d",
              color: "white"
            }}
          >
            Adicionar Nova Análise
          </button>
        </div>
      </form>
    </div>
  );
};
