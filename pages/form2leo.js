import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { modeloAnaliseSolo } from "../modelos/modeloAnaliseSolo";
import { validateCPF } from "../utils/validateCPF";
import { validateSoilComponents } from "../utils/validateSoil";
import NM1a from "../data/NM1a.json";
import NM1b from "../data/NM1b.json";
import NM2a from "../data/NM2a.json";
import NM2b from "../data/NM2b.json";
import NM3a from "../data/NM3a.json";
import NM3b from "../data/NM3b.json";
import NM4a from "../data/NM4a.json";
import NM4b from "../data/NM4b.json";

const Form2 = () => {
  const [analisesSolo, setAnalisesSolo] = useState([
    { ...modeloAnaliseSolo, camada: "20" }, // Primeiro formulário vazio com camada 20
    { ...modeloAnaliseSolo, camada: "40" }, // Segundo formulário vazio com camada 40
  ]);

  const [errors, setErrors] = useState({
    0: {}, // Erros do primeiro formulário
    1: {}, // Erros do segundo formulário
  });

  const [opcaoSelecionada, setOpcaoSelecionada] = useState(""); // Estado do select

  // Map JSON options
  const opcoesJson = {
    "NM1a": NM1a,
    "NM1b": NM1b,
    "NM2a": NM2a,
    "NM2b": NM2b,
    "NM3a": NM3a,
    "NM3b": NM3b,
    "NM4a": NM4a,
    "NM4b": NM4b,
  };

  // Função para atualizar os valores de um campo específico no estado
  const handleChange = (e, index, field) => {
    const { value } = e.target;

    // Atualiza o valor do campo no estado
    setAnalisesSolo((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });

    // Inicializa os erros se necessário
    setErrors((prev) => ({
      ...prev,
      [index]: prev[index] || {}, // Garante que o objeto de erros para o índice existe
    }));

    // Validação do CPF caso seja o campo correspondente
    if (field === "cpfResponsavelColeta") {
      const error = validateCPF(value); // Valida o CPF
      setErrors((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          cpfResponsavelColeta: error,
        },
      }));
    }

    // Validação de argila, areia e silte
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

  const handleAutoPreencher = (index) => {
    // Extrair o JSON correto com base na opção selecionada
    const jsonSelecionado = opcoesJson[opcaoSelecionada];
  
    if (!jsonSelecionado) {
      alert("Por favor, selecione um JSON válido.");
      return;
    }
  
    // Navegar no JSON até o array de dados relevantes
    let dadosSelecionados = [];
    try {
      dadosSelecionados = jsonSelecionado.item[1].item[0].request.body.raw; // Caminho para os dados de laboratório
    } catch (error) {
      alert("Erro ao acessar os dados no JSON selecionado.");
      return;
    }
  
    if (!Array.isArray(dadosSelecionados) || dadosSelecionados.length === 0) {
      alert("Nenhum dado encontrado no JSON para autopreenchimento.");
      return;
    }
  
    // Atualizar o estado para preencher formulários existentes antes de criar novos
    setAnalisesSolo((prevAnalises) => {
      const novasAnalises = [...prevAnalises];
  
      // Iterar sobre os dados do JSON e preencher os formulários disponíveis
      for (let i = 0; i < dadosSelecionados.length; i++) {
        if (i < novasAnalises.length) {
          // Preenche os formulários existentes
          novasAnalises[i] = {
            ...novasAnalises[i],
            ...dadosSelecionados[i],
          };
        } else {
          // Adiciona novos formulários para os dados restantes
          novasAnalises.push({
            ...modeloAnaliseSolo, // Base vazia
            ...dadosSelecionados[i], // Dados do JSON
          });
        }
      }
  
      return novasAnalises;
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
            style={{ backgroundColor: "#DBDBDB" }}
          >
            {/* Cabeçalho do card com título, mensagem, select e botões */}
            <div className="border-2">
              <div
                className="card-header text-white d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#0b4809" }}
              >
                {/* Título da análise */}
                <div>
                  <h3 className="mb-0">Análise {index + 1}</h3>
                  {/* Mensagem de campos obrigatórios */}
                  <p
                    className="mb-0 mt-2"
                    style={{ fontSize: "0.9rem", color: "#f8f9fa" }}
                  >
                    Campos com ( * ) são obrigatórios
                  </p>
                </div>

                {/* Controles (Select + Autopreencher + Remover) */}
                <div className="d-flex gap-2 align-items-center">
                  {/* Select para selecionar JSON */}
                  <select
                    className="form-select form-select-sm w-auto"
                    value={opcaoSelecionada}
                    onChange={(e) => setOpcaoSelecionada(e.target.value)}
                  >
                    <option value="">Selecione</option>
                    <option value="NM1a">NM1a</option>
                    <option value="NM1b">NM1b</option>
                    <option value="NM2a">NM2a</option>
                    <option value="NM2b">NM2b</option>
                    <option value="NM3a">NM3a</option>
                    <option value="NM3b">NM3b</option>
                    <option value="NM4a">NM4a</option>
                    <option value="NM4b">NM4b</option>
                  </select>

                  {/* Botão de Autopreencher */}
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => handleAutoPreencher(index)} // Passa o índice da análise atual
                  >
                    Autopreencher
                  </button>

                  {/* Botão de Remover Análise (se não for a primeira análise) */}
                  {index > 1 && (
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
                    {/* Exibe o erro se existir para o campo correspondente */}
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
                  style={{ borderColor: "#20691a", backgroundColor: "#DBDBDB" }}
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
                  style={{ borderColor: "#20691a", backgroundColor: "#DBDBDB" }}
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
            className="btn btn-primary"
            style={{ backgroundColor: "#25526d" }}
          >
            Adicionar Nova Análise
          </button>
          {/* Botão fica desativado até o preenchimento de todos os dados obrigatórios  */}
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isFormValid()}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form2;
